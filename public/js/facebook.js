const provider = new firebase.auth.FacebookAuthProvider();
provider.useDeviceLanguage();

firebase.auth().signInWithPopup(provider).then(function(result) {
    const token = result.credential.accessToken;
    const user = result.user;
  }).catch(function(error) {
    let errorCode = error.code;
    let errorMessage = error.message;
});