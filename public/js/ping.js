const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;
canvas.maxWidth = 1600;
const maxBallSpeed = 5;

const cw = canvas.width;
const ch = canvas.height;
const cw75 = 0.75*cw;
const cw40 = 0.4*cw;

const ballSize = 0.02 * cw;
let ballX = cw/2 - ballSize/2;
let ballY = ch/2 - ballSize/2;

const paddelHeight = 0.2 * ch;
const paddelWidth = 0.02 * cw;

const playerX = 0.07 * cw;
let playerY = ch/2 - paddelHeight/2;
    
const aiX = 0.91 * cw;
let aiY = ch/2 - paddelHeight/2;

const lineWidth = 0.006 * cw;
const lineHeight = 0.016 * ch;

let ballSpeedX = 1;
let ballSpeedY = 1;

let playerScore = 0;
let aiScore = 0;
const playerScoreField = document.getElementById("playerScore");
const aiScoreField = document.getElementById("aiScore");

function player(){
    ctx.fillStyle = "lawngreen";
    ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
}

function ai(){
    ctx.fillStyle = "yellow";
    ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
}

function speed(){
    let randomX = Math.random()*0.3 + 0.7;
    let randomY = Math.random()*0.9 + 0.1;
    let randomAxis = Math.floor(Math.random()*2);
    if (randomAxis==1){
        randomX = -randomX;
    }
    randomAxis = Math.floor(Math.random()*2);
    if (randomAxis==1){
        randomY = -randomY;
    }
    ballSpeedX = randomX;
    ballSpeedY = randomY;
}

function ball(){ 
    ctx.fillStyle = "white";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    let middleBall = ballY + ballSize/2;
    
    if (ballY <= 0 || ballY+ballSize>= ch){
        ballSpeedY =-ballSpeedY;
        speedUp();
    }
    if (ballX <= 0){
        aiScore++;
        speed();
        ballX = cw/2 - ballSize/2;
        ballY = ch/2 - ballSize/2;
        aiScoreField.innerHTML = aiScore;
        
    }
    if (ballX+ballSize >= cw){
        playerScore++;
        speed();
        ballX = cw/2 - ballSize/2;
        ballY = ch/2 - ballSize/2;
        playerScoreField.innerHTML = playerScore;
    }
    if(ballX-playerX <= 0 && ballX-playerX > -maxBallSpeed && middleBall > playerY && middleBall < playerY+paddelHeight){
        ballSpeedX =-ballSpeedX;
        speedUp();
    }
    else if(ballX-aiX >= 0 && ballX-aiX < maxBallSpeed && middleBall > aiY && middleBall < aiY+paddelHeight){
        ballSpeedX =-ballSpeedX;
        speedUp();
    }
}

function table(){
    // Stół
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cw, ch);
    // Linia na środku
    for(let linePosition = 0.04 * ch; linePosition < ch; linePosition += 0.06 * ch){
        ctx.fillStyle = "gray";
        ctx.fillRect(cw/2 - lineWidth/2, linePosition, lineWidth, lineHeight);
    }
}

let topCanvas = canvas.offsetTop;

function playerPosition(e){
    playerY = e.clientY - topCanvas - paddelHeight/2;
    
    if (playerY >= ch-paddelHeight){
        playerY = ch-paddelHeight;
    }
    if (playerY <= 0){
        playerY = 0;
    }
}


function aiPosition(){
    var middlePaddel = aiY + paddelHeight/2;
    var middleBall = ballY + ballSize/2;
    
    // Blisko paletki
    if(ballX >= cw75){
        if(middlePaddel - middleBall < -0.5*ch){
            if(middlePaddel < ch - paddelHeight/2){
                aiY += 0.02 * ch;
            }
        }
        else if(middlePaddel - middleBall > 0.5*ch){
            if(middlePaddel > paddelHeight/2){
                aiY -= 0.02 * ch;
            }
        }  
        if(middlePaddel - middleBall < -0.03*ch){
            if(middlePaddel < ch - paddelHeight/2){
                aiY += 0.01 * ch;
            }
        }
        else if(middlePaddel - middleBall > 0.03*ch){
            if(middlePaddel > paddelHeight/2){
                aiY -= 0.01 * ch;
            }
        }
    }
    // Daleko paletki
    else if(ballX >= cw40){
        if(middlePaddel - middleBall < -0.5*ch){
            if(middlePaddel < ch - paddelHeight/2){
                aiY += 0.01 * ch;
            }
        }
        else if(middlePaddel - middleBall > 0.5*ch){
            if(middlePaddel > paddelHeight/2){
                aiY -= 0.01 * ch;
            }
        }
        if(middlePaddel - middleBall < -0.05*ch){
            if(middlePaddel < ch - paddelHeight/2){
                aiY += 0.005 * ch;
            }
        }
        else if(middlePaddel - middleBall > 0.05*ch){
            if(middlePaddel > paddelHeight/2){
                aiY -= 0.005 * ch;
            }
        }
    }
    else{
        if(middlePaddel < ch/2-0.009*ch){
            aiY += 0.004 * ch;
        }
        else if(middlePaddel > ch/2+0.009*ch){
            aiY -= 0.004 * ch;
        }
    }
}

function speedUp(){
    if(ballSpeedX > 0 && ballSpeedX < maxBallSpeed){
        ballSpeedX += 0.075;
    }
    if(ballSpeedX < 0 && ballSpeedX > -maxBallSpeed){
        ballSpeedX -= 0.075;
    }
    if(ballSpeedY > 0 && ballSpeedY < maxBallSpeed){
        ballSpeedY += 0.075;
    }
    if(ballSpeedX < 0 && ballSpeedX > -maxBallSpeed){
        ballSpeedX -= 0.075;
    }
}

window.addEventListener("mousemove", playerPosition);

function game(){
    table();
    ball();
    player();
    ai();
    aiPosition();
}


setInterval(game, 1000/120);

document.getElementById("ping-pong").addEventListener("click", function() {
    document.getElementById("canvas").style.display="block";
    game();
    document.addEventListener("keydown", function(event){
        var keyCode = event.keyCode;
        if(keyCode == 27) {
            document.getElementById("canvas").style.display="none";
        }

    })
});



