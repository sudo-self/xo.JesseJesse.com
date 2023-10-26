import test from 'ava';
import { Board, BOARD_WIDTH } from '../../src/game/Board';

function loopBoardIndices(consumer: (row: number, col: number) => void): void {
  for (let row = 0; row < BOARD_WIDTH; row++) {
    for (let col = 0; col < BOARD_WIDTH; col++) {
      consumer(row, col);
    }
  }
}

test('Board: is created empty by default', (t) => {
  const board = new Board();

  loopBoardIndices((row, col) => {
    t.is(
      board.getColor(row, col),
      'none',
      `row=${row}, col=${col} is not empty!`,
    );
  });
});

test('Board: reset makes the board empty', (t) => {
  const emptyBoard = new Board();
  const otherBoard = new Board();

  otherBoard.reset();

  loopBoardIndices((row, col) => {
    t.is(
      emptyBoard.getColor(row, col),
      otherBoard.getColor(row, col),
      `row=${row}, col=${col} is not empty!`,
    );
  });
});

test('Board: hasColor recognizes colors correctly', (t) => {
  const board = new Board();
  board.setColor(0, 1, 'blue');
  board.setColor(0, 2, 'red');

  t.is(board.hasColor(0, 0), false);
  t.is(board.hasColor(0, 1), true);
  t.is(board.hasColor(0, 2), true);
});

test('Board: isFull recognizes full boards', (t) => {
  const emptyBoard = new Board();
  t.is(emptyBoard.isFull(), false);

  const fullBoard = new Board([
    ['red', 'red', 'red'],
    ['red', 'red', 'red'],
    ['red', 'red', 'red'],
  ]);
  t.is(fullBoard.isFull(), true);

  const almostFullBoard = new Board([
    ['red', 'red', 'red'],
    ['red', 'none', 'red'],
    ['red', 'red', 'red'],
  ]);
  t.is(almostFullBoard.isFull(), false);
});

test('Board: findWinningColor finds horizontal lines', (t) => {
  const board = new Board([
    ['blue', 'blue', 'none'],
    ['red', 'red', 'red'],
    ['none', 'none', 'blue'],
  ]);

  t.is(board.findWinningColor(), 'red');
});

test('Board: findWinningColor finds vertical lines', (t) => {
  const board = new Board([
    ['none', 'blue', 'red'],
    ['red', 'blue', 'red'],
    ['red', 'blue', 'blue'],
  ]);

  t.is(board.findWinningColor(), 'blue');
});

test('Board: findWinningColor finds diagonal lines', (t) => {
  const board1 = new Board([
    ['blue', 'blue', 'red'],
    ['red', 'blue', 'red'],
    ['red', 'red', 'blue'],
  ]);

  t.is(board1.findWinningColor(), 'blue');

  const board2 = new Board([
    ['blue', 'blue', 'red'],
    ['red', 'red', 'blue'],
    ['red', 'red', 'blue'],
  ]);

  t.is(board2.findWinningColor(), 'red');
});

test('Board: findWinningColor returns none if there is no matching line', (t) => {
  const board = new Board([
    ['red', 'red', 'blue'],
    ['blue', 'blue', 'red'],
    ['red', 'red', 'blue'],
  ]);

  t.is(board.findWinningColor(), 'none');
});
