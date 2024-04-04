import React, { useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import useKey from "./../useKey";
const KEY = "4c977774";

function MovieDetails({ selectedId, onCloseMovie, onAddwatched, watched }) {
  const [movie, setmovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const countRef = useRef(0);
  let count = 0;

  useEffect(
    function () {
      if (userRating) {
        countRef.current++;
      }
      if (userRating) {
        count++;
      }
    },
    [userRating, count]
  );
  console.log(countRef.current);
  // console.log(isWatched);
  const watchedUserrating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  // const g = {};

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating: imdbRating,
  } = movie;

  // if (imdbRating > 8) [isTop, setIsTop] = useState(true);
  // if (imdbRating > 8) {
  //   return <p> Greatest ever!</p>;
  // }
  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);
  // useEffect(function () {
  //   setIsTop(imdbRating > 8);
  // });
  // const [avgRating, setAvgrating] = useState(0);
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
      count,
    };
    onAddwatched(newWatchedMovie);
    onCloseMovie();
    // setAvgrating(Number(imdbRating));
    // setAvgrating((avgRating) => (avgRating + userRating) / 2);
  }
  useKey("Escape", onCloseMovie);
  // useEffect(
  //   function () {
  //     function callback(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //         console.log("console");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);
  //     return function () {
  //       document.removeEventListener("keydown", callback);
  //     };
  //   },
  //   [onCloseMovie]
  // );

  useEffect(
    function () {
      setIsLoading(true);
      async function getMovieDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        console.log(data);
        setmovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "userPopcorn";
        console.log("g");
      };
    },

    [title]
  );
  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => onCloseMovie()}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  {" "}
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      {" "}
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You Rated with Movie {watchedUserrating}
                  <span>⭐</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
