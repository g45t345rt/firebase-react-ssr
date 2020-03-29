### FIREBASE REACT SSR

This is a template for creating a single web page app with React and deploy to Firebase easily.

#### Features
- React for interactive UI
- Webpack to bundle js files
- Deploy to Firebase Cloud functions
- SSR (Server Side Rendering) for SEO (Search Engine Optimization)
- Baobab for state management
- Styled components for styling
- SSRPrepass to wait for promises (fetch)
- Fastify to control server routes or add proxy in no time

#### WHY
I got tired of recreating basic setup files everytime I started working on a new project. This template can save you a lot of time because you can start to develop right away instead of losing couple of days bundling files together.

#### How does it work
-  Webpack bundles the client (frontend) side code in one file named client.bundle.js
- Webpack aslo bundle the client code for server side rendering SSR named app-ssr.js
-  Firebase rewrite all requests to function "app" -> the setup is in firebase.json at rewrites/function/app
-  Firebase main "app" function return html page with react ssr
`exports.app = functions.https.onRequest`

#### Development
##### Install dependencies in app & functions folder
`npm install`
##### Build & watch webpack development
`npm run build` to only build file once
`npm run dev` to watch files
##### Emulate firebase function
`npm start`

#### Deploy
##### Build webpack production
`npm run build-prod` build files (client.bundle.js & app-ssr.js) before deploying
##### Firebase deploy
`npm run deploy`