//creating the board and states X and O
function GameBoard(){
    const rows = 3;
    const columns = 3;
    const board = [];
    //create 3x3 array
    for (let i = 0; i < rows; i++){
        board[i] = []
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const putSymbol = (square, player) => {
        console.log('Putting symbol', player, 'at', square);  
        //call put symbol with a square and what player and get the row column
        const {row, column} = square;
                    //access it using the board array obj
        const cell = board[row][column]

        if (cell.getSymbol() === '') {
            cell.addSymbol(player)
        } 
    }

    const printBoard = () => {
        const cell = game.getBoard();  
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getSymbol()))
        console.log(boardWithCellValues);
    };
    //return this as accessible functions outside the factory
    return {getBoard, putSymbol, printBoard}
}
//cells
function Cell() {
    let value = ''

    const addSymbol = (player) => {
        value = player;
    };

    const getSymbol = () => value;
    //bring back the functions for cell access
    
    return {addSymbol, getSymbol};
}
//flow of the game
function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    
}