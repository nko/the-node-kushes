require.paths.unshift(
  
  , './lib/connect/lib'
  , './lib/express/lib'
  , './lib/ejs/lib'
  , './lib/socket.io/lib'
  , './lib/commonjs-utils/lib'

);
express = require('express');
JSON = require('json');
SocketIO = require('socket.io');