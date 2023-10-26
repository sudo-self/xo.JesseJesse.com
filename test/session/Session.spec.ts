import { Session } from '../../src/session/Session';
import test from 'ava';

function mockWebSocket(
  send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void,
): WebSocket {
  return {
    send,
  } as WebSocket;
}

test('Session: send message converts message to json', (t) => {
  const socket = mockWebSocket((data) => t.is(data, '{"type":"test"}'));

  const session = new Session('blue', socket);
  session.sendMessage({ type: 'test' });
});

test('Session: send error creates a valid error message', (t) => {
  const socket = mockWebSocket((data) =>
    t.is(data, '{"type":"error","message":"some error"}'),
  );

  const session = new Session('blue', socket);
  session.sendErrorMessage('some error');
});
