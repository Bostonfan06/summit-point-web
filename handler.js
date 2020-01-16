var serverless = require("serverless-http");
var hbs = require("hbs");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set("view engine", "hbs");

app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.status(200).render("index");
});

app.get("/about", function(req, res) {
  res.status(200).render("about");
});

app.listen(port, () => console.log('Listening on port ${port}!'));

module.exports.gallery = serverless(app);