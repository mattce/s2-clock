#S2 Clock

##Setup
1. install [Node and Npm](https://nodejs.org/en/)
2. install local dependencies via `npm install`

##Build
The Setup uses simple npm scripts to build the application.

To start the application run `npm start`.
This cleans the dist folder, generates CSS (through Sass), HTML (through Jade), copies over JavaScript and
starts a server on ´localhost:3000´
To solely generate CSS, run `npm run sass`
To solely generate HTML, run `npm run jade`