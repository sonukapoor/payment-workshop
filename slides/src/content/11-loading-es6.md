# Loading ES6

---

## What if our Code Is Written in ES6?

_user.js_

```js
export default class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  getCompleteName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

_main.js_

```js
import User from './user';
let user = new User('John', 'Doe');
let message = `${user.getCompleteName()} logged in successfully`;
document.getElementById('text').textContent = message;
```

Notes:

- To do modern Javascript development we need to go beyond ES5: ES6 or Typescript.
- We are using ES6 keywords like `class` and `let` that the browser doesn't understand.
- We will need to use Babel to transpile our code to ES5.

---

## Babel Loader

```sh
$ npm install --save-dev babel-loader babel-core babel-preset-es2015
```

_webpack.config.js_

```js
module.exports = {
  ...
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  }
};
```

_.babelrc_

```js
{ "presets": ["es2015"] }
```

---

## Exercise 8

(Duration: 15 minutes)

Go to the init folder and update the build system so Webpack is able to transpile the ES2015 code.