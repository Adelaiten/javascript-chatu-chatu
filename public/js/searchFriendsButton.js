let isMenuOpen = false;
let usersLoaded = false;
document.getElementById("menu").addEventListener("click", function(){
    if(!isMenuOpen){
        let usersSearcher = document.getElementById("friend-searcher");
        usersSearcher.style.display="block";
        if(!usersLoaded){
            let usersDatabase = firebase.database().ref('users');
            usersDatabase.on('value', function(snapshot){
                snapshot.forEach(function(childSnapshot){
                    let friendId = childSnapshot.key;
                    let user = childSnapshot.val().name;
                    let usersDiv = document.createElement("div");
                    usersDiv.setAttribute("id", friendId);
                    let imageUser = document.createElement("img");
                    let userDescriptionSpan = document.createElement("span");
                    let userNameSpan = document.createElement("span");
                    let addFriendButton = document.createElement("button");
                    let imageButton = document.createElement("img");
                    usersDiv.classList.add("user-found");
                    imageUser.setAttribute("src", "img/dog.png");
                    
                    addFriendButton.classList.add("add-friend-button");

                    imageButton.classList.add("add-friend-button");
                    imageButton.setAttribute("src", "img/plus.svg");
                    addFriendButton.appendChild(imageButton);
                    
                    imageUser.classList.add("user-photo");
                    userDescriptionSpan.classList.add("user-found-description");
                    userNameSpan.classList.add("user-found-name");
                    userNameSpan.textContent = user;
                    userDescriptionSpan.appendChild(userNameSpan);
                    usersDiv.appendChild(imageUser);
                    usersDiv.appendChild(userDescriptionSpan);
                    usersDiv.appendChild(addFriendButton);
                    usersSearcher.appendChild(usersDiv);

                    addFriendButton.addEventListener("click", function(){
                        let currentUser = firebase.auth().currentUser;
                        let currentUserId = currentUser.uid;
                    
                        createPrivateChat(currentUserId, friendId);  
                    });
                    
                })
            });
            usersLoaded = true;
        }

        isMenuOpen = true;
    }else {
        document.getElementById("friend-searcher").style.display="none";
        isMenuOpen = false;
    }             

});
