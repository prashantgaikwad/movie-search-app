const defaultState = {
  id: 'tt0468569',
  poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'MOVIE_SELECTED':
      return action.payload;
    default:
      return state;
  }
}
