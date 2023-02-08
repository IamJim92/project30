const gameRow   = document.querySelector(".game-row");
const boxs      = gameRow.querySelectorAll(".box");
const keys      = document.querySelectorAll(".keyboard-button");
const activeBox = document.getElementsByClassName(" active");
let userGuess   = [];
let guessCount  = "";

document.addEventListener("keyup", (e) => {
    userTyping(e);
})

// counter setup
let guessCountDiv  = document.getElementById("guess-count-holder");
const pElem = document.createElement('p');
pElem.innerHTML = "Guess Count: " + guessCount;
guessCountDiv.appendChild(pElem);


    // NEEDS TO BE INSIDE A LOOP ?
    
        // for (let guessCount = 0; guessCount < 99; guessCount++) {}
        
      

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
            // guessCount += 1;
            theGame(userGuess);
        } else if (input === "del") {
            activeBox[0].value = "";
        } else {
            activeBox[0].value = input;
            nextActive();
        }
    });
}

// functions
function userTyping(e) {
    let pressedKey = String(e.key);
    let found = pressedKey.match(/[a-z]/gi);
    switch(pressedKey) {
        case pressedKey === "Backspace":
            // deleteLetter()
            console.log(pressedKey);
            break;
        case pressedKey === "Enter":
            // checkGuess()
            console.log(pressedKey);
            break;
        case !found || found.length > 1:
            // checkGuess()
            console.log(pressedKey);
            // activeBox[0].value = pressedKey;
            break;
        default:
            console.log(pressedKey);
            activeBox[0].value = pressedKey;
            break;    
    }
    return;
}

function theGame(answerArray) {
    if (answerArray.length > 6) {
        console.log("error too many letters");
        return;
    }
    letterCheck(answerArray[0], "v", 0);
    letterCheck(answerArray[1], "e", 1);
    letterCheck(answerArray[2], "n", 2);
    letterCheck(answerArray[3], "i", 3);
    letterCheck(answerArray[4], "c", 4);
    letterCheck(answerArray[5], "e", 5);
    return;
}

function letterCheck(userLetter, winningLetter, position) {
    const winningLetters = ["v", "e", "n", "i", "c", "e"];
    if (userLetter === winningLetter) {
        stripColors(position);
        boxs[position].className += " green";
    } else if (userLetter !== winningLetter && winningLetters.includes(userLetter)) {
        stripColors(position);
        boxs[position].className += " orange";
    } else {
        stripColors(position);
        boxs[position].className += " red";
    }
    return;
}

function stripColors(position) {
    boxs[position].className = boxs[position].className.replace(" green", "");
    boxs[position].className = boxs[position].className.replace(" orange", "");
    boxs[position].className = boxs[position].className.replace(" red", "");
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