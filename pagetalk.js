
app = express.createServer();

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyDecoder());
  app.use(app.router);
  app.set('views', __dirname + '/client');
  app.use(express.staticProvider(__dirname + '/static'));
});

// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });
// 
// app.configure('production', function(){
//   app.use(express.errorHandler());
// });

poorsman_mongodb = {
  'voting_rooms': {}
}

create_random_id = function(len) {
  var id = '', i = Math.ceil(len/2);
  with(Math) while(i--) 
    id += (floor(random()*(256-15))+15).toString(16);
  return id.substr(0, len);
}

app.register('.html', require('ejs'));
app.set('view options', {'layout': false});

app.get('/', function(req, res) {
  res.render('index.html', {'locals': {'times': 10}});
});

app.get('/voting-room/:id', function(req, res) {
  res.render('voting-room.html', {'locals': {'voting_room_id': req.params.id}});
});

app.post('/voting-room', function(req, res) {
  var voting_room_id = create_random_id();
  poorsman_mongodb.voting_rooms[voting_room_id] = {};
  res.redirect('/voting-room/' + voting_room_id);
});

app.listen(80);