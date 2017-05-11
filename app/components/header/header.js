import './header.scss'

import React from 'react';
import {connect} from 'react-redux';

class Header extends React.Component {

  constructor() {
    super();
  }


  render() {
    return (
      <header className="header">
        <nav>
          <span className="menu">menu</span>
          <div className="logo"/>
          <span className="score-header">{`score: ${this.props.highScore}`}</span>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({movies, highScore}) {
  return {
    movies: movies,
    highScore: highScore
  };
}



export default connect(mapStateToProps)(Header);
