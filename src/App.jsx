import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/App.css";
import MovieThumbnail from "./components/MovieThumbnail.jsx";
import Genre from "./components/Genres.jsx";


function App() {
	const API_URL = "https://api.themoviedb.org/3";
	const [movies, setMovies] = useState([]);
	const [genres, setGenres] = useState([]);
	const [pageNumber, setpageNumber] = useState(1);
	

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

	const fetchMovieWithGenre = async (searchGenre, searchSecondGenre, pageNumber) => {
		const type = searchGenre ? "discover" : "discover";
		const {
			data: { results },
		} = await axios.get(`${API_URL}/${type}/movie`, {
			params: {
				api_key: process.env.REACT_APP_MOVIE_API_KEY,
				with_genres: searchGenre + "," + searchSecondGenre,
				page: pageNumber,
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
		
	}, []);

	const renderMovies = () =>
		movies.map((movie) => <MovieThumbnail key={movie.id} movie={movie} />);

	const searchMovies = (e) => {
		e.preventDefault();
		fetchMovieWithGenre(searchGenre, searchSecondGenre, pageNumber);
	};

	

	function CreateGenre(props) {
		return <Genre key={props.id} name={props.name} id={props.id} />;
	}
	

	const nextButton = () => {
		
		
		setpageNumber(pageNumber+1)
		console.log(pageNumber);
		fetchMovieWithGenre(searchGenre, searchSecondGenre, pageNumber);
		
		
		
	  };

	return (
		<div className="App">
			<header>
				
			

					<h1 class="navbar navbar-light bg-dark">What to watch</h1>
					
					
					
				<form className="input-class" onSubmit={searchMovies}>
					<div >
					<select class="form-select form-select-lg mb-3"
						onChange={(e) => setSearchGenre(e.target.value)}
						name="firstGenre"
					>
						{genres.map(CreateGenre)}
					</select>
					</div>
					<div >
					<select id="month" class="form-select form-select-lg mb-3"
						onChange={(e) => setSearchSecondGenre(e.target.value)}
						name="secondGenre"
					>
							{genres.map(CreateGenre)}
					</select>
					</div>
					
					<button className="btn-lg mb-3 btn-primary" type="submit">Search!</button>
					
				</form>
			</header>

			<div className="container">{renderMovies()}</div>
			<button    
				type="button" onClick={nextButton}>Click Me!</button>

		</div>
	);
}

export default App;
