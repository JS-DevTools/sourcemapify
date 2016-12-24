'use strict';

const path = require('path');
const paths = exports;

paths.root = path.resolve('test', 'test-app');
paths.lib = path.join(paths.root, 'lib');
paths.dist = path.join(paths.root, 'dist');
paths.entryFile = path.join(paths.lib, 'index.js');
paths.bundleFile = path.join(paths.dist, 'bundle.js');
paths.mapFile = path.join(paths.dist, 'bundle.js.map');
