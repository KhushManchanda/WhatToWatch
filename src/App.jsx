import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/App.css";
import MovieThumbnail from "./components/MovieThumbnail.jsx";
import Genre from "./components/Genres.jsx";

function App() {
	const API_URL = "https://api.themoviedb.org/3";
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [actor, setActor] = useState("");

	const [searchGenre, setSearchGenre] = useState("");
	const [searchSecondGenre, setSearchSecondGenre] = useState("");

	const fetchMovies = async (searchMovie) => {
		const type = searchMovie ? "search" : "discover";
		const {
			data: { results },
		} = await axios.get(`${API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				query: searchMovie,
			},
		});

		setMovies(results);
	};

	const fetchMovieWithGenre = async (searchGenre, searchSecondGenre) => {
		const type = searchGenre ? "discover" : "discover";
		const {
			data: { results },
		} = await axios.get(`${API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				with_genres: searchGenre + "," + searchSecondGenre,
			},
		});

		setMovies(results);
	};

	const fetchActorId = async (actor) => {
		// https://api.themoviedb.org/3/search/person?api_key=2e890be7ebc8e9902eada09fa3096b68&query=Anne%20Hathaway
	
		const {
			data: { results },
		} = await axios.get(`${API_URL}/search/person`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				query: actor,
			},
		});
		

		setActor(results);
		return results[0].id;
	};

	const fetchActorMovie = async (actorId) => {
	
		// https://api.themoviedb.org/3/person/1813/movie_credits?api_key=2e890be7ebc8e9902eada09fa3096b68
		const {

			data: { results },
		} = await axios.get(`${API_URL}/person/${actorId}/movie_credits`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
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
	};

	useEffect(() => {
		fetchMovies();
		fetchGenres();
		// fetchActorId();
	}, []);

	const renderMovies = () =>
		movies.map((movie) => <MovieThumbnail key={movie.id} movie={movie} />);

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovieWithGenre(searchGenre, searchSecondGenre);
		const actorId = fetchActorId(actor);
		console.log(actorId);
		fetchActorMovie(actorId);

	};

	function CreateGenre(props) {
		return <Genre key={props.id} name={props.name} id={props.id} />;
	}

	return (
		<div className="App">
			<header>
				<h1 className="title">Movie Search App</h1>
				<form className="input-class" onSubmit={searchMovies}>
					{/* <select
						onChange={(e) => setSearchGenre(e.target.value)}
						name="firstGenre"
					>
						{genres.map(CreateGenre)}
					</select>
					<select
						onChange={(e) => setSearchSecondGenre(e.target.value)}
						name="secondGenre"
					>
						{genres.map(CreateGenre)}
					</select> */}
					<input onChange={(e) => setActor(e.target.value)}></input>
					<button type="submit">Search!</button>
				</form>
			</header>

			<div className="container">{renderMovies()}</div>
		</div>
	);
}

export default App;
