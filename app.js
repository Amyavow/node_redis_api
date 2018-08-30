const express = require("express");
const app = express();
const bps = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const redis = require("redis");
const client = redis.createClient();

client.on("connect", function() {
	console.log("redis client connected");
});

client.on("error", function(err) {
	console.log("something went wrong " + err);
});

app.set("port", process.env.PORT || 3000);

app.use(bps.json());
app.use(bps.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(cors());
const router = require("./v1/router/router.js");

app.use("/api/v1", router);

app.use(function(req, res) {
	res.status(404);
});

app.use(function(err, req, res, next) {
	res.status(500).json(err.message);
	next();
});

app.listen(app.get("port"), err => {
	if (err) {
		return console.log(err);
	}

	console.log("server....started");
});
