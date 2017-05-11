import './game-over.scss'

import TMDB from '../../core/tmdb';

import React from 'react';
import { connect } from 'react-redux';
import Header from '../header/header'


class GameOver extends React.Component {

  constructor() {
    super();

    this.state = {
      img: null
    };
  }
  componentDidMount() {
    this.getBackImg();
  }

  randomNum(num) {
    return Math.floor(Math.random() * (num))
  }

  getBackImg() {
    const popMovie = '/discover/movie?sort_by=popularity.desc';
    const picUrl = 'url("http://image.tmdb.org/t/p/w1000/';

    TMDB.get(popMovie)
      .then((data) => {

        let index = this.randomNum(19);
        let Movie = data.results[index];
        console.info('index', index);
        console.info('Movie', Movie);

        const MoviePic = Movie.poster_path;
        console.info('MoviePic', MoviePic);

        const backGroundImg = `${picUrl}${MoviePic}"`;
        this.setState({
          img: backGroundImg
        })

      });


  }

  render() {
    const img = this.state.img;

    if (this.state.img !== null) {
    return (
      <div className="img-backgrounds game-over"
           style={{backgroundImage:img}}>
        <Header/>
        <div className="score-container">
          <h3>Game Over</h3>
          <p className="score"><span>Your Score</span><br/>{this.props.highScore}</p>
          <span
            className="btn"
            onClick= {() => {this.props.startGame('playing');
              this.props.resetCounter();
            }}>Start New Game</span>
        </div>
      </div>
    );
  }
  else {
      return null;
    }
  }
}

function mapStateToProps({ movies ,highScore}) {
  return {
    movies: movies,
    highScore:highScore
  };
}


function mapDispatchToProps(dispatch) {
  return {

    startGame(data) {
      dispatch({
        type: 'GAME_MODE',
        data: data
      })
    },
    resetCounter(){
      dispatch({
        type: 'RESET_SCORE'
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(GameOver);
