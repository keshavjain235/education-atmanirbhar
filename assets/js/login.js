$(document).ready(function(){

  $(document).on('click', '.below button', function(){
    var belowCard = $('.below'),
    aboveCard = $('.above'),
    parent = $('.form-collection');
    parent.addClass('animation-state-1');
    setTimeout(function(){
      belowCard.removeClass('below');
      aboveCard.removeClass('above');
      belowCard.addClass('above');
      aboveCard.addClass('below');
      setTimeout(function(){
        parent.addClass('animation-state-finish');
        parent.removeClass('animation-state-1');
        setTimeout(function(){
          aboveCard.addClass('turned');
          belowCard.removeClass('turned');
          parent.removeClass('animation-state-finish');
        }, 300)
      }, 10)
    }, 300);
  });

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

  $("#loginbtn").click(function(event) {
    event.preventDefault();
    var email = $("#loginemail").val();
    var pass = $("#loginpass").val();
    if(ValidateEmail(email)) {}
    else {
        firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            if (errorCode === "auth/user-not-found") {
                alert("Invalid Email and/or Password!");
            }
            else {
              alert(errorCode + " " + errorMessage);
            }
        });
    }
  });

  $("#signupbtn").click(function(event) {
    event.preventDefault();
    var name = $("#name").val();
    var email = $("#signemail").val();
    var pass = $("#signpass").val();
    if(name == "" || email == "" || pass == "") {
      alert("All fields are mandatory!");
    }
    else if(ValidateEmail(email)) {}
    else {
      firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then((result) => {
        // Signed in 
        // ...
        console.log("signed up");
        alert("signed up");
        return result.user.updateProfile({
          displayName: name
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        alert(errorCode + " " + errorMessage);
      });
    }
  });

  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        console.log("Signed in");
        alert("signed in");
        // window.open("adminindex.html","_self");
      } else {
        // User is signed out.
        // ...
      }
  });

  function ValidateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return(false);
      }
      alert("You have entered an invalid email address!");
      return(true);
    }

    //remove when complete
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
})