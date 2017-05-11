import './lets-play.scss'

import React from 'react';
import {connect} from 'react-redux';

import TMDB from '../../core/tmdb';


class LetsPlay extends React.Component {

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
        <div className="lets-play"
             style={{backgroundImage:img}}>
          <div className="logo"/>
          <span>Are you a filmhound? <br/>
put your knowledge to the test..</span>
          <span
            className="btn"
            onClick={() => {
              this.props.startGame('playing')
            } }
          >lest play</span>

        </div>
      );
    }
    else {
      return null;
    }
  }
}

function mapStateToProps({movies}) {
  return {
    movies: movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startGame(data) {
      dispatch({
        type: 'GAME_MODE',
        data: data
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LetsPlay);
