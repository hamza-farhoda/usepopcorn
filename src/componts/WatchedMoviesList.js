import React from "react";
import WatcheMovie from "./WatcheMovie";

function WatchedMoviesList({ watched, onDeletWatched }) {
  console.log(watched);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatcheMovie
          movie={movie}
          key={movie.imdbID}
          onDeletWatched={onDeletWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
