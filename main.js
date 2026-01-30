const Gameboard = (function() {
    const board = [                
        [null, null, null],   
        [null, null, null],
        [null, null, null]
    ] 

    return {
        set: (marker, y, x) => board[y][x] === null ? board[y][x] = marker : console.log("Place already taken. Choose another spot"),
        show: () => console.table(board),
        eval: (marker) => console.log(board[0].reduce((concat, val) => concat + val, '') === `${marker}${marker}${marker}` ? "Congratulations you won" : "Next Player")
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
