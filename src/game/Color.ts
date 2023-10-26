/**
 * Represents the color of a field on a tic tac toe board.
 */
export type Color = 'red' | 'blue';

/**
 * Represents a `Color` or the absence of a color.
 */
export type ColorOrNone = Color | 'none';

/**
 * Returns the other of the two colors.
 * @param color the given color.
 * @returns the color that is not the given color.
 */
export function oppositeColor(color: Color): Color {
  return color === 'red' ? 'blue' : 'red';
}
