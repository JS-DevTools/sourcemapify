'use strict';

var fs           = require('fs'),
    path         = require('path'),
    browserify   = require('browserify'),
    sourcemapify = require('../');

var bundleFile = path.join(__dirname, 'www/js/bundle.js');

browserify(require.resolve('./'), {debug: true})
  .plugin(sourcemapify, {base: 'www/js'})
  .bundle()
  .pipe(fs.createWriteStream(bundleFile, 'utf8'));
