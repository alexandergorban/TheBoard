﻿var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");
var cookieParser = require("cookie-parser");

// Setup the View Engine
app.set("view engine", "vash");

// Opt into Services
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: "STheBoard" }));
app.use(flash());

// Set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Use authentication
var auth = require("./auth");
auth.init(app);

// Map the routes
controllers.init(app);

app.get("/api/users",
    function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({ name: "Alex", isValid: true, group: "Admin" });
});

app.get("/api/sql",
    function (req, res) {
    var msnodesql = require("node-sqlserver-unofficial");
    var connString = "Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=TheWorldDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=True;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
    
    msnodesql.query(connString,
            "SELECT * FROM Trips",
            function (err, results) {
        // Error Handling
        res.send(results);
    });
});

var server = http.createServer(app);

server.listen(3000);

var updater = require("./updater");
updater.init(server);