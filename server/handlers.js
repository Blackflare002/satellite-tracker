const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../.env" });
const { MONGO_URI } = process.env;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");

// let users = null;
const getUsers = async (req, res) => {
	const client = new MongoClient(
		MONGO_URI,
		options
	);
	try {
		await client.connect();
		const db = client.db("Satellite-Comments");
		let users = await db
			.collection("users")
			.find()
			.toArray();
		res.status(200).json({
			status: 200,
			message: "This is the server response.",
			data: users,
		});
	} catch (err) {
		console.log(err.stack);
		res.status(500).json({
			status: 500,
			data: req.body,
			message: err.message,
		});
	}
	client.close();
};
// console.log(users);

const signIn = async (req, res) => {
	console.log("Sent, handlers 42: ", req.body);
	const client = new MongoClient(
		MONGO_URI,
		options
	);
	await client.connect();
	const db = client.db("Satellite-Comments");
	let users = await db
		.collection("users")
		.find()
		.toArray();
	let currentUser = null;
	users.forEach((el) => {
		if (
			req.body.user.toLowerCase() ===
				el.name.toLowerCase() &&
			req.body.password.toLowerCase() ===
				el.password.toLowerCase()
		) {
			currentUser = el;
		}
	});
	if (currentUser) {
		res.status(201).json({
			status: 201,
			message: "This is the server response.",
			data: currentUser,
		});
	} else {
		res.status(404).json({
			status: 404,
			message:
				"There was a problem with the username or password.",
		});
	}
	client.close();
};

const postComment = async (req, res) => {
	const dt = DateTime.local();
	const client = new MongoClient(
		MONGO_URI,
		options
	);
	console.log(req.body);
	let newReq = {
		...req.body,
		_id: uuidv4(),
		date: dt,
	};
	try {
		await client.connect();
		const db = client.db("Satellite-Comments");
		await db
			.collection("comments")
			.insertOne(newReq);
		res.status(201).json({
			status: 201,
			message: "This is the server response.",
			data: newReq,
		});
	} catch (err) {
		console.log(err.stack);
		res.status(500).json({
			status: 500,
			data: req.body,
			message: err.message,
		});
	}
	client.close();
};

const getComments = async (req, res) => {
	const client = new MongoClient(
		MONGO_URI,
		options
	);
	console.log(req.params);
	const { id } = req.params;
	// console.log(typeof id);
	try {
		await client.connect();
		const db = client.db("Satellite-Comments");
		let comments = await db
			.collection("comments")
			.find({ sat: Number(id) })
			.sort({ date: -1 })
			.toArray();
		res.status(200).json({
			status: 200,
			message: "This is the server response.",
			data: comments,
		});
	} catch (err) {
		console.log(err.stack);
		res.status(500).json({
			status: 500,
			data: req.body,
			message: err.message,
		});
	}
	client.close();
};

module.exports = {
	postComment,
	getComments,
	getUsers,
	signIn,
};
