let isMenuOpen = false;
let usersLoaded = false;
document.getElementById("menu").addEventListener("click", function(){
    if(!isMenuOpen){
        var usersSearcher = document.getElementById("friend-searcher");
        usersSearcher.style.display="block";
        if(!usersLoaded){
            var usersDatabase = firebase.database().ref('users');
            usersDatabase.on('value', function(snapshot){
                snapshot.forEach(function(childSnapshot){
                    var userId = childSnapshot.key;
                    var user = childSnapshot.val().name;

                    var email = childSnapshot.val().email;
                    var usersDiv = document.createElement("div");
                    usersDiv.setAttribute("id", userId);
                    var imageUser = document.createElement("img");
                    var userDescriptionSpan = document.createElement("span");
                    var userNameSpan = document.createElement("span");
                    var addFriendButton = document.createElement("button");
                    var imageButton = document.createElement("img");
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


                    
                })
            });
            usersLoaded = true;
        }

        isMenuOpen = true;
    }else {
        document.getElementById("friend-searcher").style.display="none";
        isMenuOpen = false;
    }
    var addFriendButton = document.getElementsByClassName("add-friend-button")[0];                 
    addFriendButton.addEventListener("click", function(){
        var currentUser = firebase.auth().currentUser;
        var currentUserId = currentUser.uid;
        var currentUserName = currentUser.name;
    
        var currentUserDatabase = firebase.database().ref('users/' + currentUserId + "/friends");
        var friendToAdd = {
            userId : user+currentUserName+"Priv"
        };
        console.log(friendToAdd);
        currentUserDatabase.push(friendToAdd);  

    });
});
