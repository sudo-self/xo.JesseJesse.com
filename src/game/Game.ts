import { Board } from './Board';
import { Color, ColorOrNone, oppositeColor } from './Color';

/**
 * The player who can place a color at first.
 */
export const FIRST_TURN: Color = 'red';

export interface SerializedGame {
  fields: ColorOrNone[][];
  turn: ColorOrNone;
}

/**
 * Represents a game of tic tac toe.
 */
export class Game {
  private board: Board;
  private nextTurn: ColorOrNone;

  /**
   * This field stores the winner calculated after each move. Use the winner property to access
   * this value and use `recalculateWinner` to check again.
   */
  private _winner: ColorOrNone | null = null;

  /**
   * The winner of this game. `null` indicates that the game is not over yet. `'none'` indicates
   * that the game has ended in a tie.
   */
  public get winner(): ColorOrNone | null {
    return this._winner;
  }

  /**
   * Creates a game instance.
   * @param serialized the serialized state of a game. A new game will be created if this is omitted.
   */
  public constructor(serialized?: SerializedGame) {
    if (serialized !== undefined) {
      this.board = new Board(serialized.fields);
      this.nextTurn = serialized.turn;
      this.recalculateWinner();
    } else {
      this.board = new Board();
      this.nextTurn = FIRST_TURN;
    }
  }

  private recalculateWinner(): void {
    const winningColor = this.board.findWinningColor();

    if (winningColor !== 'none') {
      this._winner = winningColor;
    } else if (this.board.isFull()) {
      this._winner = 'none';
    } else {
      this._winner = null;
    }
  }

  /**
   * Checks whether this game is over.
   * @returns whether this game is over.
   */
  public isGameOver(): boolean {
    return this.winner !== null;
  }

  /**
   * Checks whether a specified color can be placed at a specified field of the game board.
   * @param color the color to be placed.
   * @param row the row index of the field.
   * @param col the column index of the field.
   * @returns whether the placement is valid.
   */
  public canPlaceColor(color: Color, row: number, col: number): boolean {
    return (
      !this.isGameOver() &&
      this.nextTurn === color &&
      !this.board.hasColor(row, col)
    );
  }

  /**
   * Places a specified color at a specified field of the game board.
   * @param color the color to be placed.
   * @param row the row index of the field.
   * @param col the column index of the field.
   * @throws an `Error` if the move is invalid.
   */
  public placeColor(color: Color, row: number, col: number): void {
    if (!this.canPlaceColor(color, row, col)) {
      throw new Error('Invalid move!');
    }

    this.board.setColor(row, col, color);
    this.recalculateWinner();
    if (this.isGameOver()) {
      this.nextTurn = 'none';
    } else {
      this.nextTurn = oppositeColor(this.nextTurn as Color); // we have made sure that nextTurn is not 'none'
    }
  }

  /**
   * Serializes this game's state into a plain object that can be serialized and used in the constructor.
   * @returns
   */
  public serialize(): SerializedGame {
    return {
      fields: this.board.fields,
      turn: this.nextTurn,
    };
  }
}
