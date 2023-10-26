import { Env } from './Env';
import { handleRequest } from './handler';
export { GameInstance } from './GameInstance';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await handleRequest(request, env);
    } catch (e) {
      console.error(e);
      return new Response(`${e}`, {
        status: 500,
      });
    }
  },
};
