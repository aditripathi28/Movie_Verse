import "../../css/MovieCard.css";
import { useMovieContext } from "../../contexts/useMovieContext.jsx";
import { useEffect, useState } from "react";
import { getImdbUrlByTmdbId } from "../../services/api";

export function MovieCard({ movie }) {
  const [imdbUrl, setImdbUrl] = useState(null);
  const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();
  const favourites = isFavourite(movie.id);

  useEffect(() => {
    let active = true;

    const loadImdb = async () => {
      try {
        const url = await getImdbUrlByTmdbId(movie.id);
        if (active) {
          setImdbUrl(url);
        }
      } catch (error) {
        console.error("Failed to load IMDb link", error);
        if (active) {
          setImdbUrl(null);
        }
      }
    };

    loadImdb();
    return () => {
      active = false;
    };
  }, [movie.id]);

  function onFavouriteClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (favourites) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
  }

  function onCardClick() {
    if (imdbUrl) {
      window.open(imdbUrl, "_blank", "noopener,noreferrer");
    }
  }

  function onCardKeyDown(e) {
    if (!imdbUrl) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCardClick();
    }
  }

  return (
    <div
      className={`movie-card ${imdbUrl ? "clickable" : ""}`}
      onClick={onCardClick}
      onKeyDown={onCardKeyDown}
      role={imdbUrl ? "link" : undefined}
      tabIndex={imdbUrl ? 0 : undefined}
    >
      <div className="movie-poster">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://placehold.co/500x750/1f1510/f7f1e8?text=No+Poster"
          }
          alt={movie.title}
        />

        <div className="movie-overlay">
          <button
            className={`favourite-btn ${favourites ? "active" : ""}`}
            onClick={onFavouriteClick}
          >
            {"\u2665"}
          </button>
        </div>

        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
