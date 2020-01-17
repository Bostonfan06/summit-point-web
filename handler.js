var serverless = require("serverless-http");
var hbs = require("hbs");
var exphbs  = require('express-handlebars');
var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var app = express();

var port = 8080;

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
app.use(express.static(__dirname + '/public'));

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

app.listen(port, () => console.log('Listening on port ${port}!'));

module.exports.gallery = serverless(app);