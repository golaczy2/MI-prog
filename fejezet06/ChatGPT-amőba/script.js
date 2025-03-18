class TicTacToeGame {
  constructor(difficulty = 10) {
    this.DEFAULT_DIFFICULTY = difficulty;
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.isGameOver = false;
    this.messageHistory = [];
    this.difficulty = this.DEFAULT_DIFFICULTY;
    this.init();
  }

  /**
   * A játék inicializálása az eseményfigyelők hozzáadásával a DOM-hoz
   */
  init() {
    document.addEventListener("DOMContentLoaded", (event) => {
      let cells = document.querySelectorAll(".cell");
      cells.forEach((cell, i) => {
        cell.addEventListener("click", () => this.makeMove(i));
      });
      document
        .getElementById("start")
        .addEventListener("click", () => this.startNewGame());
    });

    let slider = document.getElementById("slider");
    document.getElementById("difficulty").innerHTML =
      "Nehézségi szint: " + slider.value;
    slider.addEventListener("change", (e) => {
      document.getElementById("difficulty").innerHTML =
        "Nehézségi szint: " + e.target.value;
      this.difficulty = e.target.value;
    });
  }
  /**
   * Új játék indítása a játék állapotának alaphelyzetbe állításával és a tábla törlésével
   * Ezután új játék üzenet küldése a szervernek
   */
  async startNewGame() {
    this.resetGameState();
    this.clearBoardDisplay();
    await this.postNewGameMessage();
  }

  /**
   * A játék állapotának alaphelyzetbe állítása
   */
  resetGameState() {
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
    this.isGameOver = false;
    this.messageHistory = [{ role: "user", content: "new" }];
  }
  /**
   * A tábla megjelenítésének törlése
   */
  clearBoardDisplay() {
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  }

  /**
   * Új játék üzenet küldése a szervernek
   */
  async postNewGameMessage() {
    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: this.messageHistory }),
      });

      const data = await response.json();
      this.updateMessageDisplay(data.response.choices[0].message.content);
    } catch (error) {
      console.error("Nem sikerült elküldeni az új játék üzenetet:", error);
      this.updateMessageDisplay(
        "Hiba történt az új játék indítása közben. Próbálkozz újra."
      );
    }
  }

  /**
   * Az üzenet megjelenítésének frissítése
   * @param {string} message
   */
  updateMessageDisplay(message) {
    document.getElementById("message").innerHTML = message;
  }

  /**
   * Lépés a táblán
   * @param {number} index
   */
  makeMove(index) {
    if (this.board[index] === "" && !this.isGameOver) {
      this.board[index] = this.currentPlayer;
      document.getElementsByClassName("cell")[index].innerHTML =
        this.currentPlayer;
      this.messageHistory.push({ role: "user", content: index.toString() });

      if (this.checkWin()) {
        alert(this.currentPlayer + " nyert!");
        this.isGameOver = true;
        return;
      }
      if (this.checkDraw()) {
        alert("Döntetlen!");
        this.isGameOver = true;
        return;
      }
      this.aiMove(); // A játékos az X, az MI az O
    }
  }

  /**
   * Annak ellenőrzése, hogy valaki megnyerte-e a játékot
   * @returns {boolean}
   */
  checkWin() {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winCombos.some((combo) => {
      return (
        this.board[combo[0]] &&
        this.board[combo[0]] === this.board[combo[1]] &&
        this.board[combo[0]] === this.board[combo[2]]
      );
    });
  }

  /**
   * Annak ellenőrzése, hogy a játék döntetlen-e
   * @returns {boolean}
   */
  checkDraw() {
    return this.board.every((cell) => cell !== "");
  }

  /**
   * MI-lépés
   */
  async aiMove() {
    let move = await this.getAIMove(this.messageHistory);
    this.messageHistory.push({ role: "assistant", content: move.toString() });
    console.log(move);
    this.board[move] = "O";
    document.getElementsByClassName("cell")[move].innerHTML = "O";
    if (this.checkWin()) {
      alert("O nyert!");
      this.isGameOver = true;
    }
  }

  /**
   * MI-lépés lekérése
   * @param {array} message
   * @returns {string}
   */
  async getAIMove(message) {
    /* 
      A nehézségi szint értéke alapján eldöntjük, hogy
      az API-tól kérjünk-e lépést vagy véletlenszerű lépést használjunk.
      Ha a nehézségi szint 10, mindig az API-tól kérjük
      Ha a nehézségi szint 0, mindig véletlenszerű lépést használunk
      Ha a nehézségi szint 0 és 10 közötti, véletlenszerű lépést használunk
      az esetek 10 - nehézségi szint százalékában,
      és a legjobb lépést használjuk az esetek nehézségi szint százalékában
    */
    let randomNumber = Math.random();
    if (randomNumber < this.difficulty / 10) {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: message,
        }),
      });
      const data = await response.json();
      let messageElement = document.getElementById("message");
      messageElement.innerHTML = data.response.choices[0].message.content;
      return data.response.choices[0].message.content;
    }
    let randomMove = Math.floor(Math.random() * 9);
    while (this.board[move] !== "") {
      randomMove = Math.floor(Math.random() * 9);
    }
    document.getElementById("message").innerHTML = move.toString();
    return randomMove.toString();
  }
}

// Új játék létrehozása
new TicTacToeGame();
