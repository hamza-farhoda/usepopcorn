import { useState, useEffect } from "react";
import NavBar from "./componts/NavBar";
import Main from "./componts/Main";
import NumResults from "./componts/NumResults";
import Search from "./componts/Search";
import Box from "./componts/Box";
// import Box from "./componts/WatchedBox";
import MovieList from "./componts/MovieList";
import WatchedSumary from "./componts/WatchedSumary";
import WatchedMoviesList from "./componts/WatchedMoviesList";
import Loader from "./componts/Loader";
import ErrorMessage from "./componts/ErrorMessage";
import MovieDetails from "./componts/MovieDetails";
import { useMovies } from "./useMovies";
import useLocalStorage from "./useLocalStorage";

const KEY = "4c977774";

export default function App() {
  const [query, setQuery] = useState("inception");

  const [selectedId, setSelectedId] = useState("tt1375666");
  const { movies, isLooding, erro } = useMovies(query);
  const [watched, setWatched] = useLocalStorage([], "watched");

  // tt1375666
  /* useEffect(function () {
    console.log("A");
  }, []);
  useEffect(function () {
    console.log("B");
  });
  console.log("C");
*/
  function handleSelectMovie(id) {
    setSelectedId((SelectedId) => (id === SelectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // console.log(watched);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      {
        <Main>
          <Box>
            {isLooding && <Loader />}
            {!isLooding && !erro && (
              <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {erro && <ErrorMessage message={erro} />}
          </Box>

          <Box>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddwatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              <>
                <WatchedSumary watched={watched} />
                <WatchedMoviesList
                  watched={watched}
                  onDeletWatched={handleDeleteWatched}
                />
              </>
            )}
          </Box>
        </Main>
      }
    </>
  );
  // function Loader() {
  //   return <p className="loader"> Loading....</p>;
  // }

  // function ErrorMessage({ message }) {
  //   return (
  //     <p className="error">
  //       <span>⛔⛔</span>
  //       {message}
  //     </p>
  //   );
  // }
}
{
  /* <Main>
<Box>
  <MovieList movies={movies} />
</Box>
<Box>
  <WatchedSumary watched={watched} />
  <WatchedMoviesList watched={watched} />
</Box>
</Main> */
}

{
  /* <Main>
<Box element={<MovieList movies={movies} />}></Box>
<Box
  element={
    <>
      <WatchedSumary watched={watched} />
      <WatchedMoviesList watched={watched} />{" "}
    </>
  }
/>
</Main> */
}
