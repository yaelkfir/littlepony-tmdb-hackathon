import React from 'react';
import {connect} from 'react-redux';
import TMDB from '../../core/tmdb';


class Question extends React.Component {

  constructor() {
    super();

    this.state = {
      right: null,
      wrong: null,
      question: null,
      type: 'actor' //movie
    };
    //state can be array of react components(it gets it own false data)

    /*
     this.state = {
     right: null,
     wrong: null,
     question: null,
     type: 'actor' //movie
     }

     */

    console.info(this.state);
  }

  componentDidMount() {
    if (this.state.type === 'actor') {
      this.actorBestKnowForMovie();
    }
    else {
      console.info('movie');
    }

  }


  componentDidUpdate(prevProps, prevState) {


    if (prevState.type === 'actor' && this.state.type === 'movie') {
      this.whichMovieIsMorePopluar();
    }

    if (prevState.type === 'movie' && this.state.type === 'actor') {
      this.actorBestKnowForMovie();
    }

    //next question

  }

  //qustions actor
  actorBestKnowForMovie() {
    //actor best known for miove
    //‬let random = ;

    const apiKey = '24d87d4e264322cbb28c3b1f2a2b3721';
    const popPerson = `/person/popular?api_key=${apiKey}&language=en-US&page=1`;
    const popMovie = '/discover/movie?sort_by=popularity.desc';

    const type = this.state.type === 'movie' ? popMovie : popPerson;
    TMDB.get(type)
      .then((data) => {
        // this.props.setMovies(data.results);

        let zeroTwoNumbers = Math.floor(Math.random() * (2 + 1));
        let zeroNineteen = Math.floor(Math.random() * (19));
        let newZeroNineteen = Math.floor(Math.random() * (19));
        let backupZeroNineteen = Math.floor(Math.random() * (19));


        let falseyActor = data.results[newZeroNineteen].profile_path;
        let falseyActorName = data.results[newZeroNineteen].name;
        let turthyActor = data.results[zeroNineteen].profile_path;
        let turthyActorName = data.results[zeroNineteen].name;
        let movie = data.results[zeroNineteen].known_for[zeroTwoNumbers].title;

        if (zeroNineteen === newZeroNineteen) {
          falseyActor = data.results[backupZeroNineteen];
        }

        console.info('actor', data.results);
        this.setState({
          right: turthyActor,
          rightname: turthyActorName,
          wrong: falseyActor,
          wrongname:falseyActorName,
          question: `which actor is best know for ${movie}?`
        })

      });
  }

  //qustions movie
  whichMovieIsMorePopluar() {

    const apiKey = '24d87d4e264322cbb28c3b1f2a2b3721';
    const popPerson = `/person/popular?api_key=${apiKey}&language=en-US&page=1`;
    const popMovie = '/discover/movie?sort_by=popularity.desc';

    const type = this.state.type === 'movie' ? popMovie : popPerson;
    console.info(type);

    TMDB.get(type)
      .then((data) => {
        // this.props.setMovies(data.results);

        let zeroNineteen = Math.floor(Math.random() * (19));
        let newZeroNineteen = Math.floor(Math.random() * (19));
        let backupZeroNineteen = Math.floor(Math.random() * (19));


        let firstMovie = data.results[zeroNineteen];
        let secondMovie = data.results[newZeroNineteen];
        let firstMovieName = data.results[zeroNineteen].title;
        let secondMovieName = data.results[newZeroNineteen].title;

        let turthyActorName = data.results[zeroNineteen].name;

        console.info('movies', data.results);
        if (zeroNineteen === newZeroNineteen) {
          secondMovie = data.results[backupZeroNineteen];
        }

        if (firstMovie.popularity > secondMovie.popularity) {

          this.setState({
            right: firstMovie.poster_path,
            wrong: secondMovie.poster_path,
            rightname: firstMovieName,
            wrongname:secondMovieName,
            question: `which movie is more popular?`
          });
        }
        else {
          this.setState({
            right: secondMovie.poster_path,
            wrong: firstMovie.poster_path,
            rightname: secondMovieName,
            wrongname:firstMovieName,
            question: `which movie is more popular?`
          })
        }

      });
  }

  checkRightOrWrong(e) {
    console.info(e.target.textContent);
    let counter = Number(this.props.highscore);

    if (e.target.id === this.state.right) {
      counter = counter + 1;
      console.info(counter);

      this.props.setScore(counter);

      const type = this.state.type === 'actor' ? 'movie' : 'actor';
      this.setState({
        type: type,
        right: null,
        rightname:null,
        wrong: null,
        wrongname: null,
        question: null
      })

    }
    else {
      this.props.endgame('gameover');
    }
  }

  render() {
    let randomAnswerPresentence = Math.floor(Math.random() * 2);

    const rightPic = this.state.right;
    const rightName = this.state.rightname;
    const wrongPic = this.state.wrong;
    const wrongName = this.state.wrongname;

    if (this.state.wrong !== null) {
      return (

        <div className="question-container">
          <div className="lest"><h3>{this.state.question}</h3></div>
          <div className="answers-container">
            <div className="answer"
title={randomAnswerPresentence ? rightName : wrongName}
                 style={{backgroundImage: `url("http://image.tmdb.org/t/p/w185/${randomAnswerPresentence ? rightPic : wrongPic}"`}}
                 id={randomAnswerPresentence ? rightPic : wrongPic}
                 onClick={
                   (e) => {
                     this.checkRightOrWrong(e);
                   }
                 }/>
            <div className="answer"
                 style={{backgroundImage: `url("http://image.tmdb.org/t/p/w185/${!randomAnswerPresentence ? rightPic : wrongPic}"`}}
                 title={!randomAnswerPresentence ? rightName : wrongName}

                 id={!randomAnswerPresentence ? rightPic : wrongPic}
                 onClick={(e) => {
                   this.checkRightOrWrong(e);
                 }}/>
          </div>
        </div>

      );
    }
    else {
      return null
    }
  }
}

function mapStateToProps({movies, highscore}) {
  return {
    movies: movies,
    highscore: highscore

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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Question);
