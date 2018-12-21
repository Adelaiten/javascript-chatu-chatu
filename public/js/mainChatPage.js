function getUserName() {
    return firebase.auth().currentUser.displayName;
}

function isUserSignedIn() {
    return !!firebase.auth().currentUser;
}

function signOut() {
    quitChatRoom();
    firebase.auth().signOut();
}

function getProfileUID() {
    return firebase.auth().currentUser.uid;
}

function getProfilePicUrl() {
  return firebase.auth().currentUser.photoURL || '/img/ping-pong.png';
}

function getUserName() {
  return firebase.auth().currentUser.displayName;
}

function addUserToDabase() {
  var currentUser = firebase.auth().currentUser;
  var email = currentUser.email;
  var name = currentUser.displayName;
  var userId = currentUser.uid;
  const userDatabase = firebase.database().ref("users");

  
  userDatabase.once('value', function(snapshot) {
      if(!snapshot.hasChild(userId)){
          userDatabase.child(userId).set({
              name : name,
              email : email,
              friends : ["FqxwVP2JyRXtzv1QPVD1gHLzHvl1", "Bca7lAlqmphAq36YrngezEw4EsR2"],
              chats : []
          });
      }
  });


}

// Loads chat message history and listens for upcoming ones.
function loadMessages(chatId, limit) {
  // Loads the last 12 messages and listens for new ones.
  var callback = function(snap) {
    var data = snap.val();
        displayMessage(snap.key, data.authorId, data.authorName, data.text, data.profilePicUrl, data.imageUrl);
  };

  firebase.database().ref(`/messages/${chatId}`).limitToLast(limit).on('child_added', callback);
  firebase.database().ref(`/messages/${chatId}`).limitToLast(limit).on('child_changed', callback);
}

function loadChatRooms() {
    let callback = function(snap) {
        let data = snap.val();
        if (!data.isPrivate){
            let memebersNumber = 0;
            if (data.members){
                memebersNumber = Object.keys(data.members).length;
            }
            displayChatRoom(data.chatName, memebersNumber, snap.key);
        }
    };
    
    firebase.database().ref(`/chats/`).on('child_added', callback);
    firebase.database().ref(`/chats/`).on('child_changed', callback);
}



function loadFriendsList() {
  var userId = firebase.auth().currentUser.uid;
  var userFriendsDatabase = firebase.database().ref('users/' + userId + "/friends");
  var friendsList = document.getElementsByClassName("friends")[0];

  
//  userFriendsDatabase.on('value', function(snapshot){
//    snapshot.forEach(function(childSnapshot){
//      var friendId = childSnapshot.val();
//
//      console.log(friendId);
//      var friendDatabase = firebase.database().ref('users/' + friendId);
//      console.log(friendDatabase);
//
//      var friendDiv = document.createElement("div");
//      friendDiv.setAttribute("id", friendId);
//      var imageFriend = document.createElement("img");
//      var friendDescriptionSpan = document.createElement("span");
//      var friendNameSpan = document.createElement("span");
//      friendDiv.classList.add("friend");
//      imageFriend.setAttribute("src", "img/dog.png");
//      
//      imageFriend.classList.add("friend-photo");
//      friendDescriptionSpan.classList.add("friend-description");
//      friendNameSpan.classList.add("friend-name");
//
//      friendDatabase.once('value', function(friendSnapshot){
//        friendNameSpan.textContent = friendSnapshot.val().name;
//        friendDescriptionSpan.appendChild(friendNameSpan);
//        friendDiv.appendChild(imageFriend);
//        friendDiv.appendChild(friendDescriptionSpan);
//
//
//        friendsList.appendChild(friendDiv);
//
//      })
//    })
//
//  });
}



var MESSAGE_TEMPLATE =
    '<div>' +
        '<img src="img/dog.png" class="author-photo">' +
        '<span class="author"></span>' +
        '<span class="date"></span>' + 
        '<div class="message message-coming-in-interior">' +
            '<span></span>' +
        '</div>' +
    '</div>';

let CHAT_LI_TEMPLATE = 
    '<div class="group-chat">' +
      '<span class="group-description">' +
        '<span class="group-name"></span>' +
        '<span class="last-post"></span>' +
      '</span>' +
    '</div>';


function displayChatRoom(name, usersNumber, id){
    let div = document.getElementById(id);
    if (!div){
        let container = document.createElement('div');
        container.innerHTML = CHAT_LI_TEMPLATE;
        div = container.firstChild;
        div.setAttribute("id", id);
        chatList.appendChild(div);
    }
    let chatName = div.querySelector('.group-name');
    chatName.textContent = name;
    div.setAttribute("name", name);
    div.querySelector('.last-post').textContent = `members: ${usersNumber}`;
}

// Displays a Message in the UI.
function displayMessage(key, authorId, authorName, text, picUrl, imageUrl) {
    let div = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!div) {
        let container = document.createElement('div');
        container.innerHTML = MESSAGE_TEMPLATE;
        div = container.firstChild;
        div.setAttribute('id', key);
        chatElement.appendChild(div);
    }
    
    let authorElement = div.querySelector('.author');
    authorElement.id = authorId;
    authorElement.textContent = authorName;
    
    if (authorElement.id === firebase.auth().currentUser.uid){
        div.classList.add('message-coming-out');
    } else {
        div.classList.add('message-coming-in');
    }
    
    if (picUrl) {
        let authorPhotoElement = div.querySelector('.author-photo');
        authorPhotoElement.setAttribute('src', picUrl);
    //    div.querySelector('.pic').style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(picUrl) + ')';
    }
//  div.querySelector('.name').textContent = name;
    if (text) { // If the message is text.
        let messageElement = div.querySelector('.message span');
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


function authStateObserver(user) { //tutaj  metoda
    if(user) { 
        addUserToDabase();
        loadUserInfo();
        loadChatRooms();
        loadFriendsList();
        registerListeners();
        chatHighlightFunctions();
    } else {
        window.location = '/';
    }
}


function loadUserInfo(){
    const profilePictureUrl = getProfilePicUrl();
    document.getElementById('user-photo').style.backgroundImage = 'url(' + profilePictureUrl + ')';

    const userName = getUserName();
    document.getElementById('user-name').textContent = userName;
    
    currentUser = firebase.auth().currentUser;
}

function registerListeners(){
    signOutButtonElement.addEventListener('click', signOut);
    messageInputElement.addEventListener('keyup', sendMessage);
}

function sendMessage(ev){
    if (ev.keyCode !== 13 || ev.shiftKey){
        return;
    }
    
    if (!nowHighlighted){
        const NO_CHAT_ROOM_ELEMENT = document.createElement('div');
        NO_CHAT_ROOM_ELEMENT.textContent = "Please select a chat room!";
        chatElement.appendChild(NO_CHAT_ROOM_ELEMENT);
        messageInputElement.value = messageInputElement.value.slice(0, -1);
        return;
    }
    
    let chatId = nowHighlighted;
    let message = messageInputElement.value;
//    message.replace('<br>', '\n');
    
    firebase.database().ref(`/messages/${chatId}`).push({
        authorId : currentUser.uid,
        authorName : getUserName(),
        profilePicUrl : getProfilePicUrl(),
        text : message
    });
    
    messageInputElement.value = "";
}

// ===========================================================
                                                        
let currentUser;

var signOutButtonElement = document.getElementById('logout');
let chatList = document.getElementById('chats');
let chatElement = document.getElementById('chat');
let messageInputElement = document.getElementById('message-input');

checkSetup();
initFirebaseAuth();