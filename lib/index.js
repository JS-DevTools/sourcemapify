'use strict';

const path = require('path');
const Through = require('through');

module.exports = sourcemapify;

/**
 * Transforms the browserify sourcemap
 *
 * @param {object} browserify - The Browserify instance
 * @param {object} [options] - Plugin options
 */
function sourcemapify (browserify, options) {
  options = options || browserify._options || {};

  function write (data) {
    if (options.base) {
      // Determine the relative path
      // from the bundle file's directory to the source file
      let base = path.resolve(process.cwd(), options.base);
      data.sourceFile = path.relative(base, data.file);
    }

    if (options.root) {
      // Prepend the root path to the file path
      data.sourceFile = joinURL(options.root, data.sourceFile);
    }

    // Output normalized URL paths
    data.sourceFile = normalizeSeparators(data.sourceFile);
    this.queue(data);
  }

  // Add our transform stream to Browserify's "debug" pipeline
  // https://github.com/substack/node-browserify#bpipeline
  configurePipeline();
  browserify.on('reset', configurePipeline);

  function configurePipeline () {
    browserify.pipeline.get('debug').push(new Through(write));
  }

  return this;
}

/**
 * Joins two URL paths, possibly adding a separator.
 *
 * @param {string} urlA
 * @param {string} urlB
 * @returns {string}
 */
function joinURL (urlA, urlB) {
  urlA = urlA || '';
  urlB = urlB || '';

  let endsWithASlash = urlA.substr(-1) === '/' || urlA.substr(-1) === '\\';
  let startsWithASlash = urlB[0] === '/' || urlB[0] === '\\';

  if (endsWithASlash || startsWithASlash) {
    return urlA + urlB;
  }
  else {
    return urlA + '/' + urlB;
  }
}

/**
 * Replaces Windows path separators ("\") with URL path separators ("/").
 *
 * @param {string} p
 * @returns {string}
 */
function normalizeSeparators (p) {
  p = p || '';

  if (path.sep === '\\') {
    // Replace backslashes with forward slashes
    return p.replace(/\\/g, '/');
  }
  else {
    // Return the path as-is, since it should already have proper URL separators.
    // If it DOES contain backslashes, then they are treated as normal characters,
    // NOT as separators
    return p;
  }
}
