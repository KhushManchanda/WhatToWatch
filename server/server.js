const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getWeathertoronto", (req, res) => {
	request(
		"https://api.themoviedb.org/3/discover/movie?api_key=2e890be7ebc8e9902eada09fa3096b68&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=Action&with_watch_monetization_types=flatrate",
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var parsedBody = JSON.parse(body);
				console.log(parsedBody);
				res.send(parsedBody);
			}
		}
	);
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
