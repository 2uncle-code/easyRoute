'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_2.default.get('/hi', function (req, res) {
  res.send('hi');
});

_2.default.group('/user', function (req, res, next) {
  console.log('this is it!');
  next();
}, function () {
  _2.default.get('/name', function (req, res) {
    res.send('mark');
  });
  _2.default.get('/age', function (req, res) {
    res.send('18');
  });
});
_2.default.bind(app);
var server = app.listen(8088, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log(" http://%s:%s", host, port);
});