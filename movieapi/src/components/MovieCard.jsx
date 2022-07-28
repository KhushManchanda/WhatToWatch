import React from "react";

const MovieCard = ({movie}) => {
    const IMAGE_PATH = 'https://image.tmdb.org/t/p/w500' 

    function openWindow(props) {
        console.log(props);

    }
    return(
        <div className={"movie-card"}>
            {movie.poster_path ? <img onClick={openWindow(movie.title)}  className={"movie-cover"} src={`${IMAGE_PATH}${movie.poster_path}`} alt=""/>
            :null
    }

            <h5>{movie.title}</h5>

        </div>
    );
};

export default MovieCard;