import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/App.css";
import MovieThumbnail from "./components/MovieThumbnail.jsx";
import Genre from "./components/Genres.jsx";

function App() {
	const API_URL = "https://api.themoviedb.org/3";
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState();

	const [searchGenre, setSearchGenre] = useState("");
	const [searchSecondGenre, setSearchSecondGenre] = useState("");

	const fetchMovies = async (searchMovie) => {
		const type = searchMovie ? "search" : "discover";
		const {
			data: { results },
			data: { total_pages },
		} = await axios.get(`${API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				query: searchMovie,
				page: page,
			},
		});

		setMovies(results);
		setTotalPages(total_pages);
	};

	const fetchMovieWithGenre = async (searchGenre, searchSecondGenre) => {
		const type = searchGenre ? "discover" : "discover";
		const {
			data: { results },
			data: { total_pages },
		} = await axios.get(`${API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				with_genres: searchGenre + "," + searchSecondGenre,
				page: page,
			},
		});

		setMovies(results);
		setTotalPages(total_pages);
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
	}, []);

	const renderMovies = () =>
		movies.map((movie) => <MovieThumbnail key={movie.id} movie={movie} />);

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovieWithGenre(searchGenre, searchSecondGenre);
	};

	function CreateGenre(props) {
		return <Genre key={props.id} name={props.name} id={props.id} />;
	}
	return (
		<div className="App">
			<header>
				<h1 className="title">Movie Search App</h1>
				<form className="input-class" onSubmit={searchMovies}>
					<select
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
					</select>
					<button
						type="submit"
						onClick={() => {
							setPage(1);
						}}
					>
						Search
					</button>
				</form>
			</header>

			<div className="container">{renderMovies()}</div>
			<form onSubmit={searchMovies}>
				<button
					onClick={() => {
						setPage(page === 1 ? { totalPages } : page - 1);
					}}
				>
					previous
				</button>

				<button
					type=""
					onClick={() => {
						setPage(page === totalPages ? 1 : page + 1);
					}}
				>
					Next
				</button>
				<p>
					{page} /{totalPages}
				</p>
			</form>
		</div>
	);
}

export default App;
