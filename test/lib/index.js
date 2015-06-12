module.exports = {
  me: 'lib/index.js',
  foo: require('./foo'),
  subdirIndex: require('./subdir'),
  subdirFoo: require('./subdir/foo'),
  subdirSubdirFoo: require('./subdir/subdir/foo')
};
