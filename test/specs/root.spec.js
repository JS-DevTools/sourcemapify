'use strict';

const fs = require('fs');
const paths = require('../fixtures/paths');
const browserify = require('browserify');
const sourcemapify = require('../../');
const exorcist = require('exorcist');
const chai = require('chai');
chai.should();

describe('Sourcemapify with "root" option', () => {
  it('should have no effect if "root" is an empty string', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { root: '' })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, 'utf8'))
      .on('error', done)
      .on('finish', () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, 'utf8'));

        // Because `root` was an empty string, the sourcemap uses paths that
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

  it('should prepend an absolute path to all sources', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { root: '/some/absolute/path/' })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, 'utf8'))
      .on('error', done)
      .on('finish', () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, 'utf8'));

        // The `root` path should be prepended to each source path
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          '/some/absolute/path/test/test-app/lib/foo.js',
          '/some/absolute/path/test/test-app/lib/index.js',
          '/some/absolute/path/test/test-app/lib/subdir/foo.js',
          '/some/absolute/path/test/test-app/lib/subdir/index.js',
          '/some/absolute/path/test/test-app/lib/subdir/subdir/foo.js',
          '/some/absolute/path/test/test-app/lib/subdir/subdir/index.js',
        ]);

        done();
      });
  });

  it('should prepend a relative path to all sources', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { root: '../../relative/path/' })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, 'utf8'))
      .on('error', done)
      .on('finish', () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, 'utf8'));

        // The `root` path should be prepended to each source path
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          '../../relative/path/test/test-app/lib/foo.js',
          '../../relative/path/test/test-app/lib/index.js',
          '../../relative/path/test/test-app/lib/subdir/foo.js',
          '../../relative/path/test/test-app/lib/subdir/index.js',
          '../../relative/path/test/test-app/lib/subdir/subdir/foo.js',
          '../../relative/path/test/test-app/lib/subdir/subdir/index.js',
        ]);

        done();
      });
  });

  it('should prepend a URL to all sources', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { root: 'http://mysite.com/src/' })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, 'utf8'))
      .on('error', done)
      .on('finish', () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, 'utf8'));

        // The `root` path should be prepended to each source path
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          'http://mysite.com/src/test/test-app/lib/foo.js',
          'http://mysite.com/src/test/test-app/lib/index.js',
          'http://mysite.com/src/test/test-app/lib/subdir/foo.js',
          'http://mysite.com/src/test/test-app/lib/subdir/index.js',
          'http://mysite.com/src/test/test-app/lib/subdir/subdir/foo.js',
          'http://mysite.com/src/test/test-app/lib/subdir/subdir/index.js',
        ]);

        done();
      });
  });
});
