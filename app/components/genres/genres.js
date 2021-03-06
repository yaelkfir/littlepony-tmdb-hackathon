import React from 'react';
import { connect } from 'react-redux';

class Genres extends React.Component {

  constructor() {
    super();
    console.info('genres');
  }

  renderGenresList() {
    return <ul>
      { this.props.genres.genres.map((genre) => {
        return <li key={ genre.id }>{ genre.name }</li>
      }) }
    </ul>
  }

  render() {
    console.info('geners',this.props.genres);
    if (!this.props.genres.genres) {
      return null;
    }

    return (
      <div className="movies">
        <h2>Genres!</h2>
        { this.renderGenresList() }
      </div>
    );
  }
}

function mapStateToProps({ genres }) {
  return {
    genres: genres
  };
}

export default connect(mapStateToProps)(Genres);
