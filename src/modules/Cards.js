// Cards.js
//
// A set of functions that manage a deck of cards
// A deck of cards will be of the form...
//    [ {suit: "Spades", face: 1}, {suit: "Hearts", face: 13}, ...]
//    Ace = 1, Jack = 11, Queen = 12, King = 13
//
import { List, Map, Range } from 'immutable';


const faces = Range(1, 14);
const suits = List(['Hearts', 'Clubs', 'Diamonds', 'Spades']);

// Create a deck of cards.
export const initialDeck = () => {
  return allCards(faces, suits);
};

// Shuffle a deck of cards
export const shuffleDeck = deck => {
   return deck.map(addSortIndex).sortBy(card => card.get('sortIndex')).map(removeSortIndex);
};

// Deal a deck of cards by returning on object containing hands for the dealer, player.  Also
// create an initial discard pile with one card.
export const dealCards = deck => {
  const playerHand = deck.slice(0, 8);
  const dealerHand = deck.slice(8, 16);
  const discardPile = deck.slice(16, 17);
  const remainingDeck = deck.takeLast(35);

  return Map({
    playerHand
    , dealerHand
    , discardPile
    , remainingDeck
  })
};

export const getCurrentSuitFromDiscard = deck => {
  let currentSuit = 'Hearts';
  if (deck) {
    const firstCard = deck.first();
    if (firstCard) {
      currentSuit = firstCard.get('suit');
    }
  }
  return currentSuit;
};

const addSortIndex = card => {
  return card.set('sortIndex', Math.floor(Math.random()*101));
};

const removeSortIndex = card => {
  return card.delete('sortIndex');
};

export const allCards = (faces, suits) => {
  return (listsToObjList(faces, suits).flatten(true));
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
    return Map({
      suit: aSuit
      , face: aFace
    })
  }
};

export const isCardPlayable = (card, discardPile, currentSuit) => {
  const topCard = discardPile.first();
  if (!topCard || !card) {
    return false;
  }
  else if (card.get('face') === 8) {
      return true;
  }
  else if (card.get('face') === topCard.get('face')) {
    return true;
  }
  else if (card.get('suit') === currentSuit) {
    return true;
  }
  return false;
};

export const getMostProlificSuit = deck => {
  // count each suit (reduce)
  const initial = Map({
    Hearts : 0
    , Clubs : 0
    , Spades : 0
    , Diamonds : 0
  });
  const final = deck.reduce(addToCount, initial);
  const finalAsIterable = final.keySeq().map(key => {
    return Map({
      suit : key
      , count : final.get(key)
    })
  });
  const sortedFinal = finalAsIterable.sortBy(data => data.get('count')).reverse();
  return sortedFinal.first().get('suit');
};

const addToCount = (current, card) => {
  return current.set(card.get('suit'), current.get(card.get('suit')) + 1);
};

export const toFullString = card => {
  return (toFaceName(card.get('face')) + ' of ' + card.get('suit'));
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
