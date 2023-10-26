# xo.JesseJesse.com

This is an implementation of the game [tic tac toe](https://en.wikipedia.org/wiki/Tic-tac-toe) that allows playing with others across the internet. It is built with vanilla JavaScript, HTML and CSS on the client side and uses [Cloudflare Workers](https://workers.cloudflare.com/) (serverless functions) and their [Durable Objects](https://blog.cloudflare.com/introducing-workers-durable-objects/) (state management) on the server side. The client and the server communicate via [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to allow playing with minimal latency.

## Try it out

You can play this game in any modern browser at [xo.jessejesse.com](https://xo.jessejesse.com/). This deployment might not be available forever since I currently need to pay a small but noticable fee to use the [Durable Objects beta](https://developers.cloudflare.com/workers/learning/using-durable-objects).

## Goals for this project

The goal for this project was to learn about the technology stack mentioned above, not to create a polished product. Nevertheless, the technologies used market themselves to have performance, low latency and scalability built-in at the core and AFAIK I have followed their guidelines to create an application that too has these characteristics.

## Development Setup

1. Install [node.js](https://nodejs.org/) v16.07 or later including NPM
2. Clone this repository
3. Install NPM dependencies: `npm install`
4. Use `npm run dev` to spin up a local development server

## Deployment

You deploy this project to [Cloudflare Workers](https://workers.cloudflare.com/) using the official [wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update) CLI tool. Please note that (as of November 2021) you need to have a paid Clouflare Workers subscription to use `Durable Objects` in your deployed workers.

1. Install wrangler: `npm install wrangler -g`
2. Log in via OAuth: `wrangler login` or use an access token: `wrangler config`
3. Publish to Cloudflare Workers: `wrangler publish` (you might need to configure your `account_id` and `zone_id` in `wrangler.toml`)

## Project structure

The UI is implemented as a vanilla JS + CSS3 + HTML5 page in [`./src/ui.html`](./src/ui.html). Everything else in the [`src/`](./src/) folder is part of the worker and written in TypeScript.

The worker serves the following routes:

- `/` - returns `ui.html` without any further processing
- `/api/game/:gameId` - can be used to start a WebSocket connection for the game `gameId`

## Architecture

The multiplayer capabilities are implemented using a client-server architecture through `WebSockets`. There is no authorization; players are identified through their WebSocket connection. Once the WebSocket connection is established, client and server communicate via a message-based protocol (types and descriptions of which can be found in [`./src/messages.ts`](./src/messages.ts)).

## Resources used

The following is a (probably incomplete) list of mostly useful resources that I read through to build this application. You can probably find one or another snippet copied from there:

- countless pages in the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/), of which the following were the most useful:
  - [Using Durable Objects](https://developers.cloudflare.com/workers/learning/using-durable-objects)
  - [Using WebSockets](https://developers.cloudflare.com/workers/learning/using-websockets)
  - [How Workers works](https://developers.cloudflare.com/workers/learning/how-workers-works)
  - [Runtime API: Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects)
  - [Wrangler CLI: Configuration](https://developers.cloudflare.com/workers/cli-wrangler/configuration)
- the [Cloudflare Blog](https://blog.cloudflare.com/tag/durable-objects/):
  - [Durable Objects: Easy, Fast, Correct — Choose three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/)
  - [Durable Objects, now in Open Beta](https://blog.cloudflare.com/durable-objects-open-beta/)
- example and template projects from @cloudflare:
  - [@cloudflare/workers-chat-demo](https://github.com/cloudflare/workers-chat-demo) - shows how to use Durable Objects together with WebSockets
  - [@cloudflare/durable-objects-typescript-rollup-esm](https://github.com/cloudflare/durable-objects-typescript-rollup-esm) - shows how to setup TypeScript -> ESModule transpilation using Rollup
  - [@cloudflare/durable-objects-template](https://github.com/cloudflare/durable-objects-template) - the most basic example you could think of for using Durable Objects
  - [@cloudflare/websocket-template](https://github.com/cloudflare/websocket-template) - shows how to use WebSockets in Workers

## License

(c) 2023 Jesse Roper, available under the [MIT License](./LICENSE).
