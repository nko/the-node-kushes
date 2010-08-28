
app = express.createServer();

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyDecoder());
  app.use(app.router);
  app.set('views', __dirname + '/client');
  app.use(express.staticProvider(__dirname + '/public'));
});

// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });
// 
// app.configure('production', function(){
//   app.use(express.errorHandler());
// });

app.register('.html', require('ejs'));
app.set('view options', {'layout': false});

app.get('/', function(req, res){
  res.render('index.html', {'locals': {'times': 10}});
});

app.get('/surface', function(req, res){
  res.render('surface.html', {'locals': {'url': 'google.com'}});
});

app.listen(3000);