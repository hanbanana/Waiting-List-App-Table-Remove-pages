var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var PORT = process.env.PORT || 4001;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


// html routes
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/reserve.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/home.html"));
});


// data routes
var tableData = require("./data/tableData");
var waitListData = require("./data/waitinglistData");

app.get("/api/tables", function(req, res) {
    res.json(tableData);
  });

  app.get("/api/waitlist", function(req, res) {
    res.json(waitListData);
  });

  app.post("/api/tables", function(req, res) {
    tableData.push(req.body);
    // if (tableData.length < 5) {
    //   tableData.push(req.body);
    //   res.json(true);
    // }
    // else {
    //   waitListData.push(req.body);
    //   res.json(false);
    // }
  });

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    tableData = [];
    waitListData = [];

    console.log(tableData);
  });



app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});