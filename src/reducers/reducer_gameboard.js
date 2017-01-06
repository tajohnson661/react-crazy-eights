import { START_GAME } from '../actions/index';
import { initialDeck, shuffleDeck, dealCards, getCurrentSuitFromDiscard } from '../modules/Cards';

const initialState = {
  shuffledDeck : []
  , playerHand : []
  , dealerHand : []
  , discardPile : []
  , currentSuit : 'Hearts'
  , inProgress : false
  , message : null
  , showDialog : false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      const allHands = dealCards(shuffleDeck(initialDeck()));

      return {
        ... state
        , inProgress : true
        , shuffledDeck : allHands.remainingDeck
        , playerHand : allHands.playerHand
        , dealerHand : allHands.dealerHand
        , discardPile : allHands.discardPile
        , currentSuit : getCurrentSuitFromDiscard(allHands.discardPile)
        , message : 'To play, click on a card in your hand or draw'
      };
  }
  return state;
}