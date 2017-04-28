import { combineReducers } from 'redux';
import SelectedMovie from './reducer-selected-movie';
import Movies from './reducer-movies';

const rootReducer = combineReducers({
  movies: Movies,
  selectedMovie: SelectedMovie,
});

export default rootReducer;
