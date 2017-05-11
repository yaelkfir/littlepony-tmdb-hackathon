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
      img: null
    }

  }
  randomNum(num) {
    return Math.floor(Math.random() * (num))
  }

  componentDidMount() {
    this.getBackImg(this.props.backImg);
  }

  getBackImg() {
    // const apiKey = '24d87d4e264322cbb28c3b1f2a2b3721';
    // const movie = `/movie/${this.props.backImg}?api_key=${apiKey}`;

    const popMovie = '/discover/movie?sort_by=popularity.desc';

    const picUrl = 'url("http://image.tmdb.org/t/p/w1000/';
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
    //set
//id:271110 civil war best pic i randomly found
//id:135397, title:"Jurassic World" for cover

// id:135397, title:"Jurassic World" for lets play
// id:271110, for score play
    /*
     const popPerson = `/person/popular?api_key=${apiKey}&language=en-US&page=1`;
     */
    /*
     TMDB.get(movie)
     .then((data) => {

     let Movie = data;
     console.info('Movie', Movie);

     const MoviePic = Movie.poster_path;
     console.info('MoviePic', MoviePic);

     const backGroundImg = `${picUrl}${MoviePic}"`;
     this.setState({
     img: backGroundImg
     })

     });
     */

  }

  render() {
    console.info('render root', this.props.gameMode);
    const img = this.state.img;
    console.info('backgroundImage',this.props.backImg);

    if (this.props.gameMode === 'lets play') {

      if (this.state.img !== null) {

        return (
          <div className="img-backgrounds root"
               style={{backgroundImage: img}}>
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
             style={{backgroundImage: img}}>
          <Playing/>
        </div>
      )
    }

    if (this.props.gameMode === 'gameover') {
      return (
        <div className="img-backgrounds root"
             style={{backgroundImage: img}}>
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
