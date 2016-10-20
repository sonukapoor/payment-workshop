# Configuring Webpack

---

## Configuration File

Compare "`webpack <entry> <output>`" to just "`webpack`"

_webpack.config.js_

```js
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

To execute the build and load in the browser:

```sh
$ webpack
$ lite-server
```

---

## Separating Source From Build

Expected structure

```sh
.
├── dist
│   ├── bundle.js
│   └── index.html
├── src
│   ├── main.js
│   └── name.js
└── webpack.config.js
```

_webpack.config.js_

```js
module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  }
};
``` 

Notes:

We need to put the file _index.html_ file inside the _dist_ folder for now. Ideally, that file should be in the _src_ as well. We will see a technique for that later.

Because our executable code is not directly under the root folder of the project, we can't call `$ lite-server` from the root folder as before. We need to create a configuration file for the server.

---

## Configuring lite-server

lite-server needs to know where to find our executable files

_bs-config.json_

```sh
{
  "server": {
    "baseDir": "./dist"
  }
}
```

```sh
.
├── bs-config.json
├── dist
│   └── ...
├── src
│   └── ...
└── webpack.config.js
```

---

## Exercise 3

(Duration: 15 minutes)

The files in the folder _exercise-3_ are a continuation from exercise 2. From there, create a build system that expects the source files to be in a folder called _src_ and creates a bundle file called _app.js_ in the _dist_ folder. Load the resulting bundle in the browser using the `lite-server`.