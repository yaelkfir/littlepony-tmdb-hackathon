import React from 'react';
import { connect } from 'react-redux';
import Header from '../header/header'


class GameOver extends React.Component {

  constructor() {
    super();
  }


  render() {

    return (
      <div className="game-over">
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
