# Chunks and Tokens

---

## Webpack Chunks

- Generic term used to describe the grouping of modules
- We can have one or multiple chunks in a build

There are three types of chunks:

- **Entry chunk:** Modules + Runtime (config file)
- **Normal chunk:** Only modules (lazy loading)
- **Initial chunk:** Like a normal chunk but with higher priority (never seen one in use)

---

## Single Entry Chunk

```js
module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    ...
  }
  ...
};
```

```js
module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].js',
    ...
  }
  ...
};
```

---

## Multiple Entry Chunks

We can even group libraries from _node\_modules_

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
    vendor: ['jquery', 'lodash']
  },
  output: {
    filename: '[name].js',
    ...
  }
  ...
};
```

---

## Webpack Tokens

We can create dynamic output names with tokens:

- **`[name]`**: Name of the chunk
- **`[hash]`**: Hash of the build
- **`[chunkhash]`**: Hash of the chunk

Example:

```js
module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist',
    filename: 'bundle.[hash].js'
  }
}
```

---

## The "name" Token

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    path: './dist',
    filename: '[name].js'
  }
}
```

```sh
.
├── dist
│   ├── app.js
│   ├── search.js
│   └── ...
├── src
│   ├── app.js
│   ├── search.js
│   └── ...
└── ...
```

Notes: We have two chunks in this example, "app" and "search"

---

## The "hash" Token

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    path: './dist',
    filename: '[name].[hash].js'
  }
}
```

```sh
.
├── dist
│   ├── app.78299d16c173ac6e3ee3.js
│   ├── search.78299d16c173ac6e3ee3.js
│   └── ...
├── src
│   ├── app.js
│   ├── search.js
│   └── ...
└── ...
```

---

## The "chunkhash" Token

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    path: './dist',
    filename: '[name].[chunkhash].js'
  }
}
```

```sh
.
├── dist
│   ├── app.307910a06a086c83ba41.js
│   ├── search.7468aa2c7d022712a76e.js
│   └── ...
├── src
│   ├── app.js
│   ├── search.js
│   └── ...
└── ...
```

---

## Which hash to Use?

Always use chunkhash. That will allow you to cache the content that don't change between builds.