import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {startGame} from '../actions/index';
import Card from '../components/Card';


class GameBoard extends Component {

  // The constructor is used to initialize the state
  constructor(props) {
    super(props);
  }

  onPlayButton() {
    this.props.startGame();
  }

  drawCard(showFace) {
    return function (card) {
      return (
        <Card
          key={card.suit + card.face}
          suit={card.suit}
          face={card.face}
          showFace={showFace}
        />
      )
    }
  }

  renderDealerHand() {
    return (
      <div>
        <div className="row center">
          <h4 className="header col s12 orange-text">Dealer</h4>
        </div>
        <div className="row center">
          {this.props.game.dealerHand.map(this.drawCard(false))}
        </div>
      </div>
    )
  }

  renderPlayerHand() {

    const sortedHand = this.props.game.playerHand;

    return (
      <div>
        <div className="row center">
          {sortedHand.map(this.drawCard(true))}
        </div>
        <div className="row center">
          <h4 className="header col s12 orange-text">Player</h4>
        </div>
      </div>
    )
  }

  renderDiscardPile(state) {
    return (
      <div>
        <p>Current suit is {state.currentSuit} </p>
      </div>
    )

  }

  render() {
    const state = this.props.game;

    if (state.inProgress) {
      return (
        <div className="container playingCards simpleCards">
          <div>
            {this.renderDealerHand()}
          </div>
          <div>
            {this.renderDiscardPile(state)}
          </div>
          <div>
            {this.renderPlayerHand()}
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <p>Ready to start? Click button to go</p>
          <button onClick={this.onPlayButton.bind(this)}>Start game</button>
        </div>
      );

    }
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({startGame}, dispatch);
}
function mapStateToProps({game}) {  // ES6 syntax, one argument using one property
  return {game};
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
