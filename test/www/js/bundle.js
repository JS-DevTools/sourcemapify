(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  me: 'lib/foo.js'
};

},{}],2:[function(require,module,exports){
module.exports = {
  me: 'lib/index.js',
  foo: require('./foo'),
  subdirIndex: require('./subdir'),
  subdirFoo: require('./subdir/foo'),
  subdirSubdirFoo: require('./subdir/subdir/foo')
};

},{"./foo":1,"./subdir":4,"./subdir/foo":3,"./subdir/subdir/foo":5}],3:[function(require,module,exports){
module.exports = {
  me: 'lib/subdir/foo.js',
  index: require('.'),
  parentFoo: require('../foo'),
  parentIndex: require('../')
};

},{".":4,"../":2,"../foo":1}],4:[function(require,module,exports){
module.exports = {
  me: 'lib/subdir/index.js',
  foo: require('./foo')
};

},{"./foo":3}],5:[function(require,module,exports){
module.exports = {
  me: 'lib/subdir/subdir/foo.js',
  root: require('../../../'),
  lib: require('../../../lib'),
  index: require('./index.js')
};

},{"../../../":2,"../../../lib":2,"./index.js":6}],6:[function(require,module,exports){
module.exports = {
  me: 'lib/subdir/subdir/index.js'
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi90ZXN0L2xpYi9mb28uanMiLCIuLi8uLi90ZXN0L2xpYi9pbmRleC5qcyIsIi4uLy4uL3Rlc3QvbGliL3N1YmRpci9mb28uanMiLCIuLi8uLi90ZXN0L2xpYi9zdWJkaXIvaW5kZXguanMiLCIuLi8uLi90ZXN0L2xpYi9zdWJkaXIvc3ViZGlyL2Zvby5qcyIsIi4uLy4uL3Rlc3QvbGliL3N1YmRpci9zdWJkaXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1lOiAnbGliL2Zvby5qcydcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWU6ICdsaWIvaW5kZXguanMnLFxuICBmb286IHJlcXVpcmUoJy4vZm9vJyksXG4gIHN1YmRpckluZGV4OiByZXF1aXJlKCcuL3N1YmRpcicpLFxuICBzdWJkaXJGb286IHJlcXVpcmUoJy4vc3ViZGlyL2ZvbycpLFxuICBzdWJkaXJTdWJkaXJGb286IHJlcXVpcmUoJy4vc3ViZGlyL3N1YmRpci9mb28nKVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBtZTogJ2xpYi9zdWJkaXIvZm9vLmpzJyxcbiAgaW5kZXg6IHJlcXVpcmUoJy4nKSxcbiAgcGFyZW50Rm9vOiByZXF1aXJlKCcuLi9mb28nKSxcbiAgcGFyZW50SW5kZXg6IHJlcXVpcmUoJy4uLycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1lOiAnbGliL3N1YmRpci9pbmRleC5qcycsXG4gIGZvbzogcmVxdWlyZSgnLi9mb28nKVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBtZTogJ2xpYi9zdWJkaXIvc3ViZGlyL2Zvby5qcycsXG4gIHJvb3Q6IHJlcXVpcmUoJy4uLy4uLy4uLycpLFxuICBsaWI6IHJlcXVpcmUoJy4uLy4uLy4uL2xpYicpLFxuICBpbmRleDogcmVxdWlyZSgnLi9pbmRleC5qcycpXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1lOiAnbGliL3N1YmRpci9zdWJkaXIvaW5kZXguanMnXG59O1xuIl19
