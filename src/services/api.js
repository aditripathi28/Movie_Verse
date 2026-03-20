const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "e3cd584efd2694e4ba343feccf788cce";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchFromTmdb = async (path, searchParams = {}) => {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json();
};

export const getPopularMovies = async () => {
  const data = await fetchFromTmdb("/movie/popular");
  return data.results;
};

export const searchMovies = async (query) => {
  const data = await fetchFromTmdb("/search/movie", { query });
  return data.results;
};

export const getImdbUrlByTmdbId = async (tmdbId) => {
  const data = await fetchFromTmdb(`/movie/${tmdbId}/external_ids`);

  return data.imdb_id ? `https://www.imdb.com/title/${data.imdb_id}/` : null;
};
