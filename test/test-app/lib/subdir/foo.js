module.exports = {
  me: 'lib/subdir/foo.js',
  index: require('.'),
  parentFoo: require('../foo'),
  parentIndex: require('../')
};
