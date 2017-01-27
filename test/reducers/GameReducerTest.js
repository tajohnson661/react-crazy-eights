import gameReducer from '../../src/reducers/reducer_gameboard';
import { Map, List } from 'immutable';
import { START_GAME } from '../../src/actions';

describe('Game Reducer', function () {

  describe('Initial state', function () {
    let defaultState;

    beforeEach(function() {
      defaultState = gameReducer(undefined, {}).toJS();
    });

    it('initial state is an object', () => {
      expect(defaultState).to.be.instanceOf(Object);
    });

    it('initial message', () => {
      expect(defaultState.message).to.eql('Welcome to Crazy Eights');
    });
  });

  describe('Start game', function () {
    let initialState;
    let state;

    beforeEach(function() {
      initialState = Map({
        shuffledDeck: List()
        , playerHand: List()
        , dealerHand: List()
        , discardPile: List()
        , currentSuit: 'Hearts'
        , inProgress: false
        , message: 'Welcome to Crazy Eights'
        , showDialog: false
      });
    });

    describe('State game state', function () {

      let action;

      beforeEach(function () {
        action = {
          type: START_GAME
          , payload: null
        };
        state = gameReducer(initialState, action).toJS();
      });

      it('start game state inProgress', () => {
        expect(state.inProgress).to.equal(true);
      });

      it('start game state discardPile', () => {
        expect(state.discardPile.length).to.equal(1);
      });

      it('start game state playerHand', () => {
        expect(state.playerHand.length).to.equal(8);
        expect(state.dealerHand.length).to.equal(8);
      });
      it('start game state currentSuit to be a string', () => {
        expect(state.currentSuit).to.be.a('string');
      });

    });

  });


});
