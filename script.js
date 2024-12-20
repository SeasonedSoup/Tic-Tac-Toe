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

    const winConditions = [
        //horizontal
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        //vertical
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        //diagonal
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ]

    const checkWinner = () => {
        for(const conditions of winConditions) {
            const[firstRow, firstColumn] = conditions[0]
            if (board[firstRow][firstColumn].getSymbol() !== '' && 
            conditions.every (([row, column]) => board[row][column].getSymbol() === board[firstRow][firstColumn].getSymbol())) {
                console.log(`The winner symbol is ${board[firstRow][firstColumn].getSymbol()}`);
                return board[firstRow][firstColumn].getSymbol();
            }
        }

        if(getBoard().every(row => row.every(cell => cell.getSymbol() !== ''))) {
            return 'draw';
        }
        return null;
    }
        
    const getBoard = () => board;

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j].addSymbol('')
            }
        }
    }

    const putSymbol = (square, playerSymbol) => {
        //call put symbol with a square and what player and get the row column

        const {row, column} = square;
                    //access it using the board array obj
        const cell = board[row][column]

        if (cell.getSymbol() === '') {
            cell.addSymbol(playerSymbol);
        }
        else {
            return;
        } 
    }

    const printBoard = () => { 
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getSymbol()))
        console.log(boardWithCellValues);
    };
    //return this as accessible functions outside the factory
    return {
        getBoard, 
        putSymbol, 
        printBoard,
        checkWinner,
        resetBoard
    }
}
//cells
function Cell() {
    let value = '';

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
    const board = GameBoard();

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
    let gameOverState = false;

    const switchPlayerTurn = () => {
        if(!gameOverState){
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
        };
    };
    //module for active player
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
    
    const playRound = (square) => {
        if(gameOverState) {
            return
        };
        const { row, column } = square;
        const currentBoard = board.getBoard();
        
        if (currentBoard[row][column].getSymbol() === '') {
        board.putSymbol({row, column}, getActivePlayer().symbol);
        console.log(`${getActivePlayer().name} put ${getActivePlayer().symbol} at index [${row, column}]`)

        winner = board.checkWinner();
        if(winner){
            if(winner === 'draw') {
                console.log('game is draw');
            } else {
                console.log(`The winner is ${winner}`);
            }
            gameOverState = true;
        }
        

        //after putting symbol we switch the turns get the new board with the value X or O
        switchPlayerTurn();
        printNewRound();
        } else {
            console.log('Cell is already occupied. Please choose another cell.');
        }
    };

    //restartGameFunction
    const restartGame = () => {
        board.resetBoard();
        gameOverState = false;
        activePlayer = players[0]
        printNewRound();
    }
    //get the initial round
    printNewRound();
    //revelaed that active polayer is gonnab e for dom manipulation
    return {
        playRound, 
        getActivePlayer,
        restartGame,
        getBoard: board.getBoard,
        checkWinner: board.checkWinner
    };
}

function ScreenController() {
    //initailzie before passing
    let game;

    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const resultDiv = document.querySelector('.result');
    const resetButton = document.querySelector('.Replay');
    const startButton = document.querySelector('.start');
    const playerOneInput = document.querySelector('#playerOneInput');
    const playerTwoInput = document.querySelector('#playerTwoInput');

    const updateScreen = () => {
        boardDiv.textContent = '';
        resultDiv.textContent = '';
        const board  = game.getBoard();
        const activePlayer = game.getActivePlayer();


        playerTurnDiv.textContent = `${activePlayer.name}'s turn`;
        board.forEach((row, rowIndex) => { 
            row.forEach((cell, columnIndex) => {       
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell')
                
                cellButton.rowIndex = rowIndex;
                cellButton.columnIndex = columnIndex;
                
                cellButton.textContent = cell.getSymbol();

                boardDiv.appendChild(cellButton);
                
            });
        });
        const winnerText = showWinner();
        if (winnerText) {
            resultDiv.textContent = winnerText;
        }
    };
    //Add event listeners to the cell buttons in a function module
    function clickHandlerCells(e) {
        const target = e.target
        
        if(!target.classList.contains('cell')) return;

        const row = target.rowIndex
        const column = target.columnIndex
        
        game.playRound({row, column});
        updateScreen(); 
    }
    

    boardDiv.addEventListener('click', clickHandlerCells);

    resetButton.addEventListener('click', () => {
        game.restartGame();
        updateScreen();
    })
    
    startButton.addEventListener('click', () => {
        const playerOneName = playerOneInput.value || 'Player One';
        const playerTwoName = playerTwoInput.value || 'Player Two';

        game = GameController(playerOneName, playerTwoName); // Pass names to GameController.
        updateScreen();
    });
    let showWinner = () => {
        let winner = game.checkWinner()
        if(winner){
            return winner === 'draw' ? 'The game is a draw' : `The winner is ${winner}`
        }
        return '';
    }
   
};
    ScreenController();