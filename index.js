export const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

export const getRandomPosition = () => Math.floor(Math.random() * 9);

export const getRandomLetter = () =>
  letters[Math.floor(Math.random() * letters.length)];

export const percentageCorrect = (results) => {
  const result = results.reduce(
    (acc, curr) => {
      curr.position ? acc.correct++ : acc.incorrect++;
      curr.letter ? acc.correct++ : acc.incorrect++;
      acc.total += 2;
      return acc;
    },
    { correct: 0, incorrect: 0, total: 0 }
  );
  return {
    ...result,
    percentage: Math.floor((result.correct / result.total) * 100),
  };
};

export const dualNBack = ({ history, userInput, n }) => {
  const results = [];
  if (history.length <= n) return results;
  for (let i = 0; i < userInput.length; i++) {
    const currentUserInput = userInput[i];
    const previousHistoryItem = history[i];
    const nextHistoryItem = history[i + n];

    const result = {
      position: false,
      letter: false,
    };
    if (currentUserInput.position !== undefined) {
      result.position =
        currentUserInput.position === previousHistoryItem.position;
    } else {
      result.position =
        nextHistoryItem.position !== previousHistoryItem.position;
    }

    if (currentUserInput.letter !== undefined) {
      result.letter = currentUserInput.letter === previousHistoryItem.letter;
    } else {
      result.letter = nextHistoryItem.letter !== previousHistoryItem.letter;
    }

    results.push(result);
  }
  return results;
};

export const generateRound = () => ({
  letter: getRandomLetter(),
  position: getRandomPosition(),
});

export const newGame = ({ n, gameDurationMs }) => ({
  n,
  history: [],
  userInputHistory: [],
  results: [],
  gameDurationMs,
  stats: {
    correct: 0,
    incorrect: 0,
    total: 0,
    percentage: 0,
  },
});