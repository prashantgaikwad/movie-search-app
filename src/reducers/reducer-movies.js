export default function (state = [], action) {
  switch (action.type) {
    case 'MOVIE_SEARCH':
      return action.payload;
    default:
      return state;
  }
}
