export default function selectMovie(movie) {
  return {
    type: 'MOVIE_SEARCH',
    payload: movie,
  };
}
