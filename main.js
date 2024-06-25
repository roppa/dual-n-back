import {
  newGame,
  dualNBack,
  generateRound,
  percentageCorrect,
  save,
} from "./index.js";

const roundDurationMs = 3000;
let n = 2;
let playerPositionResponse;
let playerLetterResponse;
let game;

document.getElementById("start-button").addEventListener("click", startGame);
document
  .getElementById("play-again-button")
  .addEventListener("click", showIntroScreen);

const soundButton = document.getElementById("soundButton");
const positionButton = document.getElementById("positionButton");

soundButton.addEventListener("click", () => {
  playerLetterResponse = game.history[game.counter - n].letter;
});
positionButton.addEventListener("click", () => {
  playerPositionResponse = game.history[game.counter - n].position;
});

function showIntroScreen() {
  document.getElementById("intro-screen").classList.remove("hidden");
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("overview-screen").classList.add("hidden");
}

function showGameScreen() {
  document.getElementById("intro-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.remove("hidden");
  document.getElementById("overview-screen").classList.add("hidden");
}

function showOverviewScreen() {
  document.getElementById("intro-screen").classList.add("hidden");
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("overview-screen").classList.remove("hidden");
}

function displayCell(position) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("highlight"));
  document.getElementById("cell" + position).classList.add("highlight");
}

function clearCells() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => cell.classList.remove("highlight"));
}

function playSound(letter) {
  const audio = new Audio(`audio/${letter}.mp3`);
  audio.play();
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function startGame() {
  n = parseInt(document.getElementById("n").value);
  console.log(n);
  const gameDurationMs =
    parseInt(document.getElementById("duration").value) * 1000;
  document.getElementById("n-counter").textContent = n;
  game = newGame({
    n,
    gameDurationMs,
    counter: 0,
    history: [],
    userInputHistory: [],
  });
  let numberOfRounds = Math.floor(game.gameDurationMs / roundDurationMs);
  game.history = [];
  for (let i = 0; i <= numberOfRounds; i++) {
    game.history.push(generateRound());
  }
  clearCells();
  showGameScreen();
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
  save(game.stats);
  showOverviewScreen();
  document.getElementById("results").textContent = JSON.stringify(
    game.stats,
    null,
    2
  );
}

showIntroScreen();
