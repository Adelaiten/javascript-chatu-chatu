function signInWithGoogle() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
}

function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
    window.location = '/mainChatPage.html';
}

var signInButtonElement = document.getElementById('login-google');
signInButtonElement.addEventListener('click', signInWithGoogle);