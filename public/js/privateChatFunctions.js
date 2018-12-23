function createPrivateChat(myId, friendID) {
    
    const privateChatDatabase = firebase.database().ref(`/privateChats/`).push({
        isPrivate: true,
        members : {
            0: myId,
            1: friendID
        }
    });
    let privateChatId = privateChatDatabase.getKey();
    console.log(privateChatId);
    savePrivateChatsIdToUsers(privateChatId, myId, friendID);
}

function savePrivateChatsIdToUsers(privateChatId, myId, friendID) { 
    firebase.database().ref(`users/${myId}/friends`)
        .update({
            [friendID] : privateChatId
        }) 
    firebase.database().ref(`users/${friendID}/friends`)
        .update({
            [myId] : privateChatId
        })  
}

function privateChatsEventSpreader() {
    let friends = document.getElementById('friends');

    friends.addEventListener('click', (event) => {
        swapPrivateChat(event.target);
    }, false);
}

function swapPrivateChat(target){
    if(getIDIfChatExists(target, "friend")) {
        const isPrivate = true;
        highlightActiveChat(isPrivate);
    }
}

// function getPrivateChatIdByFriendId(friendId) {
//     let callback = function(snap) {
//         let ourChatId = snap.val();
//         return ourChatId
//     }
//     let myId = getProfileUID();
//     firebase.database().ref(`users/${myId}/friends/${friendId}`).once('value').then(callback);
// }