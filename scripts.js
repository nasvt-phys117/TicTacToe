function Gameboard() {
    //build board
    const rows = 3;
    const columns = 3;
    let board = [];

    //fill board with 0s
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = 0;
        }
    }

    //add X or O based on player. If the square is not 0 (empty) exit the function
    const addMark = (row, column, mark) => {
        board[row][column] = mark;
        return true;
    };

    const checkAvailable = (row, column) => {
        if (board[row][column] != 0)
            return false;
        else
            return true;
    }

    const getBoard = () => board;

    const printBoard = () => {
        console.log(board);
    }
    return { getBoard, addMark, printBoard, checkAvailable };
}


function gameController() {
    const board = Gameboard();
    var numberOfRounds = 0;
    const players = [
        {
            name: "Player 1",
            mark: "X"
        },
        {
            name: "Player 2",
            mark: "O"
        }
    ]

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        //add logic for not successful attempts
        if (!board.checkAvailable(row, column)) {
            console.log("Chose another point! This is already taken!");
            return;
        }
        console.log(`${getActivePlayer().name} put ${getActivePlayer().mark} in (${row},${column})`);
        board.addMark(row, column, activePlayer.mark);
        numberOfRounds++;
        //wincon
        if (numberOfRounds >= 5) {
            var currentBoard = board.getBoard();

            //horizontal check
            for (let i = 0; i < currentBoard.length; i++) {
                let rowScore = 0;
                for (let j = 0; j < currentBoard[0].length; j++) //iterate over columns
                {
                    if (currentBoard[i][j] == players[0].mark)
                        rowScore++;
                    else if (currentBoard[i][j] == players[1].mark)
                        rowScore--;
                    else
                        continue;
                }
                if (rowScore == 3) {
                    //player 1 wins
                    console.log("Player 1 wins!");
                    return;
                }
                if (rowScore == -3) {
                    //player 2 wins
                    console.log("Player 2 wins!");
                    return;
                }
            }
            //vertical check
            for (let j = 0; j < currentBoard[0].length; j++) {
                let columnScore = 0;
                for (let i = 0; i < currentBoard.length; i++)
                //iterate over rows
                {
                    if (currentBoard[i][j] == players[0].mark)
                        columnScore++;
                    else if (currentBoard[i][j] == players[1].mark)
                        columnScore--;
                    else
                        continue;
                }
                if (columnScore == 3) {
                    //player 1 wins
                    console.log("Player 1 wins!");
                    return;
                }
                if (columnScore == -3) {
                    //player 2 wins
                    console.log("Player 2 wins!");
                    return;
                }
            }
            //diagonal check
            if (currentBoard[0][0] == currentBoard[1][1] == currentBoard[2][2] == players[0].mark || currentBoard[0][2] == currentBoard[1][1] == currentBoard[2][0] == players[0].mark) {
                //player 1 wins
                console.log("Player 1 wins!");
                    return;
            }

            if (currentBoard[0][0] == currentBoard[1][1] == currentBoard[2][2] == players[0].mark || currentBoard[0][2] == currentBoard[1][1] == currentBoard[2][0] == players[1].mark) {
                //player 2 wins
                console.log("Player 2 wins!");
                    return;
            }
        }
        //switching turn
        switchPlayerTurn();
        printNewRound();
        
    }

    return { playRound, getActivePlayer };
}

//testing
const newGame = gameController();
newGame.playRound(0, 0);
newGame.playRound(1, 1);
newGame.playRound(0, 2);
newGame.playRound(0, 1);
newGame.playRound(1, 2);
newGame.playRound(2, 1);

