import React from "react";

// {imdbID: 'tt1375666', Title: 'Inception', Year: '2010', Poster
function WatcheMovie({ movie, onDeletWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeletWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default WatcheMovie;
