# Tic-Tac-Toe (The Odin Project)

A clean and functional Tic-Tac-Toe implementation built with Vanilla JavaScript. This project focuses on the application of the **Module Pattern** and **Factory Functions** to ensure encapsulation and clean code architecture.

---

## About the Project

This project was developed as part of [The Odin Project's JavaScript curriculum](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe). The primary objective was to minimize global code and manage the game state through private variables and public interfaces.

### Key Features
* **Encapsulated Logic:** All game rules and board states are handled within private modules.
* **Dynamic Win/Draw Detection:** Checks for all 8 possible win conditions (rows, columns, diagonals) after every move.
* **Game State Control:** The game board "freezes" automatically upon a victory or draw to prevent illegal moves until a reset.
* **Score Tracking:** Persistently tracks points for both Player X and Player O during the session.
* **User Feedback:** Real-time messages for turn changes, illegal moves (occupied spots), and game results.

---

## Technical Implementation

The code follows the **Module Pattern** to separate concerns:

* **`Gameboard` Module:** Manages the internal 3x3 array, validation of moves, and win/draw logic.
* **`Gameplay` Module:** Handles player creation via Factory Functions and monitors the overall match score.
* **Event Handling:** Uses efficient event listeners to bridge the gap between the logic and the DOM.

---

## How to Run

1.  **Clone this repository:**
    ```bash
    git clone [https://github.com/your-username/tic-tac-toe.git](https://github.com/your-username/tic-tac-toe.git)
    ```
2.  **Open `index.html`** directly in your preferred web browser.
3.  **Play:** Click on any square to place your marker. The game tracks the active player and identifies wins instantly.
4.  **New Round:** Use the **Reset Button** to clear the board while maintaining the overall match score.
