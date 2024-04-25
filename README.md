# desafio-mb-web

This template should help get you started developing with Vue 3 in Vite.

## Demo

This app is available on [https://matheuspenna-desafio-mb-web.vercel.app/](https://matheuspenna-desafio-mb-web.vercel.app/)

## Project Setup

```sh
yarn setup
```

## To preview project
```sh
yarn preview
```

### Compile and Hot-Reload Frontend for Development

```sh
yarn frontend:dev
```

### Compile and Minify Frontend for Production

```sh
yarn frontend:build
```

### Run Unit Frontend Tests with [Vitest](https://vitest.dev/)

```sh
yarn frontend:test:unit
```

### Run End-to-End Frontend Tests with [Cypress](https://www.cypress.io/)

To run the e2e test with cypress you have to up both the server and the frontend dev server

##### Open 1 terminal and run:
```sh
yarn frontend:dev
```

##### Open another terminal and run:
```sh
yarn start
```

##### Open another terminal and run:
```sh
yarn frontend:test:e2e
```

```sh
yarn frontend:build
yarn frontend:test:e2e
```