import {START_GAME, SET_MESSAGE, PLAYER_PLAYED, PLAYER_WINS, DEALER_DRAWS, PLAYER_DRAWS,
        DEALER_PLAYED, DEALER_WINS} from '../actions/index';
import {initialDeck, shuffleDeck, dealCards, getCurrentSuitFromDiscard} from '../modules/Cards';

const initialState = {
  shuffledDeck: []
  , playerHand: []
  , dealerHand: []
  , discardPile: []
  , currentSuit: 'Hearts'
  , inProgress: false
  , message: null
  , showDialog: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      const allHands = dealCards(shuffleDeck(initialDeck()));

      return {
        ... state
        , inProgress: true
        , shuffledDeck: allHands.remainingDeck
        , playerHand: allHands.playerHand
        , dealerHand: allHands.dealerHand
        , discardPile: allHands.discardPile
        , currentSuit: getCurrentSuitFromDiscard(allHands.discardPile)
        , message: 'To play, click on a card in your hand or draw'
      };

    case SET_MESSAGE:
      return {
        ... state
        , message: action.payload
      };

    case DEALER_DRAWS:
      return {
        ... state
        , shuffledDeck: action.payload.shuffledDeck
        , dealerHand: action.payload.dealerHand
        , discardPile: action.payload.discardPile
      };

    case PLAYER_DRAWS:
      return {
        ... state
        , shuffledDeck: action.payload.shuffledDeck
        , playerHand: action.payload.playerHand
        , discardPile : action.payload.discardPile
        , message: action.payload.message
      };

    case PLAYER_PLAYED:
      return {
        ... state
        , message: action.payload.message
        , playerHand: action.payload.playerHand
        , discardPile: action.payload.discardPile
        , currentSuit: action.payload.currentSuit
      };

    case DEALER_PLAYED:
      return {
        ... state
        , message: action.payload.message
        , dealerHand: action.payload.dealerHand
        , discardPile: action.payload.discardPile
        , currentSuit: action.payload.currentSuit
      };

    case PLAYER_WINS:
      return {
        ... state
        , message: 'You win!!!'
        , inProgress: false
      };

    case DEALER_WINS:
      return {
        ... state
        , message: 'Dealer wins!'
        , inProgress: false
      }

  }
  return state;
}


