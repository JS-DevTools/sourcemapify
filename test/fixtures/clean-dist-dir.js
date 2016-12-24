'use strict';

const fs = require('fs');
const paths = require('./paths');
const del = require('del');

/**
 * Resets the contents of the "test-app/dist" directory before each test.
 */
beforeEach(done => {
  // Delete the "test-app/dist" directory, if it exists
  del('test/test-app/dist')
    .then(() => {
      // Re-create the "test-app/dist" directory
      fs.mkdirSync(paths.dist);

      // Create an empty "bundle.js" file,
      // since Browserify throws an error if the file doesn't exist
      fs.writeFileSync(paths.bundleFile, '');

      done();
    })
    .catch(done);
});
