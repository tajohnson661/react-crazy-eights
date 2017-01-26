import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { startGame } from '../actions';


class Header extends Component {
  onPlayButton = () => {
    this.props.startGame();
  };

  render () {
    return (
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
          <a id="logo-container" href="/" className="brand-logo" >Crazy Eights</a>
          <ul className="right">
            <li>
              <a onClick={this.onPlayButton}>New game</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ startGame }, dispatch);
};

export default connect(null, mapDispatchToProps)(Header);

