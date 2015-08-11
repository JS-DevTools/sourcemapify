/* jshint -W040 */
'use strict';

var path    = require('path'),
    through = require('through');

module.exports = sourcemapify;

/**
 * Transforms the browserify sourcemap
 *
 * @param {object} browserify - The Browserify instance
 * @param {object} [options] - Plugin options
 */
function sourcemapify(browserify, options) {
  options = options || browserify._options || {};

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

  // Add our transform stream to Browserify's "debug" pipeline
  // https://github.com/substack/node-browserify#bpipeline
  configurePipeline();
  browserify.on('reset', function() {
    configurePipeline();
  });

  function configurePipeline() {
    browserify.pipeline.get('debug').push(new through(write));
  }

  return this;
}
