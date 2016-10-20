# Webpack Dev Server

---

## A Common Dev Workflow

```js
{
  ...
  "scripts": {
    "clean": "rm -rf dist",
    "build": "npm run clean && webpack",
    "build:watch": "npm run clean && webpack -dw",
    "build:prod": "npm run clean && webpack -p"
    "start": "lite-server"
  },
  ...
}
```

Terminal 1

```sh
$ npm run build:watch
```

Terminal 2

```sh
$ npm start
```

Notes:

- This works because `lite-server` by default watches files for change.
- With every change, `lite-server` restarts twice.
- First when saving file in _src_ folder.
- Again when the build is performed and a new bundle file is created.
- lite-server requires its own config file (maintenance).

---

## A Web Server for Webpack

```sh
$ npm install --save-dev webpack-dev-server@2.1.0-beta.4
```

Replace `lite-server` with `webpack-dev-server` in _package.json_

```js
{
  ...
  "scripts": {
    "clean": "rm -rf dist",
    "build": "npm run clean && webpack",
    "build:prod": "npm run clean && webpack -p",
    "start": "webpack-dev-server"
  },
  ...
}
```

- We no longer need the file `bs-config.json`
- `webpack-dev-server` executes `webpack` in watch mode (no need for `build:watch`)

---

## webpack-dev-server Workflow

Starting the `webpack-dev-server` will:

```sh
$ npm start
```

1. Perform a build with Webpack.
2. Start the development server.
3. Watch for changes in the entry file of `webpack.config.js` or any dependency.
4. If change is detected go back to step 1.

Files are served from memory, not disk => **better performance**

---

## Configuring the Server

`webpack-dev-server` can be configured in _webpack.config.js_

```js
...
module.exports = {
  ...
  devServer: {
    noInfo: true
  }
};
```

The option "noInfo: true" will prevent the server from showing detailed information of the build everytime a file changes.

To see all the configuration options, see the [docs](http://webpack.github.io/docs/webpack-dev-server.html).

---

## Exercise 6

(Duration: 15 minutes)

Transform the build system found in the init folder that uses lite-server into a build system that uses the webpack-dev-server package. Verify that the app is still running.