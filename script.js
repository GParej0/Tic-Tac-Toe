let gameBoard = ["", "", "", "", "", "", "", "", ""];
let turn = ""; 
let gameOn = true;
let player1, player2;
let playerInfo = document.getElementById("players-info");

const submitButton = document.querySelector("button");

function createPlayer(name, symbol){
    
    return {name, symbol}
}

submitButton.addEventListener("click", ()=>{
    const playersInput = document.querySelector(".players-input"); 
    const inputPlayer1 = document.getElementById("player1").value;
    const inputPlayer2 = document.getElementById("player2").value;
    const symbolX = document.getElementById("x").checked;
    const symbolO = document.getElementById("o").checked;
    const player1Name = document.getElementById("player1Name");
    const player2Name = document.getElementById("player2Name");
    const table = document.querySelector(".game-board");
    
    let symbol1 = "";
    let symbol2 = "";

    if(symbolX === true){
        symbol1 = "X"
        symbol2 = "O"
    }else {
        symbol1 = "O"
        symbol2 = "X"
    }
    

    player1 = createPlayer(inputPlayer1, symbol1);
    player2 = createPlayer(inputPlayer2, symbol2);
        
    inputPlayer1.textContent = "";
    inputPlayer2.textContent = "";

    playersInput.style.display = "none";
    playerInfo.style.display = "flex";
    table.style.display = "grid";

    turn = player1.symbol;
    

    player1Name.textContent = `${player1.name} : ${player1.symbol}`;
    player2Name.textContent =`${player2.name} : ${player2.symbol}`;

});


const boxes = document.querySelectorAll(".game-board>div");
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]             
];

boxes.forEach(box=>{
    box.addEventListener("click", ()=>{
        const index = box.dataset.id;
        if(gameBoard[index]==="" && gameOn === true){
            gameBoard[index]= turn;
            box.textContent = turn;
            checkWin();
            if(turn === "X"){
                turn = "O";
            } else {
                turn = "X";
            }
        }
    })
});

function checkWin(){
    for (const condition of winConditions) {
        const posA = condition[0];
        const posB = condition[1];
        const posC = condition[2];
        if (gameBoard[posA] !== "" && gameBoard[posA] === gameBoard[posB] && gameBoard[posB] === gameBoard[posC]) {
            
        let winner = (gameBoard[posA] === player1.symbol) ? player1.name : player2.name;
        setTimeout(()=>{
        alert(`¡Winner: ${winner}! 🏆`)}, 150);
        gameOn = false;
        resetBtn.style.display = "block";
        return; 
        }
            }
         if (gameBoard.every(cell=> cell !== "")){
            gameOn = false;
            setTimeout(() => {
            alert("¡It's a tie! 👔");
            }, 150);
            resetBtn.style.display = "block";
            return
        }
       
};

const resetBtn = document.getElementById("resetBtn"); 

function resetGame() {
    
    gameOn = true;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    turn = player1.symbol;

    
    boxes.forEach(box => {
        box.textContent = "";
    });

    
    const player1Name = document.getElementById("player1Name");
    const player2Name = document.getElementById("player2Name");
    player1Name.textContent = `${player1.name} : ${player1.symbol}`;
    player2Name.textContent = `${player2.name} : ${player2.symbol}`;

    resetBtn.style.display = "none";
}

resetBtn.addEventListener("click", resetGame);