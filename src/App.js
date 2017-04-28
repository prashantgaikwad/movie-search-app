import React, { PropTypes } from 'react';
import 'flexboxgrid/css/flexboxgrid.min.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import MovieDetails from './components/movie-details';
import SearchBar from './components/search-bar';

injectTapEventPlugin();
const App = (props) => {
  const { selectedMovie } = props;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundImage = `linear-gradient(to bottom, black 10%, lightgrey 100%),
    url(${selectedMovie.poster})`;
  document.body.style.backgroundBlendMode = 'darken';

  return (
    <div style={{ minHeight: '100vh' }}>
      <div className="row center-xs middle-xs" style={{ margin: 0, height: '100%' }}>
        <div className="col-sm-8" >
          <div className="row center-xs middle-xs" style={{ marginBottom: 16 }}>
            <SearchBar />
          </div>
          <MovieDetails />
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  selectedMovie: PropTypes.object,
};

const mapStateToProps = state => ({ selectedMovie: state.selectedMovie });

export default connect(mapStateToProps)(App);
