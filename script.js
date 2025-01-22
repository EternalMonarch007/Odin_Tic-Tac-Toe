const cells = document.querySelectorAll('.cell');
const statisText = document.querySelector('#statusText');
const resetBtn = document.querySelector('#resetBtn');
const winConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let options = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let currentPlayer = 'X';
initializeGame();
function initializeGame(){
   cells.forEach(cell => cell.addEventListener('click', cellClicked));
   resetBtn.addEventListener('click', resetGame);
   statusText.textContent = `${currentPlayer}'s turn`;
   gameActive = true;
}
function cellClicked(){
    const id= this.getAttribute("id");
    if(options[id] !== "" || !gameActive){
        return;
    }
    updateCell(this, id);

}
function updateCell(cell, index){
   options[index] = currentPlayer;
   cell.textContent = currentPlayer;
   checkWinner();
}
function changePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon=false;
    for(let i=0; i<winConditions.length; i++){
        const condition = winConditions[i];
        let a = options[condition[0]];
        let b = options[condition[1]];
        let c = options[condition[2]];
        if(a === "" || b === "" || c === ""){
            continue;
        }
        if(a === b && b === c){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins`;
        gameActive = false;
        return;
    }else if(!options.includes("")){
        statusText.textContent = `It's a draw`;
        gameActive = false;
        return;
    } else{
        changePlayer();
    }
}
function resetGame(){
    curretPlayer="X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    gameActive = true;
}   