import React from 'react';
import {connect} from 'react-redux';
import TMDB from '../../core/tmdb';


class actorKnownForMovie extends React.Component {

  constructor() {
    super();

    this.state = {
      right: null,
      wrong: null,
      question: null,
    };

    console.info('constructor actorBestKnowForMovie');
  }

  componentDidMount() {
    console.info('actorBestKnowForMovie');
    this.actorBestKnowForMovie();
  }

  actorBestKnowForMovie() {

    const apiKey = '24d87d4e264322cbb28c3b1f2a2b3721';
    const popPerson = `/person/popular?api_key=${apiKey}&language=en-US&page=1`;

    TMDB.get(popPerson)
      .then((data) => {

        let indexOne = this.randomNum(19);
        let indexTwo = this.randomNum(19);
        let backUpIndex = this.randomNum(19);
//.name .profile_path

        let trueActor = data.results[indexOne];
        let falseActor = data.results[indexTwo];

        let movie = data.results[indexOne].known_for[this.randomNum(2+1)].title;

        if (indexOne === indexTwo) {
          falseActor = data.results[backUpIndex];
        }
        this.setState({
          right: trueActor,
          wrong: falseActor,
          question: `which actor is best know for ${movie}?`
        })
      });
  }

  //load q
  randomNum(num) {
    return Math.floor(Math.random() * (num))
  }

  answersMaker() {

    if (this.state.wrong !== null) {
      let trueOrFalse = this.randomNum(2);

      const picUrl = 'url("http://image.tmdb.org/t/p/w300/';

      const wrongName = this.state.wrong.name;
      const wrongPic = this.state.wrong.profile_path;

      const rightName = this.state.right.name;
      const rightPic = this.state.right.profile_path;

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

    if (e.target.id === this.state.right.profile_path) {
      counter = counter + 1;

      this.props.setScore(counter);

      this.resetStateData();
      this.props.setNextQuestion('MovieMorePopular');
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
    console.info(this.state.wrong);
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

export default connect(mapStateToProps, mapDispatchToProps)(actorKnownForMovie);
