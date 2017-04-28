export default function selectMovie(movie) {
  return {
    type: 'MOVIE_SELECTED',
    payload: movie,
  };
}
