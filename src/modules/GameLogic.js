import * as Cards from '../modules/Cards';
import { List } from 'immutable';



export const playCard = (card, component) => {
  const {game} = component.props;

  if (Cards.isCardPlayable(card, game.get('discardPile'), game.get('currentSuit'))) {
    playerPlaysCard(card, component);
    if (card.get('face') != 8) {
      setTimeout(() => {
        // component's props will have changed, so grab them again to use for the dealer play.
        dealerPlays(component);
      }, 0);
    }
  }
  else {
    component.props.setMessage('You can\'t play that card');
  }
};

export const dealerPlays = component => {
  const {game} = component.props;

  if (game.get('playerHand').size === 0) {
    component.props.playerWins();
  }
  else {
    const card = findDealerCardToPlay(game.get('dealerHand'), game.get('discardPile'), game.get('currentSuit'));
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
  const firstCard = game.get('shuffledDeck').first();
  if (firstCard) {
    const newPlayerHand = game.get('playerHand').unshift(firstCard);
    let newShuffledDeck = game.get('shuffledDeck').shift();
    let newDiscardPile = game.get('discardPile');

    // If deck is empty, regenerate it from discard Pile
    if (!newShuffledDeck || newShuffledDeck.size === 0) {
      newDiscardPile = List([game.get('discardPile').first()]);
      newShuffledDeck = Cards.shuffleDeck(game.get('discardPile').shift());
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
  const firstCard = game.get('shuffledDeck').first();
  if (firstCard) {
    const newDealerHand = game.get('dealerHand').unshift(firstCard);
    let newShuffledDeck = game.get('shuffledDeck').shift();
    let newDiscardPile = game.get('discardPile');

    // If deck is empty, regenerate it from discard Pile
    if (!newShuffledDeck || newShuffledDeck.size === 0) {
      newDiscardPile = List([game.get('discardPile').first()]);
      newShuffledDeck = Cards.shuffleDeck(game.get('discardPile').shift());
    }

    // send that ball of data as new state
    props.dealerDraws({
      shuffledDeck: newShuffledDeck
      , dealerHand: newDealerHand
      , discardPile : newDiscardPile
    });
  }
};

const playerPlaysCard = (card, component) => {
  const {game} = component.props;

  // new player hand <- remove card from player hand
  const newPlayerHand = game.get('playerHand').filter(function (el) {
    return !el.equals(card)
  });
  // add removed card to top/front of discard pile
  const newDiscardPile = game.get('discardPile').unshift(card);

  // if card is an 8, ask for suit
  let newCurrentSuit = card.get('suit');
  let showDialog = false;
  if (card.get('face') === 8) {
    showDialog = true;
  }
  // send that ball of data as new state
  component.props.playerPlayed({
    currentSuit: newCurrentSuit
    , playerHand: newPlayerHand
    , discardPile: newDiscardPile
    , message: ''
    , showDialog: showDialog
  });
};

const dealerPlaysCard = (props, card) => {
  const {game} = props;

  // remove card from dealer hand
  const newDealerHand = game.get('dealerHand').filter(function (el) {
    return !el.equals(card)
  });
  if (!newDealerHand || newDealerHand.size === 0) {
    props.dealerWins();
  }
  else {
    // add removed card to top/front of discard pile
    const newDiscardPile = game.get('discardPile').unshift(card);

    const message = 'Dealer plays the ' + Cards.toFullString(card);
    let newMessage = message;

    // get most prolific suit if it's an 8
    let newCurrentSuit;
    if (card.get('face') === 8) {
      newCurrentSuit = Cards.getMostProlificSuit(newDealerHand);
      newMessage = message + '... New suit: ' + newCurrentSuit;
    }
    else {
      newCurrentSuit = card.get('suit');
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

  if (!possiblePlays || possiblePlays.size === 0) {
    return null;
  }
  else {
    // sort to play 8's last
    const sortedPossiblePlays = possiblePlays.sort((card1, card2) => {
      if (card1.get('face') === 8 && card2.get('face') === 8) {
        return 0;
      }
      else if (card1.get('face') === 8) {
        return 1;
      }
      else if (card2.get('face') === 8) {
        return -1;
      }
      else {
        return 0;
      }
    });

    return sortedPossiblePlays.first();
  }
};

const isCardPlayableFunc = (discardPile, currentSuit) => {
  return function (card) {
    return Cards.isCardPlayable(card, discardPile, currentSuit);
  }
};

