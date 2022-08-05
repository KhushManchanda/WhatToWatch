import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/App.css";
import MovieThumbnail from "./components/MovieThumbnail.jsx";
import Genre from "./components/Genres.jsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
				<nav class="navbar navbar-light bg-dark">
					<a class="navbar-brand" href="#">
						<img
							src={require("./Image/icon.png")}
							width="30"
							height="30"
							alt="What to Watch"
						/>
						What to watch
					</a>
				</nav>

				<form className="input-class" onSubmit={searchMovies}>
					<div>
						<select
							class="form-select form-select-lg mb-3"
							onChange={(e) => setSearchGenre(e.target.value)}
							name="firstGenre"
						>
							{genres.map(CreateGenre)}
						</select>
					</div>
					<div>
						<select
							id="month"
							class="form-select form-select-lg mb-3"
							onChange={(e) => setSearchSecondGenre(e.target.value)}
							name="secondGenre"
						>
							{genres.map(CreateGenre)}
						</select>
					</div>

					<button
						type="submit"
						className="btn btn-primary mb-3"
						onClick={() => {
							setPage(1);
						}}
					>
						Search
					</button>
				</form>
			</header>

			<div className="container">{renderMovies()}</div>
			<br />

			<form onSubmit={searchMovies}>
				<div className="d-flex flex-row justify-content-center align-items-center">
					<button
						className="btn page-button p-2"
						onClick={() => {
							setPage(page === 1 ? totalPages : page - 1);
						}}
					>
						<ArrowBackIosIcon />
					</button>

					<p className="page-count p-2">
						{page} /{totalPages}
					</p>
					<button
						className="btn page-button p-2"
						type=""
						onClick={() => {
							setPage(page === totalPages ? 1 : page + 1);
						}}
					>
						<ArrowForwardIosIcon />
					</button>
				</div>
			</form>
			<br />
			<br />
			<br />
		</div>
	);
}

export default App;
