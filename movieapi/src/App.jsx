import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/MovieCard";
import Genre from "./components/Genres";

function App() {
	const API_URL = "https://api.themoviedb.org/3";
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [searchKey, setSearchKey] = useState("");

	const fetchMovies = async (searchKey) => {
		const type = searchKey ? "search" : "discover";
		const {
			data: { results },
		} = await axios.get(`${API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				query: searchKey,
			},
		});

		setMovies(results);
	};

	const fetchGenres = async () => {
		const {
			data: { genres },
		} = await axios.get(`${API_URL}/genre/movie/list`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
			},
		});
		console.log("genres", genres[0].name);
		setGenres(genres);
		// console.log(genres);
	};

	// const fetchThatGenre = async(searchGenre) => {
	//   const {data: {results}} = await axios.get(`${API_URL}/discover/movie/`, {
	//     params: {
	//       api_key: process.env.REACT_APP_MOVIE_API_KEY,
	//       with_genres: searchGenre

	//     }
	//   })
	//   console.log('results', genres[0].name)
	//   setGenres(results)
	// }

	useEffect(() => {
		fetchMovies();
		fetchGenres();
	}, []);

	const renderMovies = () =>
		movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovies(searchKey);
	};
	function CreateGenre(props) {
		return <Genre name={props.name} id={props.id} />;
	}
	return (
		<div className="App">
			<header>
				<h1>Movie Search App</h1>
				<form onSubmit={searchMovies}>
					<input type="text" onChange={(e) => setSearchKey(e.target.value)} />
					<select name="firstGenre">{genres.map(CreateGenre)}</select>
					<button type="submit">Search!</button>
				</form>
			</header>

			<div className="container">{renderMovies()}</div>
		</div>
	);
}

export default App;
