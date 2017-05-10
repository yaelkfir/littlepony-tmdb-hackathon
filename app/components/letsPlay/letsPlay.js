import './lets-play.scss'

import React from 'react';
import { connect } from 'react-redux';



class LetsPlay extends React.Component {

  constructor() {
    super();
  }


  render() {

    return (
      <div className="lets-play">
        <div className="logo"/>
        <span>Are you a filmhound? <br/>
put your knowledge to the test..</span>
        <span
          className="btn"
          onClick= {() => { this.props.startGame('playing')} }
        >lest play</span>

      </div>
    );
  }
}

function mapStateToProps({ movies }) {
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

export default connect(mapStateToProps,mapDispatchToProps)(LetsPlay);
