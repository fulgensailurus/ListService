![alt text](https://travis-ci.org/RoelandMatthijssens/shoppingList.svg?branch=master)

# Shopping List

This project contains the code to implement the logic of a shopping list.

# Pre-reqs

To build and run this app locally you need to install a few things:

- Install [Node.js](https://nodejs.org/en/)

    The recommended way of running node locally is by using the [Node version manager (nvm)](https://github.com/creationix/nvm)

- Install SQLite3

# Getting started

This section explains the steps of getting started with a simple development setup (locally or with docker)

## Clone the repository

```bash
git clone git@github.com:RoelandMatthijssens/shoppingList.git
```

## Local setup

Locally, you'll have to install all the required node modules and run database migrations.

First, install all the modules:

```bash
npm install
```

To run migrations, it's very useful to install the typeorm cli globally:

```bash
npm install -g typeorm
```

Before you can run the migrations, you first need to initialize some basic environment variables.
All of the environment variables are described in the file `.env.example` in the root of this project. You can copy this file to `.env` and make the appropriate changes:

```bash
cp .env.example .env

# $EDITOR .env
# ...changes...
```

After setting the correct environment variables, you can run the following command to apply default migrations:

```bash
npm run migrate
```

You can also run the following

```bash
npx ts-node ./node_modules/.bin/typeorm migration:run
```

To run the server in development mode, it's useful to run the watch command.
This watch command will check the typescript code for changes, as well as the compiled javascript code (so that the API is refreshed automatically after each change).

```bash
# Run auto refreshing server
npm run watch

# Manually
npm run build-ts
npm run serve
```

Now you can visit your browser at the address [http://localhost:3000](http://localhost:3000), and you're all set to go!

## Contributing

### Running tests

To run the massive test suite, run the following command:

```bash
npm run test
```

To see CI progress: https://travis-ci.org/RoelandMatthijssens/shoppingList
