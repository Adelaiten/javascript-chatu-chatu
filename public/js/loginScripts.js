function signInWithGoogle() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signOut();
    firebase.auth().signInWithPopup(provider);

}

function authStateObserver() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            window.location = "/mainChatPage.html";
        }
    });
}

function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
}

var signInButtonElement = document.getElementById('login-google');
signInButtonElement.addEventListener('click', signInWithGoogle);

initFirebaseAuth();