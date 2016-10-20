# Working with the Browser Cache

---

## How to Avoid the Cache

Asset referenced from HTML => Get it from the cache!

```html
<script src="bundle.js"></script>
```

**Problem:** User might not get latest version

**Solution:** Change name with every build with `[hash]` or `[chunkhash]` token

```javascript
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: './dist',
    filename: '[name].[chunkhash].js'
  }
};
```

---

## A New Problem

- How do we write the `src` property of the `<script>` tag?
- The file name is not fixed anymore

Solution:

- Don't write the `<script>` tag manually
- Use a Webpack **plugin** to inject the tag for you with the correct name

---

## Webpack Plugins

- Extend Webpack native capabilities
- Can be built-in or developed by the community
- Perform tasks similar to a task runner like Gulp
- Can be installed from NPM

---

## HTML Webpack Plugins

Local installation

```sh
$ npm install --save-dev html-webpack-plugin
```

How to use it in the configuration file

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

---

## Let the Plugin Do the Heavy Lifting!

Don't define the `<script>` tag yourself in _src/index.html_

```html
...
<body>
  <p id="text"></p>
</body>
...
```

Don't move the _src/index.html_ to the _dist_ folder in _package.json_

```js
{
  ...
  "scripts": {
    "clean": "rm -rf dist",
    "build": "npm run clean && webpack",
    "start": "lite-server"
  },
  ...
}
```

---

## The Results

```sh
.
├── dist
│   ├── bundle.78299d16c173ac6e3ee3.js
│   └── index.html
├── src
│   ├── index.html
│   ├── main.js
│   └── ...
└── ...
```

_dist/index.html_

```html
...
<body>
  <p id="text"></p>
  <script type="text/javascript" src="bundle.78299d16c173ac6e3ee3.js"></script>
</body>
...
```

---

## Exercise 5

(Duration: 15 minutes)

Update the files found in the _exercise-5_ folder to have a build system with the following characteristics:

- It should create a bundle with a file name like `app-21313213123231.js`, where the long number is the hash number of the chunk.
- It should automatically inject the script tag in the _index.html_ file with the appropriate filename.

**Note:** Don't forget to install any required dependency in _package.json_.