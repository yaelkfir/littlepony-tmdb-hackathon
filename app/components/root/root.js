import './root.scss';

import React from 'react';
import {connect} from 'react-redux';

import TMDB from '../../core/tmdb';


import LetsPlay from '../letsPlay/letsPlay';
import Playing from '../playing/playing';
import GameOver from '../gameover/gameover';

class Root extends React.Component {

  constructor() {
    super();


    this.state = {
      loading: false,
      img: null,
    }

  }
  randomNum(num) {
    return Math.floor(Math.random() * (num))
  }

  componentDidMount() {
    this.getBackImg();
  }

  componentDidUpdate(prevProps){

    if(prevProps.gameMode !== this.props.gameMode){

      this.getBackImg(prevProps.backImg);



    }
  }

  getBackImg() {
//    const popMovie = '/discover/movie?&sort_by=vote_average.desc&vote_count.gte=10';

    const popMovie = '/discover/movie?sort_by=popularity.desc&vote_count.gte=10';

    const picUrl = 'url("http://image.tmdb.org/t/p/original/';
    let indexOne = this.randomNum(19);

    TMDB.get(popMovie)
      .then((data) => {

        let Movie = data.results[indexOne];
        const MoviePic = Movie.poster_path;
        const backGroundImg = `${picUrl}${MoviePic}"`;

        this.setState({
          img: backGroundImg
        })
      })
  }

  render() {
    const img = this.state.img;


    if (this.props.gameMode === 'lets play') {

      if (this.state.img !== null) {

        return (
          <div className="img-backgrounds root"
               style={{backgroundImage: img,
               opacity:1}}
               onLoad={console.info('loaded')}>
            <LetsPlay/>
          </div>
        );
      }
      else {
        return null;
      }
    }

    if (this.props.gameMode === 'playing') {
      return (
        <div className="img-backgrounds root"
             style={{backgroundImage: img,opacity:1}}
             onLoad={console.info('loaded')}>
          >
          <Playing/>
        </div>
      )
    }

    if (this.props.gameMode === 'gameover') {
      return (
        <div className="img-backgrounds root"
             onLoad={console.info('loaded')}
             style={{backgroundImage: img}}>
          >
          <GameOver/>
        </div>
      )
    }

    else {
      console.info('bad');
      return null;
    }
  }


}

function mapStateToProps({movies, genres, gameMode, backImg}) {
  return {
    backImg: backImg,
    movies: movies,
    genres: genres,
    gameMode: gameMode
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setBackImg(data) {
      dispatch({
        type: 'SET_BACKGROUND_IMG',
        data: data
      });
    },
    setMovies(data) {
      dispatch({
        type: 'SET_MOVIES',
        data: data
      });
    },
    setGenres(data) {
      dispatch({
        type: 'SET_GARNERS',
        data: data
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
