var express = require('express');
var router = express.Router();
var Link = require('./../models/link');
var mongoose = require('mongoose');

function isValidUrl(str)
{
  var pattern = /([^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
  return pattern.test(str);
}

function getRnd() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 4; i++ ) 
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

router.get('/new/:url*', function(req, res) {
  var url = req.originalUrl.replace(/\/new\//, "")
  if (isValidUrl(url) && url.startsWith('http')) {
    var newLink = new Link({
      link: url,
      shortened: getRnd()
    });
    newLink.save(function(err) {
      if (err) throw err;
    });
    res.send({ "original_url":url, "short_url":"https://fcc-url-short-microservice-nr.herokuapp.com/" + newLink.shortened });
  } else {
    res.send({ "error": "invalid url. must start with http or https." });
  }
});

router.get('/:short', function(req, res) {
  if (req.params.short != 'favicon.ico') {    
    Link.findOne({ 'shortened': req.params.short }, function (err, link) {
      if (err) return handleError(err);
      if (link) {
        res.redirect(link.link);
      } else {
        res.render('index', { title: 'FreeCodeCamp Challenge: URL Shortener Microservice' });
      }
    }) 
  } 
});

router.get('/', function(req, res) {
    res.render('index', { title: 'FreeCodeCamp Challenge: URL Shortener Microservice' });

});

module.exports = router;
