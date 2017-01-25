/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import * as Cards from '../../src/modules/Cards';
import _ from 'lodash';
import { List, Map, Range } from 'immutable';

const faces = Range(1, 4);
const suits = List(['Hearts', 'Clubs']);
const initialDeck = List([
  Map({suit: 'Hearts', face: 1}),
  Map({suit: 'Hearts', face: 2}),
  Map({suit: 'Hearts', face: 3}),
  Map({suit: 'Clubs', face: 1}),
  Map({suit: 'Clubs', face: 2}),
  Map({suit: 'Clubs', face: 3})
]);
const smallDeck = List([
  Map({suit: 'Spades', face: 5}),
  Map({suit: 'Hearts', face: 3}),
  Map({suit: 'Spades', face: 11})
]);
const testCard7ofHearts = Map({suit: 'Hearts', face: 7});
const testCard8ofSpades = Map({suit: 'Spades', face: 8});
const testCard9ofDiamonds = Map({suit: 'Diamonds', face: 9});
const testCardQofClubs = Map({suit: 'Clubs', face: 12});


describe('Card module tests', function () {
  it('check mostProlificSuit', function () {
    expect(Cards.getMostProlificSuit(smallDeck)).to.equal('Spades');
  });

  it('allCards should generate all cards', function () {
    assert.deepEqual(Cards.allCards(faces, suits).toJS(), initialDeck.toJS());
  });

  it('isCardPlayable - 7 of hearts', function () {
    expect(Cards.isCardPlayable(testCard7ofHearts, smallDeck, 'Hearts')).to.equal(true);
  });

  it('isCardPlayable - 8 of spades', function () {
    expect(Cards.isCardPlayable(testCard8ofSpades, smallDeck, 'Hearts')).to.equal(true);
  });

  it('isCardPlayable - 9 of diamonds', function () {
    expect(Cards.isCardPlayable(testCard9ofDiamonds, smallDeck, 'Hearts')).to.equal(false);
  });

  it('shuffleDeck returns array of cards', function () {
    const shuffledDeck = Cards.shuffleDeck(initialDeck).toJS();
    expect(shuffledDeck[0]).to.have.all.keys('suit', 'face');
  });

  describe('Deal Cards', function () {
    const initialDeck = Cards.initialDeck();
    const allHands = Cards.dealCards(initialDeck);

    it('dealCards has discardPile of size 1', function () {
      expect(allHands.get('discardPile').toJS()).to.have.lengthOf(1);
    });

    it('dealCards has playerHand of size 8', function () {
      expect(allHands.get('playerHand').toJS()).to.have.lengthOf(8);
    });

    it('dealCards has remainingHand of size 35', function () {
      expect(allHands.get('remainingDeck').toJS()).to.have.lengthOf(35);
    });

  });

  it('getCurrentSuitFromDiscard returns suit of first card', function () {
    expect(Cards.getCurrentSuitFromDiscard(smallDeck)).to.equal('Spades');
  });

  it('toFullString returns the correct string', function () {
    expect(Cards.toFullString(testCardQofClubs)).to.equal('Queen of Clubs');
  });

});

describe('sample tests', function () {
  // some sample tests to use as examples
  it('should expose the Chai assert method', function () {
    assert.ok('everything', 'everything is ok');
  });

  it('should expose the Chai expect method', function () {
    expect('foo').to.not.equal('bar');
  });

  it('should return -1 when the value is not present', function () {
    assert.equal(-1, [1, 2, 3].indexOf(4));
  });
});

