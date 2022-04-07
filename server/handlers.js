const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

const postComment = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	console.log(req.body);
	let newReq = { ...req.body, _id: uuidv4() };
	try {
		await client.connect();
		const db = client.db("Satellite-Comments");
		await db.collection("comments").insertOne(newReq);
		res.status(201).json({
			status: 201,
			message: "This is the server response.",
			data: newReq,
		});
	} catch (err) {
		console.log(err.stack);
		res
			.status(500)
			.json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};

const getComments = async (req, res) => {
	const client = new MongoClient(MONGO_URI, options);
	console.log(req.params);
	const { id } = req.params;
	// console.log(typeof id);
	try {
		await client.connect();
		const db = client.db("Satellite-Comments");
		// let query = { sat: id };
		let comments = await db
			.collection("comments")
			.find({ sat: Number(id) })
			.toArray();
		// satelliteComments = comments.filter((el) => {
		// 	return el.sat === Number(id);
		// });
		// console.log(satelliteComments);
		res.status(200).json({
			status: 200,
			message: "This is the server response.",
			data: comments,
		});
	} catch (err) {
		console.log(err.stack);
		res
			.status(500)
			.json({ status: 500, data: req.body, message: err.message });
	}
	client.close();
};

module.exports = { postComment, getComments };
