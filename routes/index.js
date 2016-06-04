var express = require('express');
var router = express.Router();
var Link = require('./../models/link');
var mongoose = require('mongoose');

function isValidUrl(t)
{
  return t.match(/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i)
}

router.get('/', function(req, res) {
  res.render('index', { title: 'FreeCodeCamp Challenge: URL Shortener Microservice' });
});

router.get('/new/:url', function(req, res) {
  if (isValidUrl(req.params.url)) {
    /*
    var newLink = new Link({
      link: req.body.email,
      shortened: req.body.password
    });
    */
    console.log(req.params.url)
  } else {
    res.send({ "error": "invalid url" });
  }
});

router.get('/:short', function(req, res) {
  
  
});

module.exports = router;
