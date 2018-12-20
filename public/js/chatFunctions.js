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
    lastHighlighted = nowHighlighted;
}

function removeHighlight(lastHighlighted) {
    let elementToRemoveHighlight = FindByAttributeValue("id", lastHighlighted, "div");
    elementToRemoveHighlight.classList.remove("using-chat");
}


function getChatID(element, className) {
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
        if(getChatID(event.target, "group-chat")) {
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
