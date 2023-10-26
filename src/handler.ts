import { Env } from './Env';
import UI from './ui.html';

const apiRoute = '/api/game/';

export async function handleRequest(
  request: Request,
  env: Env,
): Promise<Response> {
  const path = new URL(request.url).pathname;
  if (path === '/') {
    return createUiResponse();
  } else if (path.startsWith(apiRoute)) {
    return await handleApiRequest(request, env);
  } else {
    return createNotFoundResponse();
  }
}

function createUiResponse(): Response {
  return new Response(UI, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8',
    },
  });
}

function createNotFoundResponse(): Response {
  return new Response('Not found');
}

async function handleApiRequest(req: Request, env: Env): Promise<Response> {
  const path = new URL(req.url).pathname;

  const gameName = path.substr(apiRoute.length);
  if (!/^[0-9a-zA-Z]+$/.test(gameName)) {
    return new Response(`game name may only contain letters and digits!`);
  }

  const gameStub = env.GAMEINSTANCE.get(env.GAMEINSTANCE.idFromName(gameName));
  return await gameStub.fetch(req.url, req);
}
