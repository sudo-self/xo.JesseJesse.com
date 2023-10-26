import { Color, ColorOrNone } from './Color';

/**
 * Helper function to create a 3x3 array of empty fields.
 * @returns the created array.
 */
function createEmptyFields(): ColorOrNone[][] {
  const fields: ColorOrNone[][] = [];
  for (let i = 0; i < 3; i++) {
    fields.push([]);
    for (let j = 0; j < 3; j++) {
      fields[i].push('none');
    }
  }
  return fields;
}

/**
 * The width (and height) of a tic tac toe board.
 */
export const BOARD_WIDTH = 3;

/**
 * Represents a tic tac toe board with 3x3 fields.
 */
export class Board {
  fields: ColorOrNone[][];

  /**
   * Creates a new tic tac toe board.
   * @param fields a 3x3 array of field values. Defaults to an array of empty fields if omitted.
   */
  constructor(fields?: ColorOrNone[][]) {
    if (fields === undefined) {
      this.fields = createEmptyFields();
    } else {
      this.fields = fields;
    }
  }

  /**
   * Checks whether a line has a matching color.
   * @param startRow the row where the line starts.
   * @param startCol the column where the line starts.
   * @param deltaRow the amount of rows to go in each step on the line.
   * @param deltaCol the amount of columns to go in each step on the line.
   * @returns the color of the line (`'red'` or `'blue'`) if all three fields match or `'none'` if they don't.
   */
  private isMatchingLine(
    startRow: number,
    startCol: number,
    deltaRow: number,
    deltaCol: number,
  ): ColorOrNone {
    const color = this.fields[startRow][startCol];

    if (color === 'none') {
      return 'none';
    }

    for (let i = 1; i < BOARD_WIDTH; i++) {
      if (
        this.fields[startRow + deltaRow * i][startCol + deltaCol * i] !== color
      ) {
        return 'none';
      }
    }

    return color;
  }

  /**
   * Checks if one of the colors has a matching line.
   * @returns the color that has a matching line or `'none'` if there is no matching line.
   */
  public findWinningColor(): ColorOrNone {
    // check rows
    for (let row = 0; row < BOARD_WIDTH; row++) {
      const rowWinner = this.isMatchingLine(row, 0, 0, 1);
      if (rowWinner !== 'none') {
        return rowWinner;
      }
    }

    // check cols
    for (let col = 0; col < BOARD_WIDTH; col++) {
      const colWinner = this.isMatchingLine(0, col, 1, 0);
      if (colWinner !== 'none') {
        return colWinner;
      }
    }

    // check diagonals
    const diagWinner1 = this.isMatchingLine(0, 0, 1, 1);
    if (diagWinner1 !== 'none') {
      return diagWinner1;
    }
    const diagWinner2 = this.isMatchingLine(2, 0, -1, 1);
    if (diagWinner2 !== 'none') {
      return diagWinner2;
    }

    // if no matching line was found, there is no winner
    return 'none';
  }

  /**
   * Checks whether all fields of the board have a color.
   * @returns whether all fields of the board have a color.
   */
  public isFull(): boolean {
    for (let row = 0; row < BOARD_WIDTH; row++) {
      for (let col = 0; col < BOARD_WIDTH; col++) {
        if (this.fields[row][col] === 'none') {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Resets all fields of this board to be empty.
   */
  public reset(): void {
    this.fields = createEmptyFields();
  }

  /**
   * Returns the color in a certain field of the board.
   * @param row the row index of the field to check.
   * @param col the column index of the field to check.
   * @returns whether the field has a color.
   */
  public getColor(row: number, col: number): ColorOrNone {
    return this.fields[row][col];
  }

  /**
   * Checks whether a field has a color.
   * @param row the row index of the field to check.
   * @param col the column index of the field to check.
   * @returns whether the field has a color.
   */
  public hasColor(row: number, col: number): boolean {
    return this.fields[row][col] !== 'none';
  }

  /**
   * Sets the color of a field.
   * @param row the row index of the field.
   * @param col the column index of the field.
   * @param color the new color of the field.
   */
  public setColor(row: number, col: number, color: Color): void {
    this.fields[row][col] = color;
  }
}
