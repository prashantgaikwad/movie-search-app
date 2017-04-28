import React, { PropTypes } from 'react';
import { compose } from 'react-komposer';
import Paper from 'material-ui/Paper';
import axios from 'axios';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import placeholder from '../../public/thumbnail.jpg';

const ROOT_URL = 'http://www.omdbapi.com';

const MovieDetails = (props) => {
  const { movie = {}, loading } = props;
  const poster = movie.Poster && movie.Poster.startsWith('http') ? movie.Poster : placeholder;
  if (loading) {
    return (<CircularProgress size={60} thickness={7} />);
  }
  return (
    <Paper style={{ backgroundColor: 'rgba(250, 250, 250, 0.8)' }} >
      <div className="row center-xs start-md">
        <div className="col-lg-5 col-md-12 center-md start-lg" >
          <img src={poster} style={{ height: '100%' }} alt="poster" />
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="center-xs" >
            <h2>{movie.Title}</h2>
          </div>
          <div className="center-md start-lg" style={{ padding: 16 }}>
            <div><b>Director:</b> {movie.Director}</div>
            <br />
            <div><b>Actors:</b> {movie.Actors}</div>
            <br />
            <div><b>Writer:</b> {movie.Writer}</div>
            <div><b>Year:</b> {movie.Year}</div>
            <div><b>Released:</b> {movie.Released}</div>
            <div><b>Language:</b> {movie.Language}</div>
            <div><b>Genre:</b> {movie.Genre}</div>
            <br />
            <div><b>Plot:</b> {movie.Plot}</div>
            <br />
            <b>Website: </b><a href={`${movie.Website}`}>{movie.Website}</a>
          </div>
        </div>
      </div>
    </Paper>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.object,
  loading: PropTypes.bool,
};

function genPromiseLoader() {
  return (props, onData) => {
    onData(null, { loading: true });
    axios.get(`${ROOT_URL}?i=${props.selectedMovie.id}`)
      .then(({ data = {} }) => onData(null, { movie: data, loading: false }))
      .catch((err) => {
        alert(err.message);
        onData(err);
      });
  };
}

const mapStateToProps = state => ({ selectedMovie: state.selectedMovie });

export default connect(mapStateToProps)(compose(genPromiseLoader())(MovieDetails));
