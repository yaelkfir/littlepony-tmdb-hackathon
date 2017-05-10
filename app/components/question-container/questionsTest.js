import React from 'react';
import {connect} from 'react-redux';
import MovieIsMorePopular from "../whichMovieIsMorePopular/whichMovieIsMorePopular";

class QuestionTest extends React.Component {

  constructor() {
    super();

    this.state = {
      question: null,
    };
  }

  render() {
    console.info('question render', this.props.questionTest);
    if (this.props.questionTest === 'MovieMorePopular') {
      return (
        <div>
          <MovieIsMorePopular/>
        </div>
      );
    }
    else {
      return null;
    }
  }
}

function mapStateToProps({movies, highScore, QuestionTest}) {
  return {
    questionTest: QuestionTest,
    movies: movies,
    highScore: highScore
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setQuestion(data) {
      dispatch({
        type: 'SET_QUESTION',
        data: data
      })
    },
    setMovies(data) {
      dispatch({
        type: 'SET_MOVIES',
        data: data
      });
    },
    setScore(data) {
      dispatch({
        type: 'CURRENT_SCORE',
        currentscore: data
      })
    },
    setHighScore(data) {
      dispatch({
        type: 'SET_HIGH_SCORE',
        highestscore: data
      })
    },
    endgame(data) {
      dispatch({
        type: 'GAME_MODE',
        data: data
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(QuestionTest);
