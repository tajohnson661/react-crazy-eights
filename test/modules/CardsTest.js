/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import * as Cards from '../../src/modules/Cards';
import _ from 'lodash';

const faces = _.range(1, 4);
const suits = ['Hearts', 'Clubs'];
const initialDeck = [
  {suit: 'Hearts', face: 1},
  {suit: 'Hearts', face: 2},
  {suit: 'Hearts', face: 3},
  {suit: 'Clubs', face: 1},
  {suit: 'Clubs', face: 2},
  {suit: 'Clubs', face: 3}
];
const smallDeck = [{suit: 'Spades', face: 5}, {suit: 'Hearts', face: 3}, {suit: 'Spades', face: 11}];
const testCard7ofHearts = {suit: 'Hearts', face: 7};
const testCard8ofSpades = {suit: 'Spades', face: 8};
const testCard9ofDiamonds = {suit: 'Diamonds', face: 9};
const testCardQofClubs = {suit: 'Clubs', face: 12};


describe('Card module tests', function () {
  it('check mostProlificSuit', function () {
    expect(Cards.getMostProlificSuit(smallDeck)).to.equal('Spades');
  });

  it('allCards should generate all cards', function () {
    assert.deepEqual(Cards.allCards(faces, suits), initialDeck);
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
    const shuffledDeck = Cards.shuffleDeck(smallDeck);
    expect(shuffledDeck[0]).to.have.all.keys('suit', 'face');
  });

  describe('Deal Cards', function () {
    const initialDeck = Cards.initialDeck();
    const allHands = Cards.dealCards(initialDeck);

    it('dealCards has discardPile of size 1', function () {
      expect(allHands.discardPile).to.have.lengthOf(1);
    });

    it('dealCards has playerHand of size 8', function () {
      expect(allHands.playerHand).to.have.lengthOf(8);
    });

    it('dealCards has remainingHand of size 35', function () {
      expect(allHands.remainingDeck).to.have.lengthOf(35);
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

