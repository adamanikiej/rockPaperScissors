//caching the dom - storing things in variables for later use
var userScore = 0;
var computerScore = 0;
var canPlay = true;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");

const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

//DOERSNT WORK
const modal = document.getElementById("MyModal");
const modal_span = document.getElementsByClassName("close")[0];
const modal_p = document.getElementById("MyModal").querySelector(".modal-content > p");

//gets computers choice
function getComputerMove() {
    const choices = ['r', 'p', 's'];
    const choice = Math.floor(Math.random() * 3);
    return choices[choice];
}

//converts player and computer choices into word
function convertChoices(letter) {
    if (letter == 'r') return "Rock";
    if (letter == 'p') return "Paper";
    return "Scissors";
}

//updates html when user wins
function win(user, comp) {
    const user_div = document.getElementById(user);
    userScore++;
    userScore_span.innerHTML = userScore;
    //ES5 method of string concatenation
    //result_p.innerHTML = convertChoices(user) + " beats " + convertChoices(comp) + ". You Win!";

    //ES6 method of string concatentation
    result_p.innerHTML = `${convertChoices(user)} beats ${convertChoices(comp)}. You Win!`;
    user_div.classList.add('green-glow');
    //ES5 method of making a one line function
    //setTimeout(function() { user_div.classList.remove('green-glow') }, 600);

    //ES6 method of making a one line function
    setTimeout(() => user_div.classList.remove('green-glow'), 600);
}

//updates html when user loses
function lose(user, comp) {
    const user_div = document.getElementById(user);
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = `${convertChoices(comp)} beats ${convertChoices(user)}. You Lose!`;
    user_div.classList.add('red-glow');
    setTimeout(() => user_div.classList.remove('red-glow'), 600);
}

//updates html when user ties
function tie(user, comp) {
    const user_div = document.getElementById(user);
    result_p.innerHTML = `You both picked ${convertChoices(user)}. You Tie!`;
    user_div.classList.add('grey-glow');
    setTimeout(() => user_div.classList.remove('grey-glow'), 600);
}

//checks to see if someone won
function didWin() {
    if (userScore >= 1) {
        canPlay = false;
        modal.style.display = "block";
    } else if (computerScore_span >= 10) {
        canPlay = false;
    }
}

//game logic for rock, paper, scissors game
function game(userInput) {
    if (canPlay) {
        const computerChoice = getComputerMove();
        switch(userInput + computerChoice) {
            case "rs":
            case "pr":
            case "sp":
                win(userInput, computerChoice);
                break;
            case "rp":
            case "ps":
            case "sr":
                lose(userInput, computerChoice);
                break;
            case "rr":
            case "pp":
            case "ss":
                tie(userInput, computerChoice);
                break;
        }
        didWin();
        canPlay = false;
        setTimeout(() => canPlay = true, 600);
    }

}

function main() {
    //event listeners

    //ES5 method of calling function inside of event listener
    //rock_div.addEventListener('click', function() {
    
    //ES6 method of calling function inside of event listener
    rock_div.addEventListener('click', () => game("r"))

    paper_div.addEventListener('click', () => game("p"))
    
    scissors_div.addEventListener('click', () => game("s"))
    
    modal_span.addEventListener('click', () => modal.style.display = "none")
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modal_p.innerHTML = "test";
        }
    });
}

main();