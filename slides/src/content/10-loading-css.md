# Loading CSS

---

## Webpack Loaders

- Webpack is capable of handling more than just plain Javascript with "loaders".
- The idea behing loaders is that everything needs to be transformed to Javascript as text.
- We can use multiple loaders to further transform a file (chaining).
- Webpack loaders can be found as npm packages.
- For every file type that we want to include in our build process, we will need a different loader (CSS, Images, Typescript, etc).

---

## How to Load CSS

To install the loader:

```sh
$ npm install --save-dev css-loader
```

To import CSS into a JS file, we can use the loader with the syntax "`<loader>!<file>`"

```js
import * as styles from 'css-loader!./styles.css';
```

The variable `styles` is a Javascript object that holds a reference to the content of the file _styles.css_

To access the actual content of the file, we need to use the method `styles.toString()`

---

## Injecting Styles to a Web App

One way to attach the styles to the browser:

```js
import * as style from 'css-loader!./styles.css';
import $ from 'jquery';

var styleNode = '<style>' + style.toString() + '</style>';
$('head').append(styleNode);
```

This will inject the contents of the CSS file into the head of our application using a `<style>` element.

**There is an easier way to do this!**

---

## Chaining Loaders

We can use more than one loader that operates in sequence:

```js
import '<loader-b>!<loader-a>!<file>';
```

**Chained loaders are executed from right to left.**

Usually, the first loader in a chain is in charge of transforming an asset into a format that can be manipulated by Javascript.

---

## A Better Way to Inject Styles

Chain the `css-loader` with the `style-loader`.

```sh
$ npm install --save-dev style-loader
```

Chain the loaders in the code:

```
import 'style-loader!css-loader!styles.css';
```

This is equivalent to the jQuery code before.

---

## Configuring Loaders

We can define the loaders in the _webpack.config.js_ file:

```js
module.exports = {
  ...
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
```

Alternative array syntax:

```js
module.exports = {
  ...
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  }
};
```

Notes:

- Manually define all the loaders in the chain for every import is too verbose and error prone.

---

## Configuring Loaders (part 2)

Every loader requires two pieces of information:

- **test:** The set of files where to apply the loader as a regular expresion.
- **loaders:** An array of loaders to use in a chain.

We can now just do:

```js
import './styles.css';
```

---

## Exercise 7

(10 min)

Update the files found in the folder _exercise-7_ to have a build system that is able to inject the content of the file styles.css in the browser using loaders.