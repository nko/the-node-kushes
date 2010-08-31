require.paths.unshift(
  
  // http://github.com/senchalabs/connect
  './lib/connect/lib',
  
  // http://github.com/visionmedia/express
  './lib/express/lib',
  
  // http://github.com/visionmedia/ejs
  './lib/ejs/lib',
  
  // http://github.com/LearnBoost/Socket.IO-node
  './lib/socket.io/lib',
  
  // http://github.com/kriszyp/commonjs-utils
  './lib/commonjs-utils/lib',
    
  // http://github.com/fictorial/redis-node-client
  './lib/redis-node-client/lib'
  
);
sys = require("sys");
express = require('express');
JSON = require('json');
io = require('socket.io');
hashlib = require("hashlib");
redis = require("redis-client");