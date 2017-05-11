import './playing.scss'


import React from 'react';
import {connect} from 'react-redux';
import TMDB from '../../core/tmdb';

import Header from '../header/header'
import QuestionTest from '../question-container/questionsTest'


class Playing extends React.Component {

  constructor() {
    super();

    this.state = {
      img: null
    };
  }

  componentDidMount() {
    this.getBackImg();
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

  randomNum(num) {
    return Math.floor(Math.random() * (num))
  }


  render() {
    const img = this.state.img;

    if (this.state.img !== null) {
    return (
      <div className="playing"
           style={{backgroundImage:img}}>
        <Header/>
        <QuestionTest/>
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
    setMovies(data) {
      dispatch({
        type: 'SET_MOVIES',
        data: data
      });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Playing);
