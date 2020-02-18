Sourcemapify
============================
#### source-map plugin for Browserify

[![Cross-Platform Compatibility](https://jstools.dev/img/badges/os-badges.svg)](https://github.com/JS-DevTools/sourcemapify/blob/master/.github/workflows/CI-CD.yaml)
[![Build Status](https://github.com/JS-DevTools/sourcemapify/workflows/CI-CD/badge.svg)](https://github.com/JS-DevTools/sourcemapify/blob/master/.github/workflows/CI-CD.yaml)

[![Coverage Status](https://coveralls.io/repos/github/JS-DevTools/sourcemapify/badge.svg?branch=master)](https://coveralls.io/github/JS-DevTools/sourcemapify?branch=master)
[![Dependencies](https://david-dm.org/JS-DevTools/sourcemapify.svg)](https://david-dm.org/JS-DevTools/sourcemapify)

[![npm](https://img.shields.io/npm/v/sourcemapify.svg)](https://www.npmjs.com/package/sourcemapify)
[![License](https://img.shields.io/npm/l/sourcemapify.svg)](LICENSE)


The default sourcemap that Browserify generates uses paths that are relative to the current directory, which may not always be what you want. This plugin lets you change the relative path, or use absolute paths.

This plugin was inspired by [browserify-sourcemap-root-transform](https://github.com/blackberry/browserify-sourcemap-root-transform), so check that one out if this one doesn't meet your needs.


Related Projects
--------------------------
- [simplifyify](https://jstools.dev/simplifyify)<br>
  A simplified Browserify and Watchify CLI

- [globify](https://jstools.dev/globify)<br>
  Run browserify and watchify with globs - even on Windows

- [browserify-banner](https://jstools.dev/browserify-banner)<br>
  Add a comment (and/or code) to the top of your Browserify bundle



Installation
--------------------------
Install using [npm](https://docs.npmjs.com/about-npm/):

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
Contributions, enhancements, and bug-fixes are welcome!  [File an issue](https://github.com/JS-DevTools/sourcemapify/issues) on GitHub and [submit a pull request](https://github.com/JS-DevTools/sourcemapify/pulls).

#### Building
To build the project locally on your computer:

1. __Clone this repo__<br>
`git clone https://github.com/JS-DevTools/sourcemapify.git`

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


Big Thanks To
--------------------------
Thanks to these awesome companies for their support of Open Source developers ❤

[![Travis CI](https://jstools.dev/img/badges/travis-ci.svg)](https://travis-ci.com)
[![SauceLabs](https://jstools.dev/img/badges/sauce-labs.svg)](https://saucelabs.com)
[![Coveralls](https://jstools.dev/img/badges/coveralls.svg)](https://coveralls.io)
