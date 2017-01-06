import React from 'react';


export default (props) => {
  if (props.showFace) {

    const { suitClass, suitText } = getSuitPaintInfoFromSuit(props.suit);
    const { faceClass, faceText } = getFacePaintInfoFromFace(props.face);
    const classText = `pCard ${faceClass} ${suitClass}`;

    return (
      <div className="player-card">

        <div className={'pointer ' + classText}>
          <span className="rank">{faceText}</span>
          <span className="suit">{suitText}</span>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="pCard back test-style">*</div>
    )
  }
}

function getSuitPaintInfoFromSuit(suit) {

  let suitClass, suitText;

  if (suit === 'Hearts') {
      suitClass = 'hearts';
      suitText = '♥';
  }
  else if (suit === 'Diamonds') {
    suitClass = 'diams';
    suitText = '♦';
  }
  else if (suit === 'Spades') {
    suitClass = 'spades';
    suitText = '♠';
  }
  else {
    suitClass = 'clubs';
    suitText = '♣';
  }
  return {
    suitClass
    , suitText
  };
}

function getFacePaintInfoFromFace(face) {
  let faceClass, faceText;

  if (face === 1) {
    faceClass = 'rank-a';
    faceText = 'A';
  }
  else if (face === 11) {
    faceClass = 'rank-j';
    faceText = 'J';
  }
  else if (face === 12) {
    faceClass = 'rank-q';
    faceText = 'Q';
  }
  else if (face === 13) {
    faceClass = 'rank-k';
    faceText = 'K';
  }
  else {
    faceClass = 'rank-' + face;
    faceText = '' + face;
  }

  return {
    faceClass
    , faceText
  }
}
