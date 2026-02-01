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
            return console.log("Place already taken. Choose another spot.");
        }
        board[y][x] = marker; 
        if (checkWin (marker, y, x)) {
            console.log(`Congratulations ${marker} won!`);
        }
    }

    return {
        set: makeMove,
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
    return {
        createPlayer,
    }

})();

const player1 = Gameplay.createPlayer("Alice", "X");
const player2 = Gameplay.createPlayer("Max", "O");

Gameboard.set(player1.symbol, 0, 0);
Gameboard.set(player1.symbol, 0, 1);
Gameboard.set(player1.symbol, 0, 2);

Gameboard.show();

const container = document.querySelector(".container");
container.addEventlistener("click", () => {
    
}))
