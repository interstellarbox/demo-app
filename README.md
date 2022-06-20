## Description

A small react app based on [CRA](https://create-react-app.dev/) that uses [Mobx](https://mobx.js.org/README.html) library for state management and [Ant Design](https://ant.design/) as a UI components library.

[Demo video in case you don't want to start the app locally](https://www.loom.com/share/97cbb6b48a1f4912a9658c06c083b3ed)

## Installation

Use the package manager **yarn** or **npm** to install all dependencies and start the app locally.

```bash
yarn install
```

```bash
npm install
```

## Start the app

```bash
yarn start
```

```bash
npm start
```

## Notes

- add unit and integration tests (**Jest** and **Cypress**)
- move logic for managing **Jobs** and **Notes** into two separate stores - **jobsStore** and **notesStore**. Initiate them inside of the main **rootStore** and pass references of each other.
