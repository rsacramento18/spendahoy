"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = process.env.port || 8000;
app.use('/api/check', function (request, response) {
    response.status(200).json('something');
});
app.listen(port, function () {
    console.log("App is running at ".concat(port));
});
