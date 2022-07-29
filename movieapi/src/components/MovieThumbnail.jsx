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

			<h5>{movie.title}</h5>
			{isOpen && (
				<MovieCard
					content={
						<>
							<img src={`${IMAGE_PATH}${movie.backdrop_path}`} alt="" />
							<h1 className="hello">{movie.title}</h1>
							<h6>Release Date: {movie.release_date}</h6>
							<p>{movie.overview}</p>
						</>
					}
					handleClose={togglePopup}
				/>
			)}
		</div>
	);
};

export default MovieThumbnail;
