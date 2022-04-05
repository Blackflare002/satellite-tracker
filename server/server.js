const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const port = 8000;

app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());

const { handleGetSatellites } = require("./handlers");

app.get("/", (req, res) => {
	// res.send("Hello World!");
	res
		.status(200)
		.json({ status: 200, message: "This is the server response" });
});

// app.get(
// 	"https://api.spectator.earth/satellite/1/",
// 	handleGetSatellites
// );

// this is our catch all endpoint.
app.get("*", (req, res) => {
	res.status(404).json({
		status: 404,
		message: "This is obviously not what you are looking for.",
	});
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
