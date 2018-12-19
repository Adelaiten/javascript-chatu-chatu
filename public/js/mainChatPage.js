function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

function signOut() {
    firebase.auth().signOut();
//        .then(() => {
//            window.location = '/index.html';
//        });
}

// Initiate Firebase Auth.
function initFirebaseAuth() {
  // Listen to auth state changes.
  firebase.auth().onAuthStateChanged(authStateObserver);
}

 function authStateObserver(user) {
     if(!user) {
         window.location = '/';
     }
 }

var signOutButtonElement = document.getElementById('logout');
signOutButtonElement.addEventListener('click', signOut);

initFirebaseAuth();