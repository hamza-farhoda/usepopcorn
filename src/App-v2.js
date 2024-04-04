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
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];
const KEY = "4c977774";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];
export default function App() {
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLooding, setLooding] = useState(false);
  const [erro, setErro] = useState("");
  const [selectedId, setSelectedId] = useState("tt1375666");
  const tempQuery = "interstellar";
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
    console.log(watched);
  }
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setLooding(true);
          setErro("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) throw new Error("Something went with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Moive not found");

          setMovies(data.Search);
          setErro("");
          // if (data.Response === "False") throw new Error("Moive not found");
          // setLooding(false);
          // console.log(movies);
          // .then((res) => res.json())
          // .then((data) => setMovies(data.Search));
        } catch (err) {
          if (err.name !== "AbortError") {
            setErro(err.message);
            console.error(err.message);
          }
        } finally {
          setLooding(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setErro("");
        return;
      }
      // handleCloseMovie();
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

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
