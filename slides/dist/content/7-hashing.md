# Working with the Browser Cache

---

## How the Browser Cache Works

```html
<script src="bundle.js"></script>
```

![my image](img/browser-cache-retrieval.jpg)

Everytime the browser tries to load an asset (js, css, img), it will...

1. Look at its cache to see if the file is already there
1.2. If the file is there, it will check if the asset has not expired
1.2.1. If the asset has not expired, it will use cached version of the file
1.2.2. If the asset has expired, it wi
Download all the assets referenced by an HTML page from the webserver (js, css, images, etc.).
2. Store every asset in the cache indexed by name

Every time the page is reloaded, the Browser...

1. Will try to find 