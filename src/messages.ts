import { ColorOrNone } from './game/Color';

/**
 * The structure of any message sent to the WebSocket server.
 */
export interface Message {
  /**
   * Specifies which type of message this is. Used to determine the further structure of the message.
   */
  type: string;
}

/**
 * A move message is sent to the server when a player selects a field they want to color.
 */
export interface MoveMessage extends Message {
  type: 'move';
  /**
   * The row index of the field to color.
   */
  row: number;
  /**
   * The column index of the field to color.
   */
  col: number;
}

/**
 * A reset message is sent to the server to trigger a game reset.
 */
export interface ResetMessage extends Message {
  type: 'reset';
}

/**
 * An error message is sent to the client if an error occurs that the client is involved in.
 */
export interface ErrorMessage extends Message {
  type: 'error';
  /**
   * A descripion description of the error.
   */
  message: string;
}

/**
 * A state message is sent to the clients to update the game state.
 */
export interface StateMessage extends Message {
  type: 'state';
  /**
   * The colors of the 3x3 fields in the tic tac toe field.
   */
  fields: ColorOrNone[][];
  /**
   * The next player to make a move. `none` indicates that currently nobody can make a move
   * (either the game is over or we are waiting for an opponent to join).
   */
  turn: ColorOrNone;
  /**
   * The winner of the current game. This value is `null` if the game is not over yet, `none` if
   * the game resulted in a tie and `red`/`blue` if `red` or `blue` won the game.
   */
  winner: ColorOrNone | null;
}

/**
 * A color message is sent to the client to assign them a player/spectator color.
 */
export interface ColorMessage extends Message {
  type: 'color';
  /**
   * The new color of the player. `none` indicates that the player is a spectator.
   */
  color: ColorOrNone;
}

/**
 * A players message is sent to the client to inform about the connected players.
 */
export interface PlayersMessage extends Message {
  type: 'players';
  /**
   * The amount of connected players. If this number is 1, the game is paused.
   */
  playerCount: number;
}

/**
 * Creates a color message for a given color.
 * @param color the color for the message.
 * @returns the created message.
 */
export function createColorMessage(color: ColorOrNone): ColorMessage {
  return {
    type: 'color',
    color,
  };
}

/**
 * Creates a players message with the given parameters.
 * @param playerCount the amount of connected clients.
 * @returns the created message.
 */
export function createPlayersMessage(playerCount: number): PlayersMessage {
  return {
    type: 'players',
    playerCount,
  };
}
