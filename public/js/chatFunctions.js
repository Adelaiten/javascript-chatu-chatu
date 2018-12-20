function createPublicChat() {
    let chatName = prompt("What's your new chat room name?");
    const chatDatabase = firebase.database().ref(`/chats/`);

    chatDatabase.push({
          chatName: chatName,
          isPrivate: false,
          members: {
              0: getUserName()
          }
    });
}

const createPublicChatBtn = document.getElementById("createPublicChatBtn");
createPublicChatBtn.addEventListener("click", createPublicChat);