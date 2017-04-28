import React, { Component, PropTypes } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { searchMovie, selectMovie } from '../actions';

const ROOT_URL = 'http://www.omdbapi.com';

class SearchBar extends Component {

  state = {
    text: '',
  }

  getMovieItems = () => {
    const { movies = [] } = this.props;
    return movies.map(movie => ({
      text: movie.Title,
      id: movie.imdbID,
      poster: movie.Poster,
      value: (
        <MenuItem
          primaryText={movie.Title}
          secondaryText={`Year ${movie.Year}`}
        />
      ),
    }));
  }

  handleChange = (text) => {
    const { dispatchSearchMovie } = this.props;
    if (text && text.length > 2) {
      const url = `${ROOT_URL}?s=${event.target.value}`;
      axios.get(url).then(({ data }) => {
        dispatchSearchMovie(data.Search || []);
      }).catch((error) => {
        alert(error.message);
      });
    }
  }

  handleSelect = ({ id, poster, title }) => {
    const { dispatchSelectMovie } = this.props;
    dispatchSelectMovie({ id, poster, title });
  }

  render() {
    return (
      <div style={{ width: '80%' }} >
        <AutoComplete
          fullWidth
          floatingLabelText="Search movie"
          floatingLabelStyle={{ color: 'orange' }}
          filter={AutoComplete.noFilter}
          inputStyle={{ color: 'cyan' }}
          dataSource={this.getMovieItems()}
          onUpdateInput={this.handleChange}
          onNewRequest={this.handleSelect}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  movies: PropTypes.array,
  dispatchSearchMovie: PropTypes.func,
  dispatchSelectMovie: PropTypes.func,
};

const mapStateToProps = state => ({ movies: state.movies });

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    dispatchSearchMovie: searchMovie,
    dispatchSelectMovie: selectMovie,
  },
  dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
