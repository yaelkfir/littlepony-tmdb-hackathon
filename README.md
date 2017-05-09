Create - TMDB Hackathon Boilerplate
====================================

A React boilerplate for the TMDB hackathon held at Create, May, 2017

### Reference Links

- [TMDB API Overview](https://www.themoviedb.org/documentation/api)
- [TMDB API Docs](https://developers.themoviedb.org/3/getting-started)
- [TMDB - Build an image URL](https://developers.themoviedb.org/3/configuration/get-api-configuration)
- [TMDB - Discover Examples](https://www.themoviedb.org/documentation/api/discover)

Getting Started
----------------

1. Install Node.js (choose Current)
    - From [nodejs.org](https://nodejs.org/) (All platforms)
    - Or using [Homebrew](http://blog.teamtreehouse.com/install-node-js-npm-mac) (Mac)
    - Or any other [package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
1. `git clone` this repo
1. Install dependencies (at the root of the repo):

    ```
    npm install
    ```

### Setup TMDB

1. Sign up - [TMDB](https://www.themoviedb.org/account/signup)
1. Verify your email
1. Create an [API Token](https://www.themoviedb.org/settings/api)
    - Click Create
    - Choose Developer
    - Accept the terms
    - Fill in the form
      - Type: Website
      - App Name and URL: your-name-tmdb-hackathon 
      - Click Submit to see which fields are required (most are, just fill them in)
1. Set your TMDB token under `config/config.js` > `TMDB_API_TOKEN`

Development
------------

#### Run webpack-dev-server

```
npm start
```

- Open `http://localhost:8080`

Build the project for deployment
---------------------------------

```
npm run build
```

- Must use a server that redirects missing routes back to `index.html`

### To run the build locally

```
npm i -g live-server
cd dist/
live-server --entry-file=index.html
```
