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

    console.info();

    this.state = {
      loading: false,
      mode: 'playing'
    }
  }


  getBackImg() {
    const popMovie = '/discover/movie?sort_by=popularity.desc';
    const picUrl = 'url("http://image.tmdb.org/t/p/w1000/';

    TMDB.get(popMovie)
      .then((data) => {

        let index = Math.floor(Math.random() * (19));
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
    console.info('render root',this.props.gameMode);
    if (this.props.gameMode === 'lets play') {

      return (

        <div className="root">
          <LetsPlay
            getBackImg = {this.getBackImg}/>
        </div>
      );
    }

    if (this.props.gameMode === 'playing') {
      return (
        <div className="root">
          <Playing/>
        </div>
      )
    }

    if (this.props.gameMode === 'gameover') {
      return (
        <div className="root">
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

function mapStateToProps({movies, genres, gameMode}) {
  return {
    movies: movies,
    genres: genres,
    gameMode: gameMode
  };
}

function mapDispatchToProps(dispatch) {
  return {
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
