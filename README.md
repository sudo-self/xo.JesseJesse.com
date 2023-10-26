# xo.JesseJesse.com
# ![IMG_2603](https://github.com/sudo-self/xo.JesseJesse.com/assets/119916323/750e04cf-fb0c-4d46-bdfe-a19a4c9243cc)

This is an implementation of the game [tic tac toe](https://en.wikipedia.org/wiki/Tic-tac-toe) that allows playing with others across the internet. It is built with vanilla JavaScript, HTML and CSS on the client side and uses [Cloudflare Workers](https://workers.cloudflare.com/) (serverless functions) and their [Durable Objects](https://blog.cloudflare.com/introducing-workers-durable-objects/) (state management) on the server side. The client and the server communicate via [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to allow playing with minimal latency.

## Try it out

You can play this game in any modern browser at [xo.jessejesse.com](https://xo.jessejesse.com/). This deployment might not be available forever since I currently pay a fee to use durable objects

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

The worker serves the following routes:

- `/` - returns `ui.html` without any further processing
- `/api/game/:gameId` - can be used to start a WebSocket connection for the game `gameId`

## License

(c) 2023 Jesse Roper, available under the [MIT License](./LICENSE).
