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
                daig2Win = false;
            }
        }
        return diag2Win;
    }
    
    const makeMove = (marker, y, x) => {
        // Update code. checkWin should only come, if the marker was placed. Replace ternary with solid if-statemenet
        board[y][x] === null ? board[y][x] = marker : console.log("Place already taken. Choose another spot");
        // Implement Code to handle the return.
        checkWin (marker, y, x);
    }

    return {
        set: makeMove,
        show: () => console.table(board),
    };
})();

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

const player1 = createPlayer("Alice", "X");
console.log(player1);
console.log(player1.getScore());
console.log(player1.givePoint());
console.log(player1.symbol);
console.log(player1.getScore());

Gameboard.set(player1.symbol, 0, 0);
Gameboard.set(player1.symbol, 0, 1);
Gameboard.set(player1.symbol, 0, 2);

Gameboard.show();
Gameboard.eval(player1.symbol);

// function that keeps track of player turn
//
// function that places a mark for a player
//
// function to check game over after each round
