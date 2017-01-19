import {
  START_GAME, SET_MESSAGE, PLAYER_PLAYED, PLAYER_WINS, DEALER_DRAWS, PLAYER_DRAWS,
  DEALER_PLAYED, DEALER_WINS, SET_SUIT
} from '../actions/index';
import {initialDeck, shuffleDeck, dealCards, getCurrentSuitFromDiscard} from '../modules/Cards';
import {List, Map} from 'immutable';


const initialState = Map({
  shuffledDeck: List()
  , playerHand: List()
  , dealerHand: List()
  , discardPile: List()
  , currentSuit: 'Hearts'
  , inProgress: false
  , message: 'Welcome to Crazy Eights'
  , showDialog: false
});

export default function (state = initialState, action) {
  let newState = Map({});

  switch (action.type) {
    case START_GAME:
      const allHands = dealCards(shuffleDeck(initialDeck()));
      newState = Map({
          inProgress: true
          , shuffledDeck: allHands.get('remainingDeck')
          , playerHand: allHands.get('playerHand')
          , dealerHand: allHands.get('dealerHand')
          , discardPile: allHands.get('discardPile')
          , currentSuit: getCurrentSuitFromDiscard(allHands.get('discardPile'))
          , message: 'To play, click on a card in your hand or draw'
        }
      );
      break;

    case SET_MESSAGE:
      newState = Map({
        message: action.payload
      });
      break;

    case DEALER_DRAWS:
      newState = Map({
        shuffledDeck: action.payload.shuffledDeck
        , dealerHand: action.payload.dealerHand
        , discardPile: action.payload.discardPile
      });
      break;

    case PLAYER_DRAWS:
      newState = Map({
        shuffledDeck: action.payload.shuffledDeck
        , playerHand: action.payload.playerHand
        , discardPile: action.payload.discardPile
        , message: action.payload.message
      });
      break;

    case PLAYER_PLAYED:
      newState = Map({
        message: action.payload.message
        , playerHand: action.payload.playerHand
        , discardPile: action.payload.discardPile
        , currentSuit: action.payload.currentSuit
        , showDialog: action.payload.showDialog
      });
      break;

    case DEALER_PLAYED:
      newState = Map({
        message: action.payload.message
        , dealerHand: action.payload.dealerHand
        , discardPile: action.payload.discardPile
        , currentSuit: action.payload.currentSuit
      });
      break;

    case PLAYER_WINS:
      newState = Map({
        message: 'You win!!!'
        , inProgress: false
      });
      break;

    case DEALER_WINS:
      newState = Map({
        message: 'Dealer wins!'
        , inProgress: false
      });
      break;

    case SET_SUIT:
      newState = Map({
        currentSuit: action.payload
        , showDialog: false
      });
      break;
  }
  return state.merge(newState);
}


