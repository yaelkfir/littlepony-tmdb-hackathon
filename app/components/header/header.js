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

          <span>{`score: ${this.props.highscore}`}</span>
        </nav>
      </header>
    );
  }
}

function mapStateToProps({movies, highscore}) {
  return {
    movies: movies,
    highscore: highscore
  };
}



export default connect(mapStateToProps)(Header);
