const express = require("express");
var app = express();
const path = require("path");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const connString =
    "postgres://fdqsjkrhiyzoxn:0547fb5f7f821ec43144dcfc5bc10d51b0fed0c9a037ba7b9faa12f24f333195@ec2-3-231-16-122.compute-1.amazonaws.com:5432/d1f54anjp3c431";
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || connString,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect();

var router = express.Router();

router.use(function(req, res, next) {
    console.log("/" + req.method);
    next();
});
const Path = __dirname + "/views/";

app.get("/dataurl", function(req, res) {
    var test = process.env.DATABASE_URL || "NO URI Found";
    res.send(test);
});

app.get("/", function(req, res) {
    res.sendFile(Path + "index.html");
});

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);
app.use("*", function(req, res) {
    res.sendFile(path + "404.html");
});

app.listen(PORT, function() {
    console.log(`Listening on ${PORT}`);
});