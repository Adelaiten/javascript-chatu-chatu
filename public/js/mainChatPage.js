function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

function signOut() {
    firebase.auth().signOut()
        .then(() => {window.location = '/index.html'});
}

// function logStatusObserver() {
//     if(!isUserSignedIn) {
//         window.location = '/';
//     }
// }

var signOutButtonElement = document.getElementById('logout');
signOutButtonElement.addEventListener('click', signOut);

// logStatusObserver();