nodevote = {'ui': {'handlers': {}}};
nodevote.ui.handlers['create'] = {
  'click': function() {
    console.log('foo');
    $('#voting-room-form').submit();
  }  
}
nodevote.ui.handlers['add-bar'] = {
  'click': function() {
    var color = nodevote.ui.next_random_color();
    var bar = nodevote.ui.create_bar(60, color.back);
    $('#add-bar').before(bar);
    bar.find('input').css('color', '#' + color.fore);
  }
};
nodevote.ui.colors = [
  ['295ced', '082065'],
  ['64d004', '142901'],
  ['b55922', '261307'],
  ['feeda7', 'f8c803'],
  ['aba1ec', '3b26bd'],
  ['44b4ff', '005c99'],
  ['31764f', '000'],
  ['68e37f', '19882e'],
  ['cbfcfb', '2bf2ef'],
  ['aaf36c', '55a80e'],
  ['373c41', '000']
];
(function() {
  var _colors = nodevote.ui.colors;
  nodevote.ui.colors = [];
  for(var i = 0, len = _colors.length; i < len; i++) {
    nodevote.ui.colors[i] = {'back': _colors[i][0], 'fore': _colors[i][1]};
  }
})();
nodevote.ui.selected_colors = {};
nodevote.ui.next_random_color = function() {
  var len = nodevote.ui.colors.length;
  var i = Math.floor(Math.random()*len);
  while(nodevote.ui.selected_colors[nodevote.ui.colors[i].back]) {
    i = Math.floor(Math.random()*len);
  }
  var selected_color = nodevote.ui.colors[i];
  nodevote.ui.selected_colors[selected_color.back] = selected_color;
  return selected_color;
}
nodevote.ui.create_bar = function(height, color) {
  return $(
    '<div class="bar" style="height: ' + height + 'px; background-color: #' + color + ';">' +
    '<input type="input"></input>' +
    '</div>'
  );
}
$(document).ready(function() {
  $('#add-bar').click(nodevote.ui.handlers['add-bar'].click);
  $('#create').click(nodevote.ui.handlers['create'].click);
});      
