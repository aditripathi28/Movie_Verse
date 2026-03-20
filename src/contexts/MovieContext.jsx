import { useEffect, useState } from "react";
import { MovieContext } from "./movieContextValue.jsx";

export const MovieProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const storedFavs = localStorage.getItem("favourites");

    if (!storedFavs) {
      return [];
    }

    try {
      return JSON.parse(storedFavs);
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (movie) => {
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === movie.id)) {
        return prev;
      }

      return [...prev, movie];
    });
  };

  const removeFromFavourites = (movieId) => {
    setFavourites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavourite = (movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  };

  const value = {
    favourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};
