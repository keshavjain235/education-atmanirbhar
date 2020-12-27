$(document).ready(function(){

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA6EyntsXLtrUYx1LHDhrc0VWwCFMDUJhE",
    authDomain: "education-atmanirbhar.firebaseapp.com",
    projectId: "education-atmanirbhar",
    storageBucket: "education-atmanirbhar.appspot.com",
    messagingSenderId: "236499793397",
    appId: "1:236499793397:web:c30690651978dce8c29cbc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return(false);
    }
    alert("You have entered an invalid email address!");
    return(true);
  }

  $("#paysub").click(function(event) {
    event.preventDefault();
    var pname = $("#payname").val();
    var pemail = $("#payemail").val();
    var pnum = $("#paynum").val();
    var don = $("#payamount").val();
    if(pemail === "" || pname === "" || pnum === "" || don === "") { alert("All fields are mandatory!"); }
    else if(ValidateEmail(pemail)) {}
    else if(pnum < 6000000000 || pnum > 9999999999) { alert("Please enter valid mobile number!"); }
    else {
      var options = {
          "key": "rzp_test_PpOinqLyVBHOcP", // Enter the Key ID generated from the Dashboard
          "amount": don*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
          "currency": "INR",
          "name": "Atmanirbhar",
          "description": "Education",
          "image": "logo.png",// Replace this with the order_id created using Orders API (https://razorpay.com/docs/api/orders).
          "handler": function (response){
            console.log(response);
            db.collection("donations").doc().set({
              name: pname,
              email: pemail,
              mobile: pnum,
              amount: don,
              payment_id: response.razorpay_payment_id
            }).then(function() {
              alert("Your Payment is Successfull! Kindly check your Email/Mobile for details.");
            });                
          },
          "prefill": {
              "name": pname,
              "email": pemail,
              "contact": pnum
          },
          "notes": {
              "address": "note value"
          },
          "theme": {
              "color": "#9932CC"
          }
      }
      var propay = new Razorpay(options);
      propay.open();
    }
  });

})