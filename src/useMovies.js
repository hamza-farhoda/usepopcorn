import React from "react";
import { useEffect, useState } from "react";

export function useMovies(query) {
  const KEY = "4c977774";
  const [movies, setMovies] = useState([]);
  const [isLooding, setLooding] = useState(false);
  const [erro, setErro] = useState("");
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
        console.log("Clear");
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLooding, erro };
}
