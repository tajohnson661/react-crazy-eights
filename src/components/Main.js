require('styles/App.css');
import React from 'react';
import GameBoard from '../containers/GameBoard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <GameBoard />
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
