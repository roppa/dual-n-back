import {
  dualNBack,
  generateRound,
  getRandomLetter,
  getRandomPosition,
  newGame,
  percentageCorrect,
} from "..";

describe("getRandomLetter", () => {
  test("should return a letter from a to i", () => {
    const letter = getRandomLetter();
    expect(letter).toMatch(/[a-i]/);
  });
});

describe("percentageCorrect", () => {
  test("should return an object with correct, incorrect, and total keys", () => {
    const results = [
      { position: true, letter: true },
      { position: false, letter: true },
      { position: true, letter: false },
    ];
    const percentage = percentageCorrect(results);
    expect(percentage).toEqual({
      correct: 4,
      incorrect: 2,
      total: 6,
      percentage: 66,
    });
  });
});

describe("getRandomPosition", () => {
  test("should return a number between 0 and 8", () => {
    const position = getRandomPosition();
    expect(position).toBeGreaterThanOrEqual(0);
    expect(position).toBeLessThanOrEqual(8);
  });
});

describe("dualNBack", () => {
  test("should return empty array when history is not greater than n", () => {
    expect(
      dualNBack({
        history: [{ letter: "a", position: 0 }],
        n: 1,
      })
    ).toEqual([]);
  });

  test("should return an array of results", () => {
    const history = [
      {
        letter: "h",
        position: 2,
      },
      {
        letter: "h",
        position: 1,
      },
      {
        letter: "d",
        position: 4,
      },
      {
        letter: "h",
        position: 7,
      },
      {
        letter: "f",
        position: 6,
      },
      {
        letter: "e",
        position: 8,
      },
      {
        letter: "g",
        position: 2,
      },
    ];
    const userInput = [
      {
        letter: "h",
      },
      {},
      {},
      {},
      {},
      {},
    ];
    const result = [
      {
        position: true,
        letter: true,
      },
      {
        position: true,
        letter: true,
      },
      {
        position: true,
        letter: true,
      },
      {
        position: true,
        letter: true,
      },
      {
        position: true,
        letter: true,
      },
      {
        position: true,
        letter: true,
      },
    ];
    expect(
      dualNBack({
        history,
        userInput,
        n: 1,
      })
    ).toEqual(result);
  });

  test("should return a true array", () => {
    const history = [
      {
        letter: "f",
        position: 1,
      },
      {
        letter: "f",
        position: 7,
      },
      {
        letter: "e",
        position: 7,
      },
      {
        letter: "b",
        position: 5,
      },
      {
        letter: "b",
        position: 0,
      },
      {
        letter: "a",
        position: 1,
      },
      {
        letter: "i",
        position: 0,
      },
      {
        letter: "f",
        position: 0,
      },
      {
        letter: "i",
        position: 6,
      },
    ];
    const userInput = [
      {
        letter: "f",
      },
      {
        position: 7,
      },
      {},
      {
        letter: "b",
      },
      {},
      {},
      {
        position: 0,
      },
      {},
    ];
    expect(
      dualNBack({
        history,
        userInput,
        n: 1,
      })
    ).toEqual(new Array(8).fill({ letter: true, position: true }));
  });

  test("should return one false result when user misses a position", () => {
    const history = [
      {
        letter: "f",
        position: 1,
      },
      {
        letter: "a",
        position: 7,
      },
      {
        letter: "e",
        position: 7,
      },
      {
        letter: "b",
        position: 5,
      },
      {
        letter: "f",
        position: 0,
      },
      {
        letter: "a",
        position: 1,
      },
    ];
    const userInput = [{}, {}, {}, {}, {}];
    const result = [
      { position: true, letter: true },
      { position: false, letter: true },
      { position: true, letter: true },
      { position: true, letter: true },
      { position: true, letter: true },
    ];
    expect(
      dualNBack({
        history,
        userInput,
        n: 1,
      })
    ).toEqual(result);
  });
});

describe("generateRound", () => {
  test("should generate a round", () => {
    const round = generateRound();
    expect(round.letter).toMatch(/[a-i]/);
    expect(round.position).toBeGreaterThanOrEqual(0);
    expect(round.position).toBeLessThanOrEqual(8);
  });
});

describe("newGame", () => {
  test("return a new game", () => {
    const game = newGame({ n: 1, gameDurationMs: 10 * 60 * 1000 });
    expect(game).toEqual({
      history: [],
      n: 1,
      results: [],
      gameDurationMs: 600000,
      userInputHistory: [],
      stats: { correct: 0, incorrect: 0, total: 0, percentage: 0 },
    });
  });
});
