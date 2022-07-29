import React, { useState } from "react";
import MovieCard from "./MovieCard.jsx";

const MovieThumbnail = ({ movie }) => {
	const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

	const [isOpen, setIsOpen] = useState(false);

	const togglePopup = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={"movie-card"}>
			{movie.poster_path ? (
				<img
					onClick={togglePopup}
					className={"movie-cover"}
					src={`${IMAGE_PATH}${movie.poster_path}`}
					alt=""
				/>
			) : null}

			<h5 className="movie-title">{movie.title}</h5>
			{isOpen && (
				<MovieCard
					content={
						<>	<div class="containerr">
							<img class="movie-backdrop" src={`${IMAGE_PATH}${movie.backdrop_path}`} alt="" />

							<h1 className="hello centeredd">{movie.title}</h1>
							<h6 className="centeredd"> Release Date: {movie.release_date}</h6>
							<p className="centeredd">{movie.overview}</p>
							</div>
						</>
					}
					handleClose={togglePopup}
				/>
			)}
		</div>
	);
};

export default MovieThumbnail;
