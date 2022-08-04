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
				<div className="try">
					<img
						onClick={togglePopup}
						className={"movie-cover hover-effect"}
						src={`${IMAGE_PATH}${movie.poster_path}`}
						alt=""
					/>
				</div>
			) : null}

			<h5 className="movie-title">{movie.title}</h5>
			{isOpen && <MovieCard handleClose={togglePopup} id={movie.id} />}
		</div>
	);
};

export default MovieThumbnail;
