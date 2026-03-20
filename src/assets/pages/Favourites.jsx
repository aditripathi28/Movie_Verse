import "../../css/Favourites.css";
import { useMovieContext } from "../../contexts/useMovieContext.jsx";
import MovieCard from "../components/MovieCard";

function Favourites() {
  const { favourites } = useMovieContext();

  if (favourites.length > 0) {
    return (
      <div className="favourites">
        <div className="favourites-header">
          <h1>Favourite Movies</h1>
          <p>Your saved picks stay here so you can come back to them quickly.</p>
        </div>

        <div className="favourites-grid">
          {favourites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favourites-empty">
      <div>
        <h2>No Favourite Movies Yet</h2>
        <p>Start adding your favourite movies and they will appear here.</p>
      </div>
    </div>
  );
}

export default Favourites;
