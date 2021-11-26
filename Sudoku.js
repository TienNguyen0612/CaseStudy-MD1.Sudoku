const easy = [
    "-12--6358-7-843-26863125---3-4-5869-7586--23--96432--72475-1--398--647-263128---5",
    "41297635857984312686312547932475869175861923496432417247591863985364712631287945"
];
const medium = [
    "8-14-9-7---7-325-154--1-9-29-61-4-5-2--97-16--345--2-7762---4-9-85-91--6--9-47-25",
    "821459673697832541543716982976124358258973164134568297762385419485291736319647825"
];
const hard = [
    "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
    "712583694639714258845269173521436987367928415498175326184697532253841769976352841",
];
let timer;
let timeRemaining;
let lives;
let selectedNum;
let selectedTile;
let disableSelect;

window.onload = function () {
    getId("start-btn").addEventListener("click", startGame);
    //Add event listener to each number in number-container
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].addEventListener("click", function () {
            //If selecting is not disabled
            if (!disableSelect) {
                if (this.classList.contains("selected")) {
                    this.classList.remove("selected");
                    selectedNum = null;
                } else {
                    //Deselect all other numbers
                    for (let i = 0; i < 9; i++) {
                        id("number-container").children[i].classList.remove("selected");
                    }
                    //Select it and update selectedNum
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        });
    }
}

function startGame() {
    let board;
    if (id("diff-1").checked) board = easy[0];
    else if (id("diff-2").check) board = medium[0];
    else board = hard[0];
    lives = 3;
    disableSelect = false;
    id("lives").textContent = "Lives Remaining 3";
    generateBoard(board);
    //Start the timer
    startTimer();
    //Set theme
    if (id("theme-1").checked) {
        qs("body").classList.remove("dark");
    } else {
        qs("body").classList.add("dark");
    }
    //Show number-container
    id("number-container").classList.remove("hidden");
}

function startTimer() {
    if (id("time-1").checked) timeRemaining = 180;
    else if (id("time-2").checked) timeRemaining = 300;
    else timeRemaining = 600;
    //Set timer for first second
    id("timer").textContent = timeConversion(timeRemaining);
    timer = setInterval(function () {
        timeRemaining--;
        if (timeRemaining === 0) endGame();
        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000)
}

function timeConversion(time) {
    let minutes = Math.floor(time / 60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
    return minutes + ":" + seconds;
}

function generateBoard(board) {
    //clear previous board
    clearPrevious();
    let idCount = 0;
    //Creat 81 tiles
    for (let i = 0; i < 81; i++) {
        //Creat a new paragraph element
        let tile = document.createElement("p");
        if (board.charAt(i) != "-") {
            tile.textContent = board.charAt(i);
        } else {
            //Add click event listener to tile
            tile.addEventListener("click", function () {
                //If selecting is not disabled
                if (!disableSelect) {
                    //If the tile is already selected
                    if (tile.classList.contains("selected")) {
                        //Then remove selection
                        tile.classList.remove("selected");
                        selectedTile = null;
                    } else {
                        //Deselect all other tiles
                        for (let i = 0; i < 81; i++) {
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        //Add selection and update variable
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            });
        }
        //Assign tile id
        tile.id = idCount;
        //Increment for next tile
        idCount++;
        //Add tile class to all tiles
        tile.classList.add("tile");
        if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)) {
            tile.classList.add("bottomBorder");
        }
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("rightBorder");
        }
        //Add tile to board
        id("board").appendChild(tile);
    }
}

function updateMove() {
    //If a tile and a number is selected
    if (selectedTile && selectedNum) {
        //Set the tile to the correct number
        selectedTile.textContent = selectedNum.textContent;
        //If the number matches the corresponding number in the solution key
        if (checkCorrect(selectedTile)) {

        }
    }
}

function checkCorrect(tile) {
    //Set solution based on difficulty selection
    let solution;
    if (id("diff-1").checked) solution = easy[1];
    else if (id("diff-2").checked) solution = medium[1];
    else solution = hard[1]
    //If tile's number is equal to solution's number
    if (solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}

function clearPrevious() {
    let tiles = qsa(".tile");
    //Remove each tile
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }
    //If there is a timer clear it
    if (timer) clearTimeout(timer);
    //Deselect any numbers
    for (let i = 0; i < id("number-container").children.length; i++) {
        id("number-container").children[i].classList.remove("selected");
    }
    //Clear selected variables
    selectedTile = null;
    selectedNum = null;
}

function getId(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector)
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}