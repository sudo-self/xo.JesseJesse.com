import { ColorOrNone } from '../game/Color';
import { ErrorMessage, Message } from '../messages';

/**
 * Stores data about a connected client
 */
export class Session {
  color: ColorOrNone;
  socket: WebSocket;

  constructor(color: ColorOrNone, socket: WebSocket) {
    this.color = color;
    this.socket = socket;
  }

  /**
   * Sends a message to the client associated with this session.
   * @param message the message to send.
   */
  public sendMessage(message: Message): void {
    this.socket.send(JSON.stringify(message));
  }

  /**
   * Sends an error message to the client associated with this session.
   * @param error
   */
  public sendErrorMessage(error: string): void {
    const msg: ErrorMessage = {
      type: 'error',
      message: error,
    };
    this.sendMessage(msg);
  }
}
