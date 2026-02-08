const Gameboard = (function() {
    const board = [                
        [null, null, null],   
        [null, null, null],
        [null, null, null]
    ] 
    const message = document.querySelector(".message");

    let gameOver = false;

    const checkRow = (y, marker) => {
        return board[y].every(val => val === marker);
    }

    const checkColumn = (x, marker) => {
        for (let i = 0; i < board.length; i++) {
            if (board[i][x] !== marker){
                return false;
            }
        }
        return true;
    }
    
    const checkWin = (marker, y, x) => {
        if (checkRow(y, marker) || checkColumn(x, marker) || checkDiag(marker)) {
            gameOver = true;
            return true;
        }
        return false;
    }
    
    const checkDraw = () => {
        if (board.flat().every(val => val !== null)) {
            // alert("Draw!");
            gameOver = true;
            message.textContent = "";
            message.appendChild(document.createTextNode("Draw!"));
        }
    }

    const checkDiag = (marker) => {
        let boardLength = board.length;
// Top-Left to Bottom-Right: (0,0, 1,1, 2,2)

        let diag1Win = true;
        for (let i = 0; i < boardLength; i++) {
            if (board[i][i] !== marker) {
                diag1Win = false;
            }
        }
        if (diag1Win) return true;

// Top Right to Bottom-Left: (0,2, 1,1, 2,0) 
        let diag2Win = true;
        for (let i = 0; i < boardLength; i++) {
            if (board[i][boardLength - i - 1] !== marker) {
                diag2Win = false;
            }
        }
        return diag2Win;
    }
    
    const makeMove = (marker, y, x) => {
        message.textContent = "";
        if (gameOver) return false;
        if (board[y][x] !== null) {
            // alert("Place already taken. Choose another spot.");
            message.textContent = "";
            message.appendChild(document.createTextNode("Place already taken. Choose another spot."));
            return false;
        }
        board[y][x] = marker; 
        if (checkWin (marker, y, x)) {
            // alert(`Congratulations ${marker} won!`);
            message.textContent = "";
            message.appendChild(document.createTextNode(`Congratulations ${marker} won!`));
            if (marker === player1.symbol) {
                player1.givePoint();
                Gameplay.totalWin(player1.symbol, player1.getScore());
            } else {
                player2.givePoint();
                Gameplay.totalWin(player2.symbol, player2.getScore());
            }
        }
        checkDraw();
        return true;
    }

    const resetBoard = () => {
    // Currently the new game begins with the opposite marker ended. E.g. with "O". But it should always start with "X", or should it?
        board.forEach(val => val.fill(null));
        gameOver = false;
        message.textContent = "";
    }

    return {
        isGameOver: () => gameOver,
        set: makeMove,
        rem: resetBoard,
        show: () => console.table(board),
    };
})();

const Gameplay = (function(){
    const _maxRounds = 5;
    // factory for making players
    const createPlayer = (name, symbol) => {
        let score = 0; 

        return {
            name,
            symbol,
            getScore: () => score, 
            givePoint: () => ++score,
        };
    };
    
    const checkTotalwin = (marker, points) => {
        if (_maxRounds === points) {
            const container = document.querySelector(".container");
            const resetBtn = document.querySelector(".btnreset");

            container.classList.add("frozen"); 
            resetBtn.classList.add("frozen"); 
            const winner = document.querySelector(".winner");
            winner.textContent = `${_maxRounds} rounds are over! ${marker} is the Champion!`;
        }
    }
    return {
        createPlayer,
        totalWin: checkTotalwin,
    }

})();

const player1 = Gameplay.createPlayer("Player X", "X");
const player2 = Gameplay.createPlayer("Player O", "O");

document.addEventListener("DOMContentLoaded", () => {
    let activePlayer = player1;

    const container = document.querySelector(".container");
    container.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-index") !== null) {
            const row = e.target.getAttribute("data-row");
            const col = e.target.getAttribute("data-col");
            const result = Gameboard.set(activePlayer.symbol, row, col);
            if (result) {
                e.target.appendChild(document.createTextNode(activePlayer.symbol));
                if (!Gameboard.isGameOver()) {
                    activePlayer = (activePlayer === player1) ? player2 : player1;
                }
                console.log(result);
                console.log(row, col);
            }
        }
    })
});

const reset = document.querySelector(".btnreset");
reset.addEventListener("click", () => {
    Gameboard.rem();
    Gameboard.show();
    const cell = document.querySelectorAll(".cell");
    Array.from(cell).forEach(i => {
        i.textContent = "";
    });
})
