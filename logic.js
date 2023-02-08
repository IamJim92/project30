const startButton = document.getElementById("on-button");
const preGameDisplay = document.querySelector(".pre-game");
const gameDisplay = document.querySelector(".game");
const gameRow = document.querySelector(".game-row");
const boxs = gameRow.querySelectorAll(".box");
const keys = document.querySelectorAll(".keyboard-button");
const activeBox = document.getElementsByClassName(" active");
const celebration = document.querySelector(".celebration");
const backboard = document.querySelector(".backboard");

let userGuess = [];
let gameScore = 0;
let guessCount = 0;
// let endGame = false;


// document.addEventListener("keyup", (e) => {
//     userTyping(e);
// })

startButton.addEventListener("click", (e) => {
    renderGame();
    document.body.style.backgroundImage = "url('./background.svg')";
})

// counter setup
let guessCountDiv  = document.getElementById("guess-count-holder");
const pElem = document.createElement('p');
pElem.innerHTML = "Guess Count: " + guessCount;
guessCountDiv.appendChild(pElem);

// active class listener
for (let i = 0; i < boxs.length; i++) {
    boxs[i].addEventListener("click", function() {
        activeBox[0].className = activeBox[0].className.replace(" active", "");
        this.className += " active";
    });
}

// keyboard listener
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function() {

        const input = keys[i].value;
        if (input === "enter") {
            console.log("checking answer..");
            userGuess = [];
            userGuess.push(boxs[0].value, boxs[1].value, boxs[2].value, boxs[3].value, boxs[4].value, boxs[5].value);
            console.log(userGuess);
            guessCount += 1;
            gameScore = wordCheck(userGuess);
            if (gameScore == 6) {
                console.log("WINNER!");
                celebration.className = celebration.className.replace(" off", "");
                document.body.style.backgroundImage = "url('./venice.jpg')";
                // backboard.style.opacity = 0;
                endGame = true;
            } else {
                console.log("LOSSER!");
            }
        } else if (input === "clr") {
            stripAllValues(boxs);
            stripAllColors(boxs);
            setPosition1Active();
        } else {
            activeBox[0].value = input;
            nextActive();
        }
    });
}



// functions
// function userTyping(e) {
//     let pressedKey = String(e.key);
//     let found = pressedKey.match(/[a-z]/gi);
//     switch(pressedKey) {
//         case pressedKey === "Backspace":
//             // deleteLetter()
//             console.log(pressedKey);
//             break;
//         case pressedKey === "Enter":
//             // checkGuess()
//             console.log(pressedKey);
//             break;
//         case !found || found.length > 1:
//             // checkGuess()
//             console.log(pressedKey);
//             // activeBox[0].value = pressedKey;
//             break;
//         default:
//             console.log(pressedKey);
//             activeBox[0].value = pressedKey;
//             break;    
//     }
//     return;
// }

function wordCheck(answerArray) {
    if (answerArray.length > 6) {
        console.log("error too many letters");
        return;
    }
    let gameScore = 0
    const letter1 = letterCheck(answerArray[0], "v", 0);
    const letter2 = letterCheck(answerArray[1], "e", 1);
    const letter3 = letterCheck(answerArray[2], "n", 2);
    const letter4 = letterCheck(answerArray[3], "i", 3);
    const letter5 = letterCheck(answerArray[4], "c", 4);
    const letter6 = letterCheck(answerArray[5], "e", 5);
    
    gameScore += letter1;
    gameScore += letter2;
    gameScore += letter3;
    gameScore += letter4;
    gameScore += letter5;
    gameScore += letter6;

    
    console.log("SCORE: ", gameScore);
    return gameScore;
}

function letterCheck(userLetter, winningLetter, position) {
    const winningLetters = ["v", "e", "n", "i", "c", "e"];
    if (userLetter === winningLetter) {
        stripColors(position);
        boxs[position].className += " green";
        return 1;
    } else if (userLetter !== winningLetter && winningLetters.includes(userLetter)) {
        stripColors(position);
        boxs[position].className += " orange";
        return 0;
    } else {
        stripColors(position);
        boxs[position].className += " red";
        return 0;
    }
}

function stripColors(position) {
    boxs[position].className = boxs[position].className.replace(" green", "");
    boxs[position].className = boxs[position].className.replace(" orange", "");
    boxs[position].className = boxs[position].className.replace(" red", "");
    return;
}

function stripAllValues(array) {
    array.forEach(e => {
        e.value = "";
    });
    return;
}

function stripAllColors(array) {
    array.forEach(e => {
        e.className = e.className.replace(" green", "");
        e.className = e.className.replace(" orange", "");
        e.className = e.className.replace(" red", "");
    });
    return;
}

function nextActive() {
    if (boxs[0].classList.contains("active")) {
        boxs[1].className += " active";
        boxs[0].classList.remove("active");
        return;
    } else if (boxs[1].classList.contains("active")) {
        boxs[2].className += " active";
        boxs[1].classList.remove("active");
        return;
    } else if (boxs[2].classList.contains("active")) {
        boxs[3].className += " active";
        boxs[2].classList.remove("active");
        return;
    } else if (boxs[3].classList.contains("active")) {
        boxs[4].className += " active";
        boxs[3].classList.remove("active");
        return;
    } else if (boxs[4].classList.contains("active")) {
        boxs[5].className += " active";
        boxs[4].classList.remove("active");
        return;
    } else if (boxs[5].classList.contains("active")) {
        boxs[0].className += " active";
        boxs[5].classList.remove("active");
        return;
    }
}

function setPosition1Active() {
    if (boxs[1].classList.contains("active")) {
        boxs[0].className += " active";
        boxs[1].classList.remove("active");
        return;
    } else if (boxs[2].classList.contains("active")) {
        boxs[0].className += " active";
        boxs[2].classList.remove("active");
        return;
    } else if (boxs[3].classList.contains("active")) {
        boxs[0].className += " active";
        boxs[3].classList.remove("active");
        return;
    } else if (boxs[4].classList.contains("active")) {
        boxs[0].className += " active";
        boxs[4].classList.remove("active");
        return;
    } else if (boxs[5].classList.contains("active")) {
        boxs[0].className += " active";
        boxs[5].classList.remove("active");
        return;
    }
}

function renderStartBtn() {
    preGameDisplay.className = gameOnDisplay.className.replace(" off", "");
    gameDisplay.className += " off";
}

function renderGame() {
    gameDisplay.className = gameDisplay.className.replace(" off", "");
    preGameDisplay.className += " off";
}

// CELEBRATION
