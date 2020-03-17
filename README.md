### FIREBASE REACT SSR

This is a basic template for creating a website single page app to deploy at Google Firebase Function. It does implement SSR because I think it's must for SEO.

#### WHY
I got tired of recreating basic setup files everytime I started working on a new project. This template can save a lot of time because you can immediately start working on developing the website. Make sure you understand how it works before doing anything.

#### How does it work
-  Webpack bundles the client (frontend) side code in one file named client.bundle.js
-  SSR (Server Side Rendering) is bundle with webpack to app-ssr.js
-  Firebase rewrite all requests to function "app" -> the setup is in firebase.json at rewrites/function/app
-  Firebase main "app" function return html page with react ssr
`exports.app = functions.https.onRequest`

#### NPM Package scripts
- npm run build -> webpack client & ssr
- npm run dev -> webpack client & ssr with watch (update on file change)
- npm start -> firebase emulators:start
- npm run deploy -> firebase deploy