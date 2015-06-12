sourcemapify
============================
#### source-map plugin for Browserify

[![Dependencies](https://img.shields.io/david/BigstickCarpet/sourcemapify.svg)](https://david-dm.org/BigstickCarpet/sourcemapify)
[![npm](http://img.shields.io/npm/v/sourcemapify.svg)](https://www.npmjs.com/package/sourcemapify)
[![License](https://img.shields.io/npm/l/sourcemapify.svg)](LICENSE)


The default sourcemap that Browserify generates uses paths that are relative to the current directory, which may not always be what you want. This plugin lets you change the relative path, or use absolute paths.

This plugin was inspired by [browserify-sourcemap-root-transform](https://github.com/blackberry/browserify-sourcemap-root-transform), so check that one out if this one doesn't meet your needs.


Installation
--------------------------
Install using [npm](https://docs.npmjs.com/getting-started/what-is-npm):

```bash
npm install sourcemapify
```


Usage
--------------------------
### Command Line
Use Browserify's sub-argument command-line syntax, like this:

```bash
browserify -p [ sourcemapify --root "../../" ] --debug
```

### Browserify API
Use the plugin programmatically like this:  [full example](test/api.js)

```javascript
var browserify = require('browserify');
var sourcemapify = require('sourcemapify');

browserify({debug: true})
  .plugin(sourcemapify, {base: 'www/js'})
  .bundle()
  .pipe(fs.createWriteStream('www/js/bundle.js', 'utf8'));
```


Options
--------------------------
There's only a couple options right now, but I plan to add more in the future.

#### `root` (string)
The root path for all files in the source map. It can be an absolute or relative path. This string will be prepended as-is to each file path.

#### `base` (string)
The base path of the bundle (i.e. the bundle file's directory, relative to cwd). This path will be used to determine the relative path of each file. It can be an absolute or relative path.
