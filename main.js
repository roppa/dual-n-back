import {
  newGame,
  dualNBack,
  generateRound,
  percentageCorrect,
} from "./index.js";

let n = 1; // n-back level
let roundDurationMs = 3000;
let game = newGame({
  n,
  gameDurationMs: 20000,
  counter: 0,
  history: [],
  userInputHistory: [],
});
let numberOfRounds = Math.floor(game.gameDurationMs / roundDurationMs);
game.history = [];
for (let i = 0; i <= numberOfRounds; i++) {
  game.history.push(generateRound());
}

document.getElementById("n").textContent = n;

const soundButton = document.getElementById("soundButton");
const positionButton = document.getElementById("positionButton");

let playerPositionResponse;
let playerLetterResponse;

soundButton.addEventListener("click", () => {
  playerLetterResponse = game.history[game.counter - n].letter;
});
positionButton.addEventListener("click", () => {
  playerPositionResponse = game.history[game.counter - n].position;
});

function displayCell(position) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("highlight"));
  document.getElementById("cell" + position).classList.add("highlight");
}

function playSound(letter) {
  const audio = new Audio(`audio/${letter}.mp3`);
  audio.play();
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  await delay(roundDurationMs);
  // Start the game
  for (game.counter = 0; game.counter < game.history.length; game.counter++) {
    const round = game.history[game.counter];
    playSound(round.letter);
    displayCell(round.position);

    if (game.counter >= n) {
      positionButton.disabled = false;
      soundButton.disabled = false;

      await delay(roundDurationMs);

      const userInput = {};
      if (playerPositionResponse) {
        userInput.position = round.position;
      }
      if (playerLetterResponse) {
        userInput.letter = round.letter;
      }

      game.userInputHistory.push(userInput);

      // Clear player responses
      playerPositionResponse = false;
      playerLetterResponse = false;
    } else {
      await delay(roundDurationMs);
    }
  }

  game.results = dualNBack({
    history: game.history,
    userInput: game.userInputHistory,
    n,
  });

  game.stats = percentageCorrect(game.results);
  console.log("Game over");
  console.log(game);
})();
