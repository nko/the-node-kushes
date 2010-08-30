nodevote = {};
nodevote.ui = {};
nodevote.ui.handlers = {};

nodevote.ui.create_bar = function(height, color) {
  return $(
    '<div class="bar votion-option" style="height: ' + height + 'px; background-color: ' + color + ';">' +
    '</div>'
  );
}

$(document).ready(function() {
  socket_client = new io.Socket(null, {port: 80});
  socket_client.connect();
  socket_client.on('message', function(voting_room) {
    if(nodevote.ui.frozen) return;
    if(voting_room.voting_room_id != nodevote.voting_room_id) return;
    console.log(voting_room.options);
    var total_height = $(window).height()-120;
    var total_votes = 0;
    for(var option in voting_room.options) {
      total_votes += voting_room.options[option].votes;
    }
    for(var option in voting_room.options) {
      if(total_votes) {
        voting_room.options[option].votePercentage = voting_room.options[option].votes*100/total_votes;
      }
    }
    var votePercentage;
    $('#column-b > div').remove();
    for(var option in voting_room.options) {
      var height;
      votePercentage = voting_room.options[option].votePercentage;
      if(!votePercentage) {
        bar = nodevote.ui.create_bar(50, voting_room.options[option].colors.back);
        bar.attr('data-option', voting_room.options[option].title);
        bar.text(voting_room.options[option].title + " (0 votes)")
        bar.click(nodevote.ui.handlers['voting-option'].click);
      } else {
        height = votePercentage*total_height/100;
        if(height < 70) {
          height = 70;
        }
        bar = nodevote.ui.create_bar(height, voting_room.options[option].colors.back);
        bar.attr('data-option', voting_room.options[option].title);
        bar.text(voting_room.options[option].title + " (" + voting_room.options[option].votes + " votes)")
        bar.click(nodevote.ui.handlers['voting-option'].click);
      }
      bar.css('color', voting_room.options[option].colors.fore);
      $('#column-b').append(bar);
    }
  });
  nodevote.ui.handlers['voting-option'] = {
    'click': function() {
      if(nodevote.ui.frozen) return;
      var option = $(this).attr('data-option');
      socket_client.send({
        'voting_room_id': nodevote.voting_room_id,
        'pick': option
      });
      console.log('sending: ' + option);
    }
  }
  nodevote.ui.handlers['freeze'] = {
    'click': function() {
      console.log('nodevote.ui.frozen: ' + nodevote.ui.frozen);
      nodevote.ui.frozen = !nodevote.ui.frozen;
      $(this).text(nodevote.ui.frozen ? "unfreeze" : "freeze");
      if(!nodevote.ui.frozen) {
        socket_client.send({'voting_room_id': nodevote.voting_room_id});
      }
    }
  }
  $('#freeze').click(nodevote.ui.handlers['freeze'].click);
  $(window).resize(function() {
    if(nodevote.ui.resize_lock) {
      clearTimeout(nodevote.ui.resize_lock);
    }
    nodevote.ui.resize_lock = setTimeout(function() {
      socket_client.send({'voting_room_id': nodevote.voting_room_id});
    }, 300);
  });
});      
