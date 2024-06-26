# desafio-mb-web

This template should help get you started developing with Vue 3 in Vite.

## Demo

This app is available on [https://matheuspenna-desafio-mb-web.vercel.app/](https://matheuspenna-desafio-mb-web.vercel.app/)

## Project Setup

```sh
npm run setup
```

## To preview project
```sh
npm run preview
```

### Compile and Hot-Reload Frontend for Development

```sh
npm run frontend:dev
```

### Run Unit Frontend Tests with [Vitest](https://vitest.dev/)

```sh
npm run frontend:test:unit
```

### Run End-to-End Frontend Tests with [Cypress](https://www.cypress.io/)

To run the e2e test with cypress you have to up both the server and the frontend dev server

##### Open 1 terminal and run:
```sh
npm run frontend:dev
```

##### Open another terminal and run:
```sh
npm run start
```

##### Open another terminal and run:
```sh
npm run frontend:test:e2e
```

##### Or if you will build
###### Compile and Minify Frontend for Production

```sh
npm run frontend:build
```

## OBS: The pre build script will execute both unit and e2e tests. Then, to build you will need to run npm run start and npm run frontend:dev before