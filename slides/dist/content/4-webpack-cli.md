# The Command Line Interface

---

## Basic Syntax

Basic format:

```sh
$ webpack <entry> <output>
```

Usage example:

```sh
$ webpack src/main.js dist/bundle.js
```

Notes:

Like many npm packages, Webpack comes with a Command Line Interface (CLI) that we can use to perform basic builds.

In its simplest form, the command requires the file that acts as the entry point of our application (entry), and the name that we want to give to the processed file (output).

---

## Code Example

Folder structure:


```sh
.
├── index.html
├── main.js
└── name.js
```

name.js

```js
var name = 'David';
export default name;
```

main.js

```js
import name from './name';
var message = 'The imported name is ' + name;
document.getElementById('text').innerHTML = message;
```


Notes:

Let's say for example that we have the files _name.js_ and _main.js_, whose goal is just to print a message in an HTML element with id "text".

---

## Load the Entry File

index.html

```html
...
<body>
  <p id="text"></p>
  <script src="main.js"></script>
</body>
...
```

Install web server and start it

```sh
$ npm install -g lite-server
$ lite-server
```

Browser's console

```sh
main.js:1 Uncaught SyntaxError: Unexpected token import
```

Notes:

---

## Load the Bundle

Generate the bundle with the CLI

```sh
$ webpack main.js bundle.js
```

Load the bundle instead of the entry file in the browser

```html
...
<body>
  <p id="text"></p>
  <script src="bundle.js"></script>
</body>
...
```

Browser's console 

```sh
The imported name is David
```

---

## Build Modes

Normal mode

```sh
$ webpack main.js bundle.js
    Asset     Size  Chunks             Chunk Names
bundle.js  2.81 kB       0  [emitted]  main
```

Development mode (source maps)

```sh
$ webpack main.js bundle.js -d
    Asset     Size  Chunks             Chunk Names
bundle.js  3.87 kB       0  [emitted]  main
```

Production mode (minified)

```sh
$ webpack main.js bundle.js -p
    Asset       Size  Chunks             Chunk Names
bundle.js  621 bytes       0  [emitted]  main
```

---

## Watching Changes

Watching normal mode

```sh
$ webpack main.js bundle.js -w
```

Watching development mode

```sh
$ webpack main.js bundle.js -wd
```

---

## Exercise 2

Using the files found in the folder exercise-2, identify the "entry" point and create a bundle called app.js using the CLI. Run the resulting bundle in the browser using the production and debug mode to see the difference.

Duration: 10 minutes