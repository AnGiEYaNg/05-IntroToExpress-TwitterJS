var express = require('express');
var morgan = require('morgan')

var app = express();

//dev format: ":method :url :status :response-time ms - :res[content-length]"
app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/news', function (req, res) {
  res.send('This is news')
})

var server = app.listen(3000, function() {
  console.log('listening')
})
