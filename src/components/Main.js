require('styles/App.css');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
       Stuff goes here
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
