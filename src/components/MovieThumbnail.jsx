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
				/></div>
			) : null}

			<h5 className="movie-title">{movie.title}</h5>
			{isOpen && (
				<MovieCard
					content={
							
							<div className="d-flex flex-row ">
								<div className="p-2">
									<img className="poster-image" src={`${IMAGE_PATH}${movie.poster_path}`} alt="" />
								</div>
								<div className="p-2">
									<div className="d-flex flex-column align-items-left">
										<h1 className="p-2 movie-name">{movie.title}</h1>
										<h6 className="p-2 rating"> Rating: {movie.vote_average}</h6>
										<p className="p-2 overview">{movie.overview}</p>
									</div>
								</div>
							</div>

						
					}
					handleClose={togglePopup}
				/>
			)}
		</div>
	);
};

export default MovieThumbnail;
