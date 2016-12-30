#React with NodeJS and Express
A boiler plate of having a NodeJS and Express backend serving API with a ReactJS front-end.

Inspired by https://github.com/christianalfoni/webpack-express-boilerplate

##Getting started
To get started, run the following commands:
```shell
npm install
npm run start
```

##To dos
* add test suite for both front-end (jest) and back-end(mocha)
* figure out a way to build babel for back-end code for production
* add `react-router` to front-end
* add `redux` to front-end
* figure out a way to optimize development while doing both FE and BE (nodemon is extremely slow for FE because Webpack needs to build too)
* use passport js to handle logins and possibly sessions