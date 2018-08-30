const redis = require("redis");
const client = redis.createClient();

exports.createStudent = function(req, res, next) {
	console.log(req.body);
	let id = req.body.id,
		name = req.body.name,
		score = req.body.score;

	client.hmset(id, ["name", name, "score", score], function(err, reply) {
		if (err) {
			return next(new Error(err));
		} else {
			res.status(200).json(reply);
		}
	});
};

exports.getStudent = function(req, res, next) {
	let id = req.params.id;

	client.hgetall(id, function(err, reply) {
		if (err) {
			return next(new Error(err));
		} else {
			res.status(200).json(reply);
		}
	});
};

exports.updateStudent = function(req, res, next) {
	let id = req.params.id;
	result = [];
	for (var i in req.body) {
		result.push(i, req.body[i]);
	}

	client.hmset(id, result, function(err, reply) {
		if (err) {
			return next(new Error(err));
		} else {
			res.status(200).json(reply);
		}
	});
};

exports.deleteStudent = function(req, res, next) {
	let id = req.params.id;

	client.del(id, function(err, reply) {
		if (err) {
			return next(new Error(err));
		} else {
			res.status(200).json(reply);
		}
	});
};
