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


let lastHighlighted;

function highlightActiveChat() {
    console.log("dupa");
    removeHighlight(lastHighlighted);
    this.classList.add("using-chat");
    lastHighlighted = this.getAttribute("id");
}

function removeHighlight(lastHighlighted) {
    let elementToRemoveHighlight = FindByAttributeValue("id", lastHighlighted);
    elementToRemoveHighlight.classList.remove("using-chat");
}

function addChatHighlightFunctions() {
    let classname = document.getElementsByClassName('group-chat');

    for (let i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', highlightActiveChat, false);

    // let theParent = document.querySelector(".group-chat");
    // theParent.addEventListener("click", attachEvent, false);
 
    // function attachEvent(e) {
    //     if (e.target !== e.currentTarget) {
    //         let clickedItem = e.target.id;
    //         clickedItem.highlightActiveChat();
    //     }
    //     e.stopPropagation();
    }
}
