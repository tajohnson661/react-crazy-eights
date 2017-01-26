/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;
import createComponent from 'helpers/shallowRenderHelper';

import Card from 'components/Card';

describe('CardComponent', function () {

  beforeEach(function () {
    this.CardComponent = createComponent(Card);
  });

  it('should have default className of pCard back', function () {
    expect(this.CardComponent.props.className).to.equal('pCard back');
  });

  it('should be a div', function () {
    expect(this.CardComponent.type).to.equal('div');
  });
});

describe('CardComponent options', function () {

  it('should have classname current-suit', function () {
    this.CardComponent = createComponent(Card, { currentSuit: 'Spades' });
    expect(this.CardComponent.props.className).to.equal('current-suit');
  });

  it('should have be clickable back of card', function () {
    this.CardComponent = createComponent(Card, { clickable: true });
    expect(this.CardComponent.props.className).to.equal('pCard back pointer');
  });

  describe('CardComponent player-card', function () {
    beforeEach(function () {
      this.CardComponent = createComponent(Card,
        {
          showFace: true,
          card: {
            suit: 'Hearts'
            , face: '8'
          }
        });
    });

    it('should have class player-card', function () {
      expect(this.CardComponent.props.className).to.equal('player-card');
    });

    it('should have correct suit and rank', function () {
      expect(this.CardComponent.props.children.props.className).to.equal('pCard rank-8 hearts');
    });
  });
});
