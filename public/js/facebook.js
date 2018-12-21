var provider = new firebase.auth.FacebookAuthProvider();

function facebookSignin() {
  firebase.auth().signOut();
  firebase.auth().signInWithPopup(provider)
   
  .then(function(result) {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch(function(error) {
    console.log(error.code);
    console.log(error.message);
  });
}

function authStateObserver() {
  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          window.location = "/mainChatPage.html";
      }
  });
}

function initFirebaseAuth() {
  firebase.auth().onAuthStateChanged(authStateObserver);
}

let facebookLoginBtn = document.getElementById("login-facebook");
facebookLoginBtn.addEventListener("click", facebookSignin);

initFirebaseAuth();