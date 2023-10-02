
const game = (() => {
    let gameOver = false
    let matrix = []
    const squares = document.getElementsByClassName('squares');
    const gameStatus = (winner, draw) => {
        let para
        gameOver = true
        if (draw) {
            window.location='http://127.0.0.1:5500/Odin-project/Tic-Tac-Toe/status.html';
            window.addEventListener("DOMContentLoaded", function () {
                // Your code to be executed after the new page has fully loaded
                para = document.getElementById('para');
                console.log(para);
                para.textContent = "It's a draw";
                console.log("It's a draw");
            });
        }
        if (winner!=="") {
            window.location='http://127.0.0.1:5500/Odin-project/Tic-Tac-Toe/status.html'
            setTimeout(function() {
                //your code to be executed after 1 second
                para= document.getElementById('para')
                console.log(para)
                para.textContent=`${winner} Wins`
                console.log(`${winner} Wins`)
            }, 3000);
        }
    }

    const gameDisplayController = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = gameBoard[i];
        }
    }

    const userInput = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', () => {
                // console.log("hello from userInput");
                const squareIndex = parseInt(squares[i].id);
                if (gameBoard[squareIndex] === "" && gameOver == false) {
                    gameBoard[squareIndex] = "X";
                    game.gameDisplayController();
                    game.computerInput();
                    game.listToMatrix(gameBoard, 3)
                    game.checkWinner()
                    //    console.log(matrix.length)
                }
            });
        }
    }

    const computerInput = () => {
        let compRand;
        let i = 0
        do {
            compRand = Math.floor(Math.random() * 9);
            i++
        } while (gameBoard[compRand] !== "" && i < 3 && gameOver == false);

        gameBoard[compRand] = "O";
        game.gameDisplayController();
    }

    const listToMatrix = (list, elementsPerSubArray) => {
        let i, k;

        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(list[i]);
        }
        // return matrix;
        // console.log(matrix[0]);
    }

    const checkWinner = () => {
        // Check rows
        for (let i = 0; i < matrix.length; i++) {
            if (allEqual(matrix[i]) && matrix[i][0] !== "") {
                // console.log(`${matrix[i][0]} is a winner.`);
                game.gameStatus(matrix[i][0], false)
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < matrix[0].length; i++) {
            const column = matrix.map(row => row[i]);
            if (allEqual(column) && column[0] !== "") {
                // console.log(`${matrix[0][i]} is a winner.`);
                game.gameStatus(matrix[0][i], false)
                return true;
            }
        }

        // Check diagonals
        const diagonal1 = matrix.map((row, index) => row[index]);
        const diagonal2 = matrix.map((row, index) => row[matrix.length - index - 1]);

        if (allEqual(diagonal1) && diagonal1[0] !== "") {
            // console.log(`${matrix[0][0]} is a winner.`);
            game.gameStatus(matrix[0][0], false)
            return true;
        }

        if (allEqual(diagonal2) && diagonal2[0] !== "") {
            // console.log(`${matrix[0][2]} is a winner.`);
            game.gameStatus(matrix[0][2], false)
            return true;
        }

        if (gameBoard.includes("")===false) {
            game.gameStatus("", true)
        }
        // console.log("No winner yet.");
        return false; // Return false to indicate no winner found yet
    };

    const allEqual = arr => arr.every(val => val === arr[0]);


    return {
        gameDisplayController,
        userInput,
        computerInput,
        listToMatrix,
        checkWinner,
        gameStatus
    };
})();

let gameBoard = ["", "", "", "", "", "", "", "", ""];
game.gameDisplayController()
game.userInput();