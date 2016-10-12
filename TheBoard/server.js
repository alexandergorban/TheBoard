var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");

// Setup the View Engine
app.set("view engine", "vash");

// Map the routes
controllers.init(app);

app.get("/api/users",
    function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({ name: "Alex", isValid: true, group: "Admin" });
});

var server = http.createServer(app);

server.listen(3000);
