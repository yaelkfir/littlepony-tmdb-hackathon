import React from 'react';
import {connect} from 'react-redux';
import TMDB from '../../core/tmdb';
import Header from '../header/header'
import Question from '../question-container/question'
import QuestionTest from '../question-container/questionsTest'


class Playing extends React.Component {

  constructor() {
    super();

    this.state = {
      right: null,
      wrong: null,
      question: null,
      type: 'actor' //movie
    }
  }

  render() {

    return (
      <div className="playing">
        <Header/>
        <QuestionTest/>
      </div>
    );
  }
}

function mapStateToProps({movies}) {
  return {
    movies: movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMovies(data) {
      dispatch({
        type: 'SET_MOVIES',
        data: data
      });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playing);
