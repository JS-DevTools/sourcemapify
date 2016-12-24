'use strict';

const fs = require('fs');
const paths = require('../fixtures/paths');
const browserify = require('browserify');
const sourcemapify = require('../../');
const exorcist = require('exorcist');
const chai = require('chai');
chai.should();

describe('Sourcemapify with no options', () => {
  it('should have paths relative to the current directory', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify)
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, 'utf8'))
      .on('error', done)
      .on('finish', () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, 'utf8'));

        // By default, Browserify's sourcemap uses paths that
        // are relative to the current directory
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          'test/test-app/lib/foo.js',
          'test/test-app/lib/index.js',
          'test/test-app/lib/subdir/foo.js',
          'test/test-app/lib/subdir/index.js',
          'test/test-app/lib/subdir/subdir/foo.js',
          'test/test-app/lib/subdir/subdir/index.js',
        ]);

        done();
      });
  });
});
