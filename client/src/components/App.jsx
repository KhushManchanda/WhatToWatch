import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function App() {
	const [movie, setMovie] = useState("NOT YET GIVEN");

	useEffect(() => {
		axios.get("/getWeathertoronto").then(function (response) {
			setMovie(response.data.results[10].title);
		});
	}, []);

	return (
		<div>
			<h1>{movie}</h1>
			<select name="genre" id="genre-1">
				<option value="sci-fi">Sci-Fi</option>
				<option value="romance">Romance</option>
				<option value="adventure">Adventure</option>
				<option value="thriller">Thriller</option>
			</select>
			<select name="genre" id="genre-2">
				<option value="sci-fi">Sci-Fi</option>
				<option value="romance">Romance</option>
				<option value="adventure">Adventure</option>
				<option value="thriller">Thriller</option>
			</select>
			<button>Search</button>
		</div>
	);
}

export default App;
