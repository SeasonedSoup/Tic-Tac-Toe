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
    //not implemented
    const winningCombos = []

    const getBoard = () => board;

    const putSymbol = (square, playerSymbol) => {
        //call put symbol with a square and what player and get the row column
        const {row, column} = square;
                    //access it using the board array obj
        const cell = board[row][column]

        if (cell.getSymbol() === '') {
            cell.addSymbol(playerSymbol)
        } 
    }

    const printBoard = () => {
        const cell = game.getBoard();  
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getSymbol()))
        console.log(boardWithCellValues);
    };
    //return this as accessible functions outside the factory
    return {
        getBoard, 
        putSymbol, 
        printBoard
    }
}
//cells
function Cell() {
    let value = ''

    const addSymbol = (player) => {
        value = player;
    };

    const getSymbol = () => value;
    //bring back the functions for cell access
    
    return {
        addSymbol, 
        getSymbol
    };
}
//flow of the game
function GameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const board = gameBoard();

    const players = [
        {
            name: playerOneName,
            symbol: 'X'
        },
        {
            name: playerTwoName,
            symbol: 'O'
        }
    ];

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    //module for active player
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }
    
    const playRound = (square) => {

        const { row, column } = square;
        board.putSymbol({row, column}, getActivePlayer().symbol);
        console.log(`${getActivePlayer().name} put ${getActivePlayer().symbol} at index [${row, column}]`)

        //after putting symbol we switch the turns get the new board with the value X or O
        switchPlayerTurn();
        printNewRound();
    }
    //get the initial round
    printNewRound();
    //revelaed that active polayer is gonnab e for dom manipulation
    return {
        playRound, 
        getActivePlayer
    };
}