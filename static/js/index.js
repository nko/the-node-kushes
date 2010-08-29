nodevote = {'ui': {'handlers': {}}};
nodevote.ui.handlers['create'] = {
  'click': function() {
    console.log('foo');
    $('#voting-room-form').submit();
  }  
}
$(document).ready(function() {
  $('#create').click(nodevote.ui.handlers['create'].click);
});      
