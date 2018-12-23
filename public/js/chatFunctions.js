function createPublicChat() {
    let chatName = prompt("What's your new chat room name?");
    const chatDatabase = firebase.database().ref(`/chats/`).push({
          chatName: chatName,
          isPrivate: false
    });
}

const createPublicChatBtn = document.getElementById("createPublicChatBtn");
createPublicChatBtn.addEventListener("click", createPublicChat);


let lastHighlighted;
var nowHighlighted;

function highlightActiveChat(isPrivate) {
    console.log(lastHighlighted);
    console.log(nowHighlighted);
    removeHighlight(lastHighlighted);
    let elementToAddHighlight = FindByAttributeValue("id", nowHighlighted, "div");
    elementToAddHighlight.classList.add("using-chat");
    switchChats(nowHighlighted, 12);
    lastHighlighted = nowHighlighted;
    firebase.database().ref(`/chats/${nowHighlighted}/members/`).update({
        [getProfileUID()] : 1
    });
}

function removeHighlight(lastHighlighted) {
    let elementToRemoveHighlight = FindByAttributeValue("id", lastHighlighted, "div");
    elementToRemoveHighlight.classList.remove("using-chat");
    quitChatRoom();
}


function getIDIfChatExists(element, className) {
    do {
      if (element.classList && element.classList.contains(className)) {
        nowHighlighted = element.getAttribute("id");
        return true;
      }
      element = element.parentNode;
    } while (element);
    return false;
}

function chatHighlightFunctions() {
    let chats = document.getElementById('chats');

    chats.addEventListener('click', (event) => {
        swapChat(event.target);
    }, false);
}

function swapChat(target){
    if(getIDIfChatExists(target, "group-chat")) {
        highlightActiveChat();
    }
}

function quitChatRoom(){
    firebase.database().ref(`/chats/${lastHighlighted}/members/`).update({
        [getProfileUID()] : null
    });
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
    changeActiveChatNameOnWebpage(nowHighlighted);
}

function clearChatMessages() {
    var myNode = document.getElementById("chat");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function changeActiveChatNameOnWebpage(nowHighlighted) {
    let span = document.getElementById("active-chat-name");
    let activeChatElement = FindByAttributeValue("id", nowHighlighted, "div");
    span.textContent = activeChatElement.getAttribute("name");
}
