const Gameboard = (function() {
    const board = [                
        [null, null, null],   
        [null, null, null],
        [null, null, null]
    ] 
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
            return true;
        }
        return false;
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
        if (board[y][x] !== null) {
            console.log("Place already taken. Choose another spot.");
            return false;
        }
        board[y][x] = marker; 
        if (checkWin (marker, y, x)) {
            console.log(`Congratulations ${marker} won!`);
        }
        return true;
    }

    const resetBoard = () => {
        board.forEach(val => val.fill(null));
    }

    return {
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
            givePoint: () => score++
        };
    };

    // const playerSwitch = (symbol) => {
    //     if (symbol === "X"){
    //         symbol === "O";
    //     }
    // }
    return {
        createPlayer,
    }

})();




document.addEventListener("DOMContentLoaded", () => {
    const player1 = Gameplay.createPlayer("Player X", "X");
    const player2 = Gameplay.createPlayer("Player O", "O");
    
    const container = document.querySelector(".container");
    container.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-index") !== null) {
            const row = e.target.getAttribute("data-row");
            const col = e.target.getAttribute("data-col");
            const result = Gameboard.set(player1.symbol, row, col);
            if (result) {
                e.target.appendChild(document.createTextNode(player1.symbol));
            }
            console.log(result);
            console.log(row, col);
        //     console.log(e.target.getAttribute("data-index")); 
        //     console.log(e.target.textContent);
        }
    })
});

// Gameboard.set(player1.symbol, 0, 0);
// Gameboard.set(player1.symbol, 0, 1);
// Gameboard.set(player1.symbol, 0, 2);
//
// Gameboard.show();

const reset = document.querySelector(".btnreset");
reset.addEventListener("click", () => {
    Gameboard.rem();
    Gameboard.show();
    const cell = document.querySelectorAll(".cell");
    Array.from(cell).forEach(i => {
        i.textContent = "";
    });
})
