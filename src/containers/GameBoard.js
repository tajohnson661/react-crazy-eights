import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Card from '../components/Card';
import {
  startGame, playerPlayed, setMessage, dealerPlays, playerWins, dealerDraws, playerDraws,
  dealerPlayed, dealerWins, setSuitAndClose
} from '../actions';
import * as GameLogic from '../modules/GameLogic';
import ReactModal from 'react-modal';

import _ from 'lodash';

// TODO: Write tests
class GameBoard extends Component {

  onPlayButton() {
    this.props.startGame();
  }

  onCardClick(card) {
    GameLogic.playCard(card, this);
  }

  onDrawPileClick() {
    GameLogic.playerDraws(this.props);
  }

  paintCard(showFace, clickable) {
    return function (card) {
      return (
        <Card
          key={card.suit + card.face}
          showFace={showFace}
          clickable={clickable}
          card={card}
          onCardClick={card => this.onCardClick(card)}
          currentSuit={null}
        />
      )
    }.bind(this)
  }

  renderDealerHand() {
    return (
      <div>
        <div className="row center">
          <h4 className="header col s12 orange-text">Dealer</h4>
        </div>
        <div className="row center">
          {this.props.game.dealerHand.map(this.paintCard(false, false))}
        </div>
      </div>
    )
  }

  addSortOrder(card) {
    let sortOrder;
    if (card.suit === 'Hearts') {
      sortOrder = 1;
    }
    else if (card.suit === 'Clubs') {
      sortOrder = 2;
    }
    else if (card.suit === 'Diamonds') {
      sortOrder = 3;
    }
    else {
      sortOrder = 4;
    }
    return {
      ... card
      , sortOrder
    }
  }

  removeSortOrder({suit, face}) {
    return {suit, face}
  }

  renderPlayerHand() {

    const sortedHand = _.sortBy(this.props.game.playerHand.map(this.addSortOrder), ['sortOrder', 'face']).reverse().map(this.removeSortOrder);

    return (
      <div>
        <div className="row center">
          {sortedHand.map(this.paintCard(true, true))}
        </div>
        <div className="row center">
          <h4 className="header col s12 orange-text">Player</h4>
        </div>
      </div>
    )
  }

  renderMiddleSection(state) {
    return (
      <div>
        <div className="row">
          <div className="col m3">
          </div>
          <div className="col s12 m6">
            <div className="row middle-section grey lighten-3">
              <div className="col s4">
                {this.renderDrawCard(state)}
              </div>
              <div className="col s4">
                {this.renderDiscardPile(state)}
              </div>
              <div className="col s4">
                {this.renderCurrentSuit(state)}
              </div>
            </div>
          </div>
          <div className="col m3">
          </div>
        </div>
      </div>
    );
  }

  renderDrawCard(state) {
    if (state.shuffledDeck.length === 0) {
      return null;
    }
    else {
      return (
        <Card
          showFace={false}
          clickable={true}
          card={null}
          onCardClick={() => this.onDrawPileClick()}
          currentSuit={null}
        />
      )
    }
  }

  renderDiscardPile(state) {
    if (state.discardPile && state.discardPile[0]) {
      const topCard = state.discardPile[0];
      return (
        <div>
          <Card
            showFace={true}
            clickable={false}
            card={topCard}
            currentSuit={null}
          />
        </div>
      )
    }
    else {
      return (<div></div>)
    }

  }

  renderCurrentSuit(state) {
    return (
      <Card
        currentSuit={state.currentSuit}
      />
    )
  }

  renderDialog(state) {
    return (
      <ReactModal
        isOpen={state.showDialog}
        contentLabel="Suit Chooser"
        shouldCloseOnOverlayClick={false}
      >

        <h2 ref="subtitle">Pick a suit</h2>
        <div>
          <button onClick={this.setHearts.bind(this)}>Hearts</button>
          <button onClick={this.setSpades.bind(this)}>Spades</button>
          <button onClick={this.setDiamonds.bind(this)}>Diamonds</button>
          <button onClick={this.setClubs.bind(this)}>Clubs</button>
        </div>
      </ReactModal>
    )
  }

  setHearts() {
    this.closeModal('Hearts');
  }
  setClubs() {
    this.closeModal('Clubs');
  }
  setSpades() {
    this.closeModal('Spades');
  }
  setDiamonds() {
    this.closeModal('Diamonds');
  }

  closeModal(suit) {
    this.props.setSuitAndClose(suit);
    setTimeout(() => {
      GameLogic.dealerPlays(this);
    }, 0);
  }

  renderMessage(state) {
    return (
      <div className="row center">
        <div className="col m3">
        </div>
        <div className="col s12 m6 grey lighten-3 message-area">
          <h5>
            {state.message}
          </h5>
        </div>
        <div className="col m3">
        </div>

      </div>

    )
  }

  render() {
    const state = this.props.game;

    if (state.inProgress) {
      return (
        <div className="container playingCards simpleCards">
          <div className="on-top">
            {this.renderDialog(state)}
          </div>
          <div>
            {this.renderDealerHand()}
          </div>
          <div>
            {this.renderMiddleSection(state)}
          </div>
          <div>
            {this.renderMessage(state)}
          </div>
          <div>
            {this.renderPlayerHand()}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="row center initial-screen">
          {this.renderMessage(state)}
          <button className="btn btn-large btn-success" onClick={this.onPlayButton.bind(this)}>Start game</button>
        </div>
      );

    }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    startGame, setMessage, playerPlayed, dealerPlays, playerWins,
    dealerDraws, playerDraws, dealerPlayed, dealerWins, setSuitAndClose
  }, dispatch);
};

const mapStateToProps = ({game}) => {
  return {game};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
