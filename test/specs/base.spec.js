"use strict";

const fs = require("fs");
const path = require("path");
const paths = require("../fixtures/paths");
const browserify = require("browserify");
const sourcemapify = require("../../");
const exorcist = require("exorcist");
const chai = require("chai");
chai.should();

describe('Sourcemapify with "base" option', () => {
  it('should have no effect if "base" is an empty string', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { base: "" })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, "utf8"))
      .on("error", done)
      .on("finish", () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, "utf8"));

        // Because `base` was an empty string, the sourcemap uses paths that
        // are relative to the current directory
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          "test/test-app/lib/foo.js",
          "test/test-app/lib/index.js",
          "test/test-app/lib/subdir/foo.js",
          "test/test-app/lib/subdir/index.js",
          "test/test-app/lib/subdir/subdir/foo.js",
          "test/test-app/lib/subdir/subdir/index.js",
        ]);

        done();
      });
  });

  it('should have no effect if "base" is the same as CWD', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { base: process.cwd() })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, "utf8"))
      .on("error", done)
      .on("finish", () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, "utf8"));

        // Because `base` was an empty string, the sourcemap uses paths that
        // are relative to the current directory
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          "test/test-app/lib/foo.js",
          "test/test-app/lib/index.js",
          "test/test-app/lib/subdir/foo.js",
          "test/test-app/lib/subdir/index.js",
          "test/test-app/lib/subdir/subdir/foo.js",
          "test/test-app/lib/subdir/subdir/index.js",
        ]);

        done();
      });
  });

  it("should add an additional directory level to each path", done => {
    const parentDir = path.basename(process.cwd());

    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { base: ".." })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, "utf8"))
      .on("error", done)
      .on("finish", () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, "utf8"));

        // Because `root` was an empty string, the sourcemap uses paths that
        // are relative to the current directory
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          `${parentDir}/test/test-app/lib/foo.js`,
          `${parentDir}/test/test-app/lib/index.js`,
          `${parentDir}/test/test-app/lib/subdir/foo.js`,
          `${parentDir}/test/test-app/lib/subdir/index.js`,
          `${parentDir}/test/test-app/lib/subdir/subdir/foo.js`,
          `${parentDir}/test/test-app/lib/subdir/subdir/index.js`,
        ]);

        done();
      });
  });

  it("should remove directory levels from each path", done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { base: "test/test-app" })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, "utf8"))
      .on("error", done)
      .on("finish", () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, "utf8"));

        // Because `root` was an empty string, the sourcemap uses paths that
        // are relative to the current directory
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          "lib/foo.js",
          "lib/index.js",
          "lib/subdir/foo.js",
          "lib/subdir/index.js",
          "lib/subdir/subdir/foo.js",
          "lib/subdir/subdir/index.js",
        ]);

        done();
      });
  });

  it("should remove a directory level from each path via an absolute path", done => {
    const absolutePath = path.resolve("test");

    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { base: absolutePath })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, "utf8"))
      .on("error", done)
      .on("finish", () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, "utf8"));

        // Because `root` was an empty string, the sourcemap uses paths that
        // are relative to the current directory
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          "test-app/lib/foo.js",
          "test-app/lib/index.js",
          "test-app/lib/subdir/foo.js",
          "test-app/lib/subdir/index.js",
          "test-app/lib/subdir/subdir/foo.js",
          "test-app/lib/subdir/subdir/index.js",
        ]);

        done();
      });
  });

  it('should work in conjunction with the "root" option', done => {
    browserify(paths.entryFile, { debug: true })
      .plugin(sourcemapify, { base: "test/test-app/lib", root: "http://mysite.com/src/" })
      .bundle()
      .pipe(exorcist(paths.mapFile))
      .pipe(fs.createWriteStream(paths.bundleFile, "utf8"))
      .on("error", done)
      .on("finish", () => {
        let sourcemap = JSON.parse(fs.readFileSync(paths.mapFile, "utf8"));

        // Because `root` was an empty string, the sourcemap uses paths that
        // are relative to the current directory
        sourcemap.sources.should.deep.equal([
          paths.preludeFile,
          "http://mysite.com/src/foo.js",
          "http://mysite.com/src/index.js",
          "http://mysite.com/src/subdir/foo.js",
          "http://mysite.com/src/subdir/index.js",
          "http://mysite.com/src/subdir/subdir/foo.js",
          "http://mysite.com/src/subdir/subdir/index.js",
        ]);

        done();
      });
  });
});
