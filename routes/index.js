var express = require('express');
var socketio = require('socket.io');

var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

module.exports = function(io) {
  router.get('/', function (req, res) {
    var tweets = tweetBank.list();

    res.render('index', {title: 'Twitter.js', tweets: tweets, showForm:true});
  });

  router.get('/users/:name', function (req, res) {
    var name = req.params.name;
    var tweets = tweetBank.list();
    var list = tweetBank.find({name: name});
    res.render('index', {title: 'Twitter.js - Posts by '+name, tweets: list, showForm:true, name: name});
  });

  //challenge: add a single-tweet route

  router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
  });
  
  return router;
}
