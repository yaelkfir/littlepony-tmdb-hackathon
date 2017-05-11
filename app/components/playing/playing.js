import './playing.scss'
import React from 'react';
import {connect} from 'react-redux';

import Header from '../header/header'
import QuestionTest from '../question-container/questionsTest'


class Playing extends React.Component {

  constructor() {
    super();
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
