import React from 'react';
import { connect } from 'react-redux';

class Playing extends React.Component {

  constructor() {
    super();


    this.state = {
      QuestionType: 'movies',//actors//
      counter:0//right anser ++

      /*
      [{
      type:movie
      questions:['{
      ?:kdfjhdfhdfldf,
      !:fkxjcgnlxkdndflkndfxlkk
      }',? ,?]
      }
       {
       type:actors
       questions:['{
       ?:kdfjhdfhdfldf,
       !:fkxjcgnlxkdndflkndfxlkk
       }',? ,?]
       }
      ]

       */

    }
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
