const lifeScreen = document.getElementById("lifeScreen");
const coinScreen = document.getElementById("coinScreen");
const scoreScreen = document.getElementById("scoreScreen");

const btnThrow = document.getElementById("btnThrow");
const btnHigher = document.getElementById("btnHigher");
const btnLower = document.getElementById("btnLower");

const feedbackText = document.getElementById("feedbackText");

let lives, coins;
let gameStarted = false;    //om te kijken of het de eerste ronde is
let previousDiceRoll, currentDiceRoll;
let playerBet;              //checkt of de speler hoger of lager kiest  


function updateScreens(){
    lifeScreen.textContent = "Lives: " + lives;
    coinScreen.textContent = "Coins: " + coins;
}

function displayFeedback(text){
    feedbackText.textContent = text;
}

function init(){
    lives = 3; 
    coins = 0;
    updateScreens();
    btnThrow.textContent = "Start";
    btnThrow.disabled = false;
    btnHigher.hidden = true;
    btnLower.hidden = true;
    displayFeedback("Press Start to throw fist dice");
}


function diceRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateScore(){
    if(previousDiceRoll == currentDiceRoll){
        displayFeedback("You rolled the same number ¯\\_( ͡° ͜ʖ ͡°)_/¯, roll again!");
    }
    else if((currentDiceRoll > previousDiceRoll) && (playerBet == "higher")){
        displayFeedback("You won a coin! :D roll again!");
        coins++;
    }
    else if((currentDiceRoll < previousDiceRoll) && (playerBet == "lower")){
        displayFeedback("You won a coin! :) roll again!");
        coins++;
    }
    else{
        console.log(previousDiceRoll + " -> " + currentDiceRoll);
        displayFeedback("You lost a life >:( roll again!");
        lives--;
    }
    updateScreens();

    if(lives <= 0){
        alert("It's Over :'( your score was " + coins);
        gameStarted = false;
        init();
    }
}

function throwDice(){
    currentDiceRoll = diceRandom(1,6);
    scoreScreen.textContent = currentDiceRoll;
    btnThrow.disabled = true;
    
    if(gameStarted == false){   //als het de eerste ronde is, verander de btn text naar throw dice en laat keuzes zien
        btnThrow.textContent = "Throw Dice";
        btnHigher.hidden = false;
        btnLower.hidden = false;
        gameStarted = true;
        displayFeedback("Choose whether the next roll will be Higher or Lower than the current roll ("+currentDiceRoll+")");
    }
    else{
        updateScore();
    }

    previousDiceRoll = currentDiceRoll; //nadat de scores zijn geupdate (of eerste ronde) moet de laatste diceroll worden onthouden
    btnHigher.disabled = false;
    btnLower.disabled = false;
}

function higher(){
    playerBet = "higher";
    btnThrow.disabled = false;
    btnHigher.disabled = true;
    btnLower.disabled = false;
}

function lower(){
    playerBet = "lower";
    btnThrow.disabled = false;
    btnHigher.disabled = false;
    btnLower.disabled = true;
}


init();