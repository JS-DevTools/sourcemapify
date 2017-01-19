sourcemapify
============================
#### source-map plugin for Browserify

[![Build Status](https://api.travis-ci.org/BigstickCarpet/sourcemapify.svg?branch=master)](https://travis-ci.org/BigstickCarpet/sourcemapify)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/bigstickcarpet/sourcemapify?svg=true&failingText=Windows%20build%20failing&passingText=Windows%20build%20passing)](https://ci.appveyor.com/project/BigstickCarpet/sourcemapify/branch/master)

[![Dependencies](https://david-dm.org/BigstickCarpet/sourcemapify.svg)](https://david-dm.org/BigstickCarpet/sourcemapify)
[![Coverage Status](https://coveralls.io/repos/github/BigstickCarpet/sourcemapify/badge.svg?branch=master)](https://coveralls.io/github/BigstickCarpet/sourcemapify?branch=master)
[![Codacy Score](https://api.codacy.com/project/badge/Grade/3c64907c5b3844a18058c8e021a78181)](https://www.codacy.com/public/jamesmessinger/sourcemapify)
[![Inline docs](http://inch-ci.org/github/BigstickCarpet/sourcemapify.svg?branch=master&style=shields)](http://inch-ci.org/github/BigstickCarpet/sourcemapify)

[![npm](http://img.shields.io/npm/v/sourcemapify.svg)](https://www.npmjs.com/package/sourcemapify)
[![License](https://img.shields.io/npm/l/sourcemapify.svg)](LICENSE)


The default sourcemap that Browserify generates uses paths that are relative to the current directory, which may not always be what you want. This plugin lets you change the relative path, or use absolute paths.

This plugin was inspired by [browserify-sourcemap-root-transform](https://github.com/blackberry/browserify-sourcemap-root-transform), so check that one out if this one doesn't meet your needs.


Related Projects
--------------------------
* [simplifyify](https://www.npmjs.com/package/simplifyify) - A simplified Browserify and Watchify CLI
* [globify](https://www.npmjs.com/package/globify) - Run browserify and watchify with globs - even on Windows
* [browserify-banner](https://www.npmjs.com/package/browserify-banner) - Add a comment (and/or code) to the top of your Browserify bundle


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
The following options can be set via the API or command-line:

#### `root` (string)
The root path for all files in the source map. It can be an absolute or relative path. This string will be prepended as-is to each file path.

#### `base` (string)
The base path of the bundle (i.e. the bundle file's directory, relative to cwd). This path will be used to determine the relative path of each file. It can be an absolute or relative path.



Contributing
--------------------------
I welcome any contributions, enhancements, and bug-fixes.  [File an issue](https://github.com/BigstickCarpet/sourcemapify/issues) on GitHub and [submit a pull request](https://github.com/BigstickCarpet/sourcemapify/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/bigstickcarpet/sourcemapify.git`

2. __Install dependencies__<br>
`npm install`

3. __Link the module to itself__ (so Browserify can find the plugin)<br>
`npm link`<br>
`npm link sourcemapify`

4. __Run the tests__<br>
`npm test`



License
--------------------------
sourcemapify is 100% free and open-source, under the [MIT license](LICENSE). Use it however you want.

