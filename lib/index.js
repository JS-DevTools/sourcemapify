/* jshint -W040 */
'use strict';

var path    = require('path'),
    through = require('through');

module.exports = sourcemapify;

/**
 * Transforms the browserify sourcemap
 *
 * @param browserify
 * @param options
 */
function sourcemapify(browserify, options) {
  options = options || browserify._options || {};

  // Create a stream to transform the sourcemap
  var transformStream = through(write, end);

  function write(data) {
    if (options.base) {
      // Determine the relative path
      // from the bundle file's directory to the source file
      var base = path.resolve(process.cwd(), options.base);
      data.sourceFile = path.relative(base, data.file);
    }

    if (options.root) {
      // Prepend the root path to the file path
      data.sourceFile = path.join(options.root, data.sourceFile);
    }

    this.queue(data);
  }

  function end() {
    this.queue(null);
  }

  // Add our transform stream to Browserify's "debug" pipeline
  // https://github.com/substack/node-browserify#bpipeline
  browserify.pipeline.get('debug').push(transformStream);
  return this;
}
