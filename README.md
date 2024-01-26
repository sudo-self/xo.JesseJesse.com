# <a href="https://xo.JesseJesse.com">xo.JesseJesse.com</a>&nbsp;[![Node.js CI](https://github.com/sudo-self/xo.JesseJesse.com/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/sudo-self/xo.JesseJesse.com/actions/workflows/node.js.yml)
![IMG_2603](https://github.com/sudo-self/xo.JesseJesse.com/assets/119916323/eb457a9c-32a0-4092-8026-15905506abb9)
![IMG_3095](https://github.com/sudo-self/xo.JesseJesse.com/assets/119916323/18a508cb-0e42-402d-838a-1b335d80cf18)

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


## License

(c) 2023 Jesse Roper, available under the [MIT License](./LICENSE).
