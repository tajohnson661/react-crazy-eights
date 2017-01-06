require('styles/App.css');
import React from 'react';
import GameBoard from '../containers/GameBoard';

class AppComponent extends React.Component {
  render() {
    return (
      <GameBoard />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
