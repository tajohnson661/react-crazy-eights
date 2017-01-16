import _ from 'lodash';
import * as Cards from '../modules/Cards';


export const playCard = (card, component) => {
  const {game} = component.props;

  if (Cards.isCardPlayable(card, game.discardPile, game.currentSuit)) {
    playerPlaysCard(card, component.props);
    setTimeout(() => {
      // TODO: yucky non-functional stuff... component's props will have changed, so grab them
      // again to use for the dealer play.
      dealerPlays(component);
    }, 0);
  }
  else {
    component.props.setMessage('You can\'t play that card');
  }
};

export const playerDraws = (component) => {
  const {game} = component.props;

  // Move top of remainingDeck to dealer.
  const firstCard = game.shuffledDeck[0];
  if (firstCard) {
    const newPlayerHand = [firstCard].concat(game.playerHand);
    const newShuffledDeck = game.shuffledDeck.slice(1, game.shuffledDeck.length);
    // TODO: If new deck is empty, regenerate it
    // send that ball of data as new state
    component.props.playerDraws({
      shuffledDeck: newShuffledDeck
      , playerHand: newPlayerHand
    });

  }
  else {
    // TODO: Uh oh... out of cards
  }


};

const playerPlaysCard = (card, props) => {
  const {game} = props;

  // new player hand <- remove card from player hand
  const newPlayerHand = game.playerHand.filter(function (el) {
    return !_.isEqual(el, card)
  });
  // add removed card to top/front of discard pile
  const newDiscardPile = [card].concat(game.discardPile);

  // if card is an 8, ask for suit
  let newCurrentSuit = game.currentSuit;
  if (card.face === 8) {
    // TODO: Modal dialog to change suit.
    newCurrentSuit = 'Hearts';
  }
  else {
    newCurrentSuit = card.suit;
  }
  // send that ball of data as new state
  props.playerPlayed({
    currentSuit: newCurrentSuit
    , playerHand: newPlayerHand
    , discardPile: newDiscardPile
    , message: ''
  });
};

const dealerPlays = component => {
  const {game} = component.props;

  if (game.playerHand.length === 0) {
    component.props.playerWins();
  }
  else {
    const card = findDealerCardToPlay(game.dealerHand, game.discardPile, game.currentSuit);
    if (!card) {
      // draw a card
      dealerDraws(component.props);
      setTimeout(() => {
        // try again to play.  component will have changed.
        dealerPlays(component);
      }, 0);
    }
    else {
      dealerPlaysCard(component.props, card);
    }
  }
};

const dealerPlaysCard = (props, card) => {
  const {game} = props;

  // remove card from dealer hand
  const newDealerHand = game.dealerHand.filter(function (el) {
    return !_.isEqual(el, card)
  });
  // add removed card to top/front of discard pile
  const newDiscardPile = [card].concat(game.discardPile);

  const message = 'Dealer plays the ' + Cards.toFullString(card);
  let newMessage = message;

  // get most prolific suit if it's an 8
  let newCurrentSuit;
  if (card.face === 8) {
    newCurrentSuit = Cards.getMostProlificSuit(newDealerHand);
    newMessage = message + '... New suit: ' + newCurrentSuit;
  }
  else {
    newCurrentSuit = card.suit;
  }


    // send that ball of data as new state
  props.dealerPlayed({
    currentSuit: newCurrentSuit
    , dealerHand: newDealerHand
    , discardPile: newDiscardPile
    , message: newMessage
  });

};

const dealerDraws = props => {
  const {game} = props;

  // Move top of remainingDeck to dealer.
  const firstCard = game.shuffledDeck[0];
  if (firstCard) {
    const newDealerHand = [firstCard].concat(game.dealerHand);
    const newShuffledDeck = game.shuffledDeck.slice(1, game.shuffledDeck.length);
    // TODO: If new deck is empty, regenerate it from discardPile

    // send that ball of data as new state
    props.dealerDraws({
      shuffledDeck: newShuffledDeck
      , dealerHand: newDealerHand
    });

  }
  else {
    // TODO: Uh oh... out of cards
  }
};

const findDealerCardToPlay = (dealerHand, discardPile, currentSuit) => {
  const possiblePlays = dealerHand.filter(isCardPlayableFunc(discardPile, currentSuit));

  if (!possiblePlays || possiblePlays.length === 0) {
    return null;
  }
  else {
    // TODO: Play 8's last
    return possiblePlays[0];
  }
};

const isCardPlayableFunc = (discardPile, currentSuit) => {
  return function (card) {
    return Cards.isCardPlayable(card, discardPile, currentSuit);
  }
};

