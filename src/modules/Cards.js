// Cards.js
//
// A set of functions that manage a deck of cards
// A deck of cards will be of the form...
//    [ {suit: "Spades", face: 1}, {suit: "Hearts", face: 13}, ...]
//    Ace = 1, Jack = 11, Queen = 12, King = 13
//
import _ from 'lodash'

const faces = _.range(1, 14);
const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];


// Create a deck of cards.
export const initialDeck = () => {
  return allCards(faces, suits);
};

// Shuffle a deck of cards
export const shuffleDeck = deck => {
   return _.sortBy(deck.map(addSortIndex), 'sortIndex').map(removeSortIndex);
};

// Deal a deck of cards by returning on object containing hands for the dealer, player.  Also
// create an initial discard pile with one card.
export const dealCards = deck => {
  const playerHand = deck.slice(0, 8);
  let tempDeck = _.drop(deck, 8);
  const dealerHand = tempDeck.slice(0, 8);
  tempDeck = _.drop(tempDeck, 8);
  const discardPile = tempDeck.slice(0, 1);
  const remainingDeck = _.drop(tempDeck, 1);

  return {
    playerHand
    , dealerHand
    , discardPile
    , remainingDeck
  }
};

export const getCurrentSuitFromDiscard = deck => {
  let currentSuit = 'Hearts';
  if (deck) {
    const firstCard = deck[0];
    if (firstCard) {
      currentSuit = firstCard.suit;
    }
  }
  return currentSuit;
};

const addSortIndex = card => {
  return { ...card, sortIndex : Math.floor(Math.random()*101) }
};

const removeSortIndex = ({suit, face}) => {
  return {
    suit, face
  }
};

export const allCards = (faces, suits) => {
  return _.flatten(listsToObjList(faces, suits));
};

const listsToObjList = (faces, suits) => {
  return suits.map(familyMap(faces));
};

const familyMap = faces => {
  return aSuit => {
    return faces.map(getTuple(aSuit));
  }
};

const getTuple = aSuit => {
  return aFace => {
    return {
      suit: aSuit
      , face: aFace
    }
  }
};

export const isCardPlayable = (card, discardPile, currentSuit) => {
  const topCard = discardPile[0];
  if (!topCard || !card) {
    return false;
  }
  else if (card.face === 8) {
      return true;
  }
  else if (card.face === topCard.face) {
    return true;
  }
  else if (card.suit === currentSuit) {
    return true;
  }
  return false;
};

export const getMostProlificSuit = deck => {
  // count each suit (reduce)
  const initial = {
    Hearts : 0
    , Clubs : 0
    , Spades : 0
    , Diamonds : 0
  };
  const final = deck.reduce(addToCount, initial);
  const finalAsArray = Object.keys(final).map(function(key) {
    return {
      suit : key
      , count : final[key]
    }
  });
  const sortedFinal = _.sortBy(finalAsArray, 'count').reverse();
  return sortedFinal[0].suit;
};

const addToCount = (current, card) => {
  let data = {
    ... current
  };
  data[card.suit] = current[card.suit] + 1;
  return data;
};

export const toFullString = card => {
  return (toFaceName(card.face) + ' of ' + card.suit);
};

const toFaceName = face => {
  if (face === 1) {
    return 'Ace'
  }
  else if (face === 11) {
    return 'Jack'
  }
  else if (face === 12) {
    return 'Queen'
  }
  else if (face === 13) {
    return 'King'
  }
  else {
    return face;
  }
};
