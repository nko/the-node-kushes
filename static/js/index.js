nodevote = {'ui': {'handlers': {}}};
nodevote.ui.handlers['create'] = {
  'click': function() {
    $('#voting-room-form').submit();
  }  
}
$(document).ready(function() {
  $('#create').click(nodevote.ui.handlers['create'].click);
});      
