var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var _ = require('underscore');
var router = express.Router();
var tweetBank = require('./tweetBank');
var bodyParser = require('body-parser');
var routes = require('./routes/');
var socketio = require('socket.io');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//dev format: ":method :url :status :response-time ms - :res[content-length]"
app.use(morgan('dev'))
// app.use('/', routes);
app.use(express.static(__dirname + '/public'));

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.set('view cache', false);
swig.setDefaults({ cache: false });

// var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//
// app.get('/', function (req, res) {
//   res.render( 'index', {title: 'Hall of Fame', people: people} );
// })
//
// app.get('/news', function (req, res) {
//   res.send('This is news')
// })


// app.post('/users/:name', function(req, res) {
//   var name = req.params.name;
//   var text = req.body.text;
//   tweetBank.add(name, text);
//   res.redirect('/users/'+name);
// });

// module.exports = router;

var server = app.listen(3000, function() {
  console.log('listening')
})
var io = socketio.listen(server);
app.use('/', routes(io));
io.sockets.emit('new_tweet', { tweet: 'hello'});
