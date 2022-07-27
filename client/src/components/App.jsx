import React, { useEffect, useState } from "react";

function App() {
	const [backendData, setBackendData] = useState([{}]);

	useEffect(() => {
		fetch("/api")
			.then((response) => response.json())
			.then((data) => {
				setBackendData(data);
			});
	}, []);

	return (
		<div>
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
