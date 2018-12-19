function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

function signOut() {
    firebase.auth().signOut();
}

function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/img/iconfinder_male3_403019.png';
}

function getUserName() {
  return firebase.auth().currentUser.displayName;
}

// Loads chat message history and listens for upcoming ones.
function loadMessages(chatName, limit) {
  // Loads the last 12 messages and listens for new ones.
  var callback = function(snap) {
    var data = snap.val();
      //     displayMessage(snap.key, data.name, data.text, data.profilePicUrl, data.imageUrl);
  };

  firebase.database().ref(`/messages/${chatName}`).limitToLast(limit).on('child_added', callback);
  firebase.database().ref(`/messages/${chatName}`).limitToLast(limit).on('child_changed', callback);
}

var MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message"></div>' +
      '<div class="name"></div>' +
    '</div>';

// Displays a Message in the UI.
function displayMessage(key, name, text, picUrl, imageUrl) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
//    var container = document.createElement('div');
//    container.innerHTML = MESSAGE_TEMPLATE;
//    div = container.firstChild;
//    div.setAttribute('id', key);
//    messageListElement.appendChild(div);
  }
  if (picUrl) {
//    div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
  }
//  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUrl) { // If the message is an image.
//    var image = document.createElement('img');
//    image.addEventListener('load', function() {
//      messageListElement.scrollTop = messageListElement.scrollHeight;
//    });
//    image.src = imageUrl + '&' + new Date().getTime();
//    messageElement.innerHTML = '';
//    messageElement.appendChild(image);
  }
  // Show the card fading-in and scroll to view the new message.
//  setTimeout(function() {div.classList.add('visible')}, 1);
//  messageListElement.scrollTop = messageListElement.scrollHeight;
//  messageInputElement.focus();
}

// Enables or disables the submit button depending on the values of the input
// fields.
function toggleButton() {
  if (messageInputElement.value) {
    submitButtonElement.removeAttribute('disabled');
  } else {
    submitButtonElement.setAttribute('disabled', 'true');
  }
}

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
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
var messageInputElement = document.getElementById('message');

signOutButtonElement.addEventListener('click', signOut);

// Toggle for the button.
messageInputElement.addEventListener('keyup', toggleButton);
messageInputElement.addEventListener('change', toggleButton);

checkSetup();
initFirebaseAuth();