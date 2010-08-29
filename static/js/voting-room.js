nodevote = {};
nodevote.ui = {};
nodevote.ui.handlers = {};

$(document).ready(function() {
  io.setPath('/voting-room/' + nodevote.voting_room_id);
  var socket_client = new io.Socket(null, {port: 80});
  socket_client.connect();
  socket_client.on('message', function(options) {
    console.log(message);
    options = JSON.parse(options);
  });
  nodevote.ui.handlers['freeze'] = {
    'click': function() {
    }
  }
  $('#freeze').click(nodevote.ui.handlers['freeze'].click);
});      
