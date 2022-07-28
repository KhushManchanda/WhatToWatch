import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import MovieCard from "./components/MovieCard";
import Genre from "./components/Genres";

function App() {
	const API_URL = "https://api.themoviedb.org/3";
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	
	const [searchGenre, setSearchGenre] = useState("");
	const [searchGenretwo, setSearchGenretwo] = useState("");

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

	const fetchMovieWithGenre = async (searchGenre, searchGenretwo) => {
		const type = searchGenre ? "discover" : "discover";
		const {
			data: { results },
		} = await axios.get(`${API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				with_genres: searchGenre + ',' + searchGenretwo,
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
		
		setGenres(genres);
		// console.log(genres);
	};

	

	useEffect(() => {
		fetchMovies();
		fetchGenres();
		

	}, []);

	const renderMovies = () =>
		movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
	

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovieWithGenre(searchGenre, searchGenretwo);
	};
	
	function CreateGenre(props) {
		return <Genre key={props.id} name={props.name} id={props.id} />;
	}
	return (
		<div className="App">
			<header>
				<h1>Movie Search App</h1>
				<form onSubmit={searchMovies}>
					{/* <input type="text" onChange={(e) => setSearchGenre(e.target.value)} /> */}
					<select onChange={(e) => setSearchGenre(e.target.value)} name="firstGenre">{genres.map(CreateGenre)}</select>
					<select onChange={(e) => setSearchGenretwo(e.target.value)} name="secondGenre">{genres.map(CreateGenre)}</select>
					<button type="submit">Search!</button>
				</form>
			</header>

			<div className="container">{renderMovies()}</div>
		</div>
	);
}

export default App;
