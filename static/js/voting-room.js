nodevote = {};
nodevote.ui = {};
nodevote.ui.handlers = {};

nodevote.ui.create_bar = function(height, color) {
  return $(
    '<div class="bar" style="height: ' + height + 'px; background-color: ' + color + ';">' +
    '</div>'
  );
}

$(document).ready(function() {
  socket_client = new io.Socket(null, {port: 80});
  socket_client.connect();
  var on_message = function(voting_room) {
    console.log(voting_room.options);
    var total_height = $(window).height()-60;
    var total_votes = 0;
    for(var option in voting_room.options) {
      total_votes += voting_room.options[option].votes;
    }
    for(var option in voting_room.options) {
      voting_room.options[option].votePercentage = voting_room.options[option].votes*100/total_votes;
    }
    var votePercentage;
    $('#column-b > div').remove();
    for(var option in voting_room.options) {
      console.log('option: ' + option);
      votePercentage = voting_room.options[option].votePercentage;
      if(votePercentage == 0) {
        bar = nodevote.ui.create_bar(30, voting_room.options[option].colors.back);
        bar.text(voting_room.options[option].title + ": 0 votes")
      } else {
        console.log('total_height*100/votePercentage: ' + total_height*100/votePercentage);
        bar = nodevote.ui.create_bar(votePercentage*100/total_height, voting_room.options[option].colors.back);
        bar.text(voting_room.options[option].title + ": " + voting_room.options[option].votes + " votes")
      }
      bar.css('color', '' + voting_room.options[option].colors.fore);
      $('#column-b').append(bar);
    }
  }
  socket_client.on('message', on_message);
  nodevote.ui.handlers['freeze'] = {
    'click': function() {
    }
  }
  $('#freeze').click(nodevote.ui.handlers['freeze'].click);
});      
