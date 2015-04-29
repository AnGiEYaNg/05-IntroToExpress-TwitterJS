var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var html=require('html');

var app = express();

//dev format: ":method :url :status :response-time ms - :res[content-length]"
app.use(morgan('dev'))

app.engine('swig', require('swig').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// app.set('view cache', false);
swig.setDefaults({ cache: false });

var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

app.get('/', function (req, res) {
  res.render( 'index', {title: 'Hall of Fame', people: people} );
})

app.get('/news', function (req, res) {
  res.send('This is news')
})

var server = app.listen(3000, function() {
  console.log('listening')
})
