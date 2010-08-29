nodevote = {};
nodevote.ui = {};
nodevote.ui.handlers = {};

$(document).ready(function() {
  io.setPath('/voting-room/' + nodevote.voting_room_id);
  socket_client = new io.Socket(null, {port: 80});
  socket_client.on('message', function(options) {
    console.log(options);
    options = JSON.parse(options);
  });
  nodevote.ui.handlers['freeze'] = {
    'click': function() {
    }
  }
  socket_client.connect();
  socket_client.send({'voting_room_id': nodevote.voting_room_id});
  $('#freeze').click(nodevote.ui.handlers['freeze'].click);
});      
