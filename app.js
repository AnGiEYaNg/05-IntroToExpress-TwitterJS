var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var _ = require('underscore');
// var routes = require('./routes/')
var router = express.Router();
var tweetBank = require('./tweetBank') //****
var bodyParser = require('body-parser')

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
app.get('/', function (req, res) {
  var tweets = tweetBank.list();

  res.render('index', {title: 'Twitter.js', tweets: tweets, showForm:true});
});

app.get('/users/:name', function (req, res) {
  var name = req.params.name;
  var tweets = tweetBank.list();
  var list = tweetBank.find({name: name});
  res.render('index', {title: 'Twitter.js - Posts by '+name, tweets: list, showForm:true, name: name});
});

//challenge: add a single-tweet route

app.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

// app.post('/users/:name', function(req, res) {
//   var name = req.params.name;
//   var text = req.body.text;
//   tweetBank.add(name, text);
//   res.redirect('/users/'+name);
// });

module.exports = router;

var server = app.listen(3000, function() {
  console.log('listening')
})
