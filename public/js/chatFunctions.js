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
let nowHighlighted;

function highlightActiveChat() {
    console.log(lastHighlighted);
    console.log(nowHighlighted);
    removeHighlight(lastHighlighted);
    let elementToAdHighlight = FindByAttributeValue("id", nowHighlighted, "div");
    elementToAdHighlight.classList.add("using-chat");
    switchChats(nowHighlighted, 12);
    lastHighlighted = nowHighlighted;
}

function removeHighlight(lastHighlighted) {
    let elementToRemoveHighlight = FindByAttributeValue("id", lastHighlighted, "div");
    elementToRemoveHighlight.classList.remove("using-chat");
}


function getIDIfChatExists(element, className) {
    do {
      if (element.classList && element.classList.contains(className)) {
        nowHighlighted = element.getAttribute("id");
      }
      element = element.parentNode;
    } while (element);
}

function chatHighlightFunctions() {

    let chats = document.getElementById('chats');

    chats.addEventListener('click', (event) => {
        if(getIDIfChatExists(event.target, "group-chat")) {
            highlightActiveChat();
        }
    }, false);
}

function FindByAttributeValue(attribute, value, element_type)    {
    element_type = element_type || "*";
    var All = document.getElementsByTagName(element_type);
    for (var i = 0; i < All.length; i++)       {
      if (All[i].getAttribute(attribute) == value) { return All[i]; }
    }
}

function switchChats(id, limit) {
    clearChatMessages();
    loadMessages(id, limit);
}

function clearChatMessages() {
    var myNode = document.getElementById("chat");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}
