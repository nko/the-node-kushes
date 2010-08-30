nodevote = {};
nodevote.ui = {};
nodevote.ui.handlers = {};

nodevote.ui.create_bar = function(height, color) {
  return $(
    '<div class="bar" style="height: ' + height + 'px; background-color: #' + color + ';">' +
    '</div>'
  );
}

$(document).ready(function() {
  socket_client = new io.Socket(null, {port: 80});
  socket_client.connect();
  on_message = function(options) {
    
  }
  socket_client.on('message', on_message);
  nodevote.ui.handlers['freeze'] = {
    'click': function() {
    }
  }
  socket_client.send({'voting_room_id': nodevote.voting_room_id});
  $('#freeze').click(nodevote.ui.handlers['freeze'].click);
});      
