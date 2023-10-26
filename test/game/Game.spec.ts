import { Game, FIRST_TURN, SerializedGame } from '../../src/game/Game';
import test from 'ava';

const gameInProgress: SerializedGame = {
  fields: [
    ['blue', 'red', 'red'],
    ['none', 'blue', 'none'],
    ['none', 'none', 'red'],
  ],
  turn: 'blue',
};

const gameOverWithWinner: SerializedGame = {
  fields: [
    ['blue', 'red', 'red'],
    ['blue', 'blue', 'red'],
    ['none', 'none', 'red'],
  ],
  turn: 'blue',
};

const gameOverWithoutWinner: SerializedGame = {
  fields: [
    ['blue', 'red', 'red'],
    ['red', 'blue', 'blue'],
    ['red', 'blue', 'red'],
  ],
  turn: 'blue',
};

test('Game: is created with correct default values', (t) => {
  const game = new Game();

  t.deepEqual(game.serialize(), {
    fields: [
      ['none', 'none', 'none'],
      ['none', 'none', 'none'],
      ['none', 'none', 'none'],
    ],
    turn: FIRST_TURN,
  });
});

test('Game: constructor parses data correctly, serialize returns data correctly', (t) => {
  const game = new Game(gameInProgress);

  t.deepEqual(game.serialize(), gameInProgress);
});

test('Game: canPlaceColor checks whether field is occupied', (t) => {
  const game = new Game(gameInProgress);

  t.is(game.canPlaceColor('blue', 1, 0), true);
  t.is(game.canPlaceColor('blue', 0, 0), false);
  t.is(game.canPlaceColor('blue', 0, 1), false);
});

test('Game: canPlaceColor checks whether color is the next color to be placed', (t) => {
  const game = new Game(gameInProgress);

  t.is(game.canPlaceColor('blue', 1, 0), true);
  t.is(game.canPlaceColor('red', 1, 0), false);
});

test('Game: canPlaceColor checks whether the game is over', (t) => {
  const game = new Game(gameOverWithWinner);

  t.is(game.canPlaceColor('blue', 2, 0), false);
  t.is(game.canPlaceColor('blue', 2, 1), false);
});

test('Game: winner is null if the game is not over', (t) => {
  const game = new Game(gameInProgress);

  t.is(game.isGameOver(), false);
  t.is(game.winner, null);
});

test('Game: winner is a color if three fields in a row have the same color', (t) => {
  const game = new Game(gameOverWithWinner);

  t.is(game.isGameOver(), true);
  t.is(game.winner, 'red');
});

test("Game: winner is a 'none' if the board is full", (t) => {
  const game = new Game(gameOverWithoutWinner);

  t.is(game.isGameOver(), true);
  t.is(game.winner, 'none');
});

test('Game: placeColor updates next turn color, winner and board color', (t) => {
  const game = new Game(gameInProgress);
  t.is(game.serialize().turn, 'blue');
  t.is(game.winner, null);

  game.placeColor('blue', 1, 0);
  t.is(game.serialize().turn, 'red');
  t.is(game.winner, null);
  t.is(game.serialize().fields[1][0], 'blue');

  game.placeColor('red', 1, 2);
  t.is(game.serialize().turn, 'none');
  t.is(game.winner, 'red');
  t.is(game.serialize().fields[1][2], 'red');
});

test('Game: placeColor throws an error for invalid moves', (t) => {
  const game = new Game(gameOverWithWinner);

  t.throws(() => game.placeColor('blue', 0, 0), { instanceOf: Error });
});
