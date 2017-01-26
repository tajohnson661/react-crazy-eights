require('styles/App.css');
import React from 'react';
import GameBoard from '../containers/GameBoard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../containers/Header';
import Footer from './Footer';

class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <GameBoard />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
