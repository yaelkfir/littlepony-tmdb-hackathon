import './root.scss';

import React from 'react';
import {connect} from 'react-redux';

import Movies from '../movies/movies';
import LetsPlay from '../letsPlay/letsPlay';
import Playing from '../playing/playing';
import Header from '../header/header'

import Genres from '../genres/genres'
import TMDB from '../../core/tmdb';
import GameOver from '../gameover/gameover';

class Root extends React.Component {

  constructor() {
    super();

    console.info();
    // this.handleClick = this.handleClick.bind(this);
    // this.getGenres = this.getGenres.bind(this);

    this.state = {
      loading: false,
      mode: 'playing'//playing//game over//leadboard//lets play


    }
  }


  render() {
    console.info(this.props.gamemode);
    if (this.props.gamemode === 'lets play') {

      return (

        <div className="root">
          <LetsPlay/>
        </div>
      );
    }
    if (this.props.gamemode === 'playing') {
      return (
        <div className="root">
          <Playing/>
        </div>
      )
    }
    if (this.props.gamemode === 'gameover') {
      console.info('good');
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

function mapStateToProps({movies, genres, gamemode}) {
  return {
    movies: movies,
    genres: genres,
    gamemode: gamemode
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
