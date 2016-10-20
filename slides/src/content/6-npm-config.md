# Integrating Webpack with NPM

---

## Install Dependencies Locally

Create a default _package.json_ file

```sh
$ npm init --force
```

Install packages locally

```sh
$ npm install --save-dev webpack@2.1.0-beta.21 lite-server
```

---

## Copying the HTML File

Goal: move _src/index.html_ to _dist/_ as part of the build.

_package.json_

```js
{
  ...
  "scripts": {
    "clean-and-copy": "rm -rf dist && mkdir dist && cp src/index.html dist",
    "build": "npm run clean-and-copy && webpack",
    "start": "lite-server"
  },
  ...
}
```

To run and execute the build

```sh
$ npm run build
$ npm start
```

---

## Final Folder Structure

After running a build we should have this folder structure:

```sh
.
├── bs-config.json
├── dist
│   ├── bundle.js
│   └── index.html
├── package.json
├── src
│   ├── index.html
│   ├── main.js
│   └── name.js
└── webpack.config.js
```

---

## Exercise 4

(Duration: 20 minutes)

Update the files in the _exercise-4_ folder to have three npm scripts:

- `clean-and-copy`: Will clean the _dist_ directory and copy the file _index.html_ from _src_ to _dist_.
- `build:watch`: Will call the script `clean-and-copy` and then executes webpack in watch mode.
- `start`: Start the development server 

**Note:** Don't forget to install the required npm packages for the build system.