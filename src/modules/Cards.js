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
export function initialDeck() {
  return allCards(faces, suits);
}

// Shuffle a deck of cards
export function shuffleDeck(deck) {
   return _.sortBy(deck.map(addSortIndex), 'sortIndex').map(removeSortIndex);
}

// Deal a deck of cards by returning on object containing hands for the dealer, player.  Also
// create an initial discard pile with one card.
export function dealCards(deck) {
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
}

export function getCurrentSuitFromDiscard(deck) {
  let currentSuit = 'Hearts';
  if (deck) {
    const firstCard = deck[0];
    if (firstCard) {
      currentSuit = firstCard.suit;
    }
  }
  return currentSuit;
}

function addSortIndex(card) {
  return { ...card, sortIndex : Math.floor(Math.random()*101) }
}

function removeSortIndex({suit, face}) {
  return {
    suit, face
  }
}

function allCards(faces, suits) {
  return _.flatten(listsToObjList(faces, suits));
}

function listsToObjList(faces, suits) {
  return suits.map(familyMap(faces));
}

function familyMap(faces) {
  return function(aSuit) {
    return faces.map(getTuple(aSuit));
  }
}

function getTuple(aSuit) {
  return function(aFace) {
    return {
      suit: aSuit
      , face: aFace
    }
  }
}
