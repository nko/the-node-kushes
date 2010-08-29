$(document).ready(function() {
  io.setPath('/voting-room/' + nodevote.voting_room_id);
  var socket_client = new io.Socket(null, {port: 80});
  socket_client.connect();
  socket.on('message', function(options) {
    options = JSON.parse(options);
  }});
  nodevote.ui = {};
  nodevote.ui.handlers = {};
  nodevote.ui.handlers['freeze'] = {
    'click': function() {
    }
  }
  $('#freeze').click(nodevote.ui.handlers['freeze'].click);
});      
