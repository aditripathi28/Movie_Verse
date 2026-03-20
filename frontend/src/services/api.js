const API_KEY = "e3cd584efd2694e4ba343feccf788cce";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

export const getImdbUrlByTmdbId = async (tmdbId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${tmdbId}/external_ids?api_key=${API_KEY}`,
  );
  const data = await response.json();

  return data.imdb_id ? `https://www.imdb.com/title/${data.imdb_id}/` : null;
};
