var serverless = require("serverless-http");
var hbs = require("hbs");
var exphbs  = require('express-handlebars');
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var reload = require('reload');
var http = require('http');
var app = express();
var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);

var hbs = exphbs.create({
  defaultLayout: 'main', 
  extname: '.hbs', 
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  pagesDir: path.join(__dirname, 'views/pages')
});

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.engine('.hbs', hbs.engine); 

// Serving Static Files
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/img'))

// Routes
app.get("/", function(req, res) {
  res.status(200).render("index", {
    title: 'Home'
  });
});

app.get("/about", function(req, res) {
  res.status(200).render("pages/about", {
    title: 'About'
  });
});

app.get("/services", function(req, res) {
  res.status(200).render("pages/services", {
    title: 'Services'
  });
});

app.get("/contact", function(req, res) {
  res.status(200).render("pages/contact", {
    title: 'Services'
  });
});

reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README
 
  // Reload started, start web server
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'));
  });
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err);
});

module.exports.gallery = serverless(app);