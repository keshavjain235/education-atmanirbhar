$(document).ready(function() {

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

    $("button").click(function(event) {
      event.preventDefault();
    });

    $("#submit").click(function(event) {
        var name = $("#name").val();
        var email = $("#eaddress").val();
        var phone = $("#phone").val();
        var street = $("#street").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zip = $("#zip").val();
        var teachhrs = $("#teachhrs").val();
        var daysatn = $('input[name="day"]:checked').val();

        if(name == "" || email == "" || phone == "" || street == "" || city == "" || state == "" || zip == "" || teachhrs == null) {
          alert("All fields are mandatory!");
        }
        else if(ValidateEmail(email)) {}
        else if(phone < 6000000000 || phone > 9999999999) { alert("Please enter valid mobile number!"); }
        else if(zip < 100000 || zip > 999999) { alert("Please enter valid zip code!"); }
        else {
          db.collection("volunteers").doc().set({
              name: name,
              email: email,
              mobile: phone,
              street: street,
              city: city,
              state: state,
              zip: zip,
              teaching_hours: teachhrs,
              days_attending: daysatn
            }).then(function() {
              alert("Volunteer request sent! We will contact you soon at " + phone + ".");
            }).catch(function(error) {
              console.error("Error: ", error);
          });    
        }     
    });
})