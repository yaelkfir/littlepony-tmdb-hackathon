import React from 'react';
import {connect} from 'react-redux';
import TMDB from '../../core/tmdb';


class whichMovieIsMorePopular extends React.Component {

  constructor() {
    super();

    this.state = {
      right: null,
      wrong: null,
      question: null,
      type: 'movie'
    };

    console.info(this.state, 'yo');
  }

  componentDidMount() {
    this.whichMovieIsMorePopluar();
  }

  whichMovieIsMorePopluar() {

    const popMovie = '/discover/movie?sort_by=popularity.desc';

    TMDB.get(popMovie)
      .then((data) => {

        let indexOne = this.randomNum(19);
        let indexTwo = this.randomNum(19);
        let backUpIndex = this.randomNum(19);

        let MovieOne = data.results[indexOne];
        let MovieTwo = data.results[indexTwo];

        if (indexOne === indexTwo) {
          MovieTwo = data.results[backUpIndex];
        }

        if (MovieOne.popularity > MovieTwo.popularity) {

          this.setState({
            right: MovieOne,
            wrong: MovieTwo,
            question: `which movie is more popular?`
          });
        }
        else {
          this.setState({
            right: MovieTwo,
            wrong: MovieOne,
            question: `which movie is more popular?`
          })
        }

      });
  }

  //load q
  randomNum(num) {
    return Math.floor(Math.random() * (num))
  }

  answersMaker() {

    if (this.state.wrong !== null) {
      let trueOrFalse = Math.floor(Math.random() * 2);

      const picUrl = 'url("http://image.tmdb.org/t/p/w185/';

      const wrongName = this.state.wrong.title;
      const wrongPic = this.state.wrong.poster_path;

      const rightName = this.state.right.title;
      const rightPic = this.state.right.poster_path;

      return (
        <div className="answers-container">
          <div className="answer"
               title={trueOrFalse ? rightName : wrongName}
               style={{backgroundImage: `${picUrl}${trueOrFalse ? rightPic : wrongPic}"`}}
               id={trueOrFalse ? rightPic : wrongPic}
               onClick={
                 (e) => {
                   this.checkRightOrWrong(e);
                 }
               }/>
          <div className="answer"
               style={{backgroundImage: `${picUrl}${!trueOrFalse ? rightPic : wrongPic}"`}}
               title={!trueOrFalse ? rightName : wrongName}
               id={!trueOrFalse ? rightPic : wrongPic}
               onClick={(e) => {
                 this.checkRightOrWrong(e);
               }}/>
        </div>
      );
    }
    else {
      return null;
    }
  }

  //answer
  checkRightOrWrong(e) {

    let counter = Number(this.props.highScore);

    if (e.target.id === this.state.right.poster_path) {
      counter = counter + 1;

      this.props.setScore(counter);

      this.resetStateData();
      this.props.setNextQuestion('MovieMorePopular');
      this.whichMovieIsMorePopluar();

    }
    else {
      this.props.endgame('gameover');
    }
  }

  resetStateData() {
    this.setState({
      right: null,
      wrong: null,
      question: null
    })
  }

  render() {
    if (this.state.wrong !== null) {
      console.info('Q render', this.state);

      return (
        <div className="question-container">
          <div className="lest">
            <h3>{this.state.question}</h3>
          </div>
          {this.answersMaker()}
        </div>
      );
    }
    else {
      console.info('null?');
      return (
        <div className="question-container">
          <div className="lest">
            <h3>{this.state.question}</h3>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({movies, highScore, QuestionTest}) {
  return {
    QuestionTest: QuestionTest,
    movies: movies,
    highScore: highScore
  };
}

function mapDispatchToProps(dispatch) {
  //maybe new set
  return {
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
    },
    setNextQuestion(data) {
      dispatch({
        type: 'SET_QUESTION',
        data: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(whichMovieIsMorePopular);
