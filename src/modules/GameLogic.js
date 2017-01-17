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

export const playerDraws = props => {
  const {game} = props;

  // Move top of remainingDeck to player.
  const firstCard = game.shuffledDeck[0];
  if (firstCard) {
    const newPlayerHand = [firstCard].concat(game.playerHand);
    let newShuffledDeck = game.shuffledDeck.slice(1, game.shuffledDeck.length);
    let newDiscardPile = game.discardPile;

    // If deck is empty, regenerate it from discard Pile
    if (!newShuffledDeck || newShuffledDeck.length === 0) {
      newDiscardPile = [game.discardPile[0]];
      newShuffledDeck = Cards.shuffleDeck(game.discardPile.slice(1, game.discardPile.length));
    }
    // send that ball of data as new state
    props.playerDraws({
      shuffledDeck : newShuffledDeck
      , playerHand : newPlayerHand
      , discardPile : newDiscardPile
      , message : 'You drew the ' + Cards.toFullString(firstCard)
    });
  }
};

const dealerDraws = props => {
  const {game} = props;

  // Move top of remainingDeck to dealer.
  const firstCard = game.shuffledDeck[0];
  if (firstCard) {
    const newDealerHand = [firstCard].concat(game.dealerHand);
    let newShuffledDeck = game.shuffledDeck.slice(1, game.shuffledDeck.length);
    let newDiscardPile = game.discardPile;

    // If deck is empty, regenerate it from discard Pile
    if (!newShuffledDeck || newShuffledDeck.length === 0) {
      newDiscardPile = [game.discardPile[0]];
      newShuffledDeck = Cards.shuffleDeck(game.discardPile.slice(1, game.discardPile.length));
    }

    // send that ball of data as new state
    props.dealerDraws({
      shuffledDeck: newShuffledDeck
      , dealerHand: newDealerHand
      , discardPile : newDiscardPile
    });
  }
  else {
    // TODO: Uh oh... out of cards. Yes, this could happen
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

const dealerPlaysCard = (props, card) => {
  const {game} = props;

  // remove card from dealer hand
  const newDealerHand = game.dealerHand.filter(function (el) {
    return !_.isEqual(el, card)
  });
  if (!newDealerHand || newDealerHand.length === 0) {
    props.dealerWins();
  }
  else {
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
  }
};

const findDealerCardToPlay = (dealerHand, discardPile, currentSuit) => {
  let possiblePlays = dealerHand.filter(isCardPlayableFunc(discardPile, currentSuit));

  if (!possiblePlays || possiblePlays.length === 0) {
    return null;
  }
  else {
    // sort to play 8's last
    // ** This is mutated.
    possiblePlays.sort((card1, card2) => {
      if (card1.face === 8 && card2.face === 8) {
        return 0;
      }
      else if (card1.face === 8) {
        return 1;
      }
      else if (card2.face === 8) {
        return -1;
      }
      else {
        return 0;
      }
    });

    return possiblePlays[0];
  }
};

const isCardPlayableFunc = (discardPile, currentSuit) => {
  return function (card) {
    return Cards.isCardPlayable(card, discardPile, currentSuit);
  }
};

