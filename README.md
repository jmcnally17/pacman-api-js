# Pac-Man API &nbsp; <img height="32" width="32" src="https://cdn.simpleicons.org/javascript/#F7DF1E" />

This repository is the Javascript backend server for my solo Pac-Man project, and is currently the deployed version. This API connects to both MongoDB and Redis databases to store and retrieve user account and score data respectively.

The client application that pairs with this API can be found at https://github.com/jmcnally17/pacman-client

The Java Spring version of this API (in progress) can be found at https://github.com/jmcnally17/pacman-api-java

The original project monolith (with a full comprehensive commit history) can be found at https://github.com/jmcnally17/pacman-old

[<img src="./images/pacman-play-button.png">](https://projectpacman.netlify.app/)

### Technologies Used

- [Express](https://expressjs.com/) as a web framework
- [Node.js](https://nodejs.org/en/) for the server runtime environment
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) and [Redis Labs](https://redis.com/) for hosting the databases
- [Mongoose](https://mongoosejs.com/docs/) for Object Data Modelling (ODM)
- [Jest](https://jestjs.io/) for testing
- [Render](https://render.com/) for hosting
- [GitHub](https://github.com/) for version control

## Running Locally

This API can be run on your localhost. However, a number of frameworks need to be installed which requires some setup to do.

### Getting Started

The server is run using Node.js, which is installed using NVM - Node Version Manager. So if you haven't already, open your terminal and install NVM using:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Now, your ~/.zshrc file will need reloading:

```
source ~/.zshrc
```

Next, you can install and start using node by running:

```
nvm install node
nvm use node
```

`nvm use node` will use the latest stable version. MongoDB and Redis will need to be installed as they are the databases that store user data and scores. You can do so by using Homebrew (which can be installed using the instructions [here](https://brew.sh/)):

```
brew tap mongodb/brew
brew install mongodb-community@5.0
brew install redis
```

Then, start MongoDB by using:

```
brew services start mongodb-community@5.0
```

### How To Use

Now, you can clone this repository:

```
git clone https://github.com/jmcnally17/pacman-api-js.git
```

The dependencies must be installed by running `npm install` while in the [main](https://github.com/jmcnally17/pacman-api-js) directory.

Your local Redis server will need to be running for the backend to connect to it. Enter

```
redis-server
```

into a separate terminal to do this.

Now you can run the server by entering `npm start` while in the [main](https://github.com/jmcnally17/pacman-api-js) directory and the API will be ready to receive requests.

In order to play the game, you must also be running the client application alongside this server (link to that repo found at the top of this README).

## Testing

Tests can be run while in the [main](https://github.com/jmcnally17/pacman-api-js) directory by running `npm test`. Code coverage statistics can be obtained by running `npm run test:coverage`. Tests were written first in order to adhere to the test-driven development (TDD) process by following the red-green-refactor cycle.

## Express Application Generator

This project was bootstrapped with [Express Application Generator](https://expressjs.com/en/starter/generator.html).
