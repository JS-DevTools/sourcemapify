"use strict";

const fs = require("fs");
const path = require("path");
const paths = exports;

paths.root = path.resolve("test", "test-app");
paths.lib = path.join(paths.root, "lib");
paths.dist = path.join(paths.root, "dist");
paths.entryFile = path.join(paths.lib, "index.js");
paths.bundleFile = path.join(paths.dist, "bundle.js");
paths.mapFile = path.join(paths.dist, "bundle.js.map");

if (fs.existsSync("node_modules/browser-pack")) {
  // NPM 3.0 installs all dependencies directly under "node_modules"
  paths.preludeFile = "node_modules/browser-pack/_prelude.js";
}
else {
  // NPM 2.0 installs dependencies under their parent module
  paths.preludeFile = "node_modules/browserify/node_modules/browser-pack/_prelude.js";
}
