import React from 'react';
import { connect } from 'react-redux';

class Movies extends React.Component {

  constructor() {
    super();
  }

  renderMoviesList() {
    return <ul>
      { this.props.movies.map((movie) => {
        return <li key={ movie.id }>{ movie.title }</li>
      }) }
    </ul>
  }

  render() {
    if (!this.props.movies.length) {
      return null;
    }
    console.info(this.props.movies);

    return (
      <div className="movies">
        <h2>Most Popular Movies</h2>
        { this.renderMoviesList() }
          <h2>movies!!</h2>
          { this.renderMoviesList() }
      </div>
    );
  }
}

function mapStateToProps({ movies }) {
  return {
    movies: movies
  };
}

export default connect(mapStateToProps)(Movies);
