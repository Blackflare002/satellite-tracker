const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
	// res.send("Hello World!");
	res
		.status(200)
		.json({ status: 200, message: "This is the server response" });
});

app.listen(port, () => {
	console.info(`Listening on port ${port}`);
});
