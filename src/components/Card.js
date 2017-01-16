import React from 'react';


export default (props) => {
  if (props.currentSuit) {
    const {suitText, suitColor} = getSuitPaintInfoFromSuit(props.currentSuit);
    const divStyle = {
      color: suitColor
    };
    return (
      <div className="current-suit" style={divStyle}>
        {suitText}
      </div>
    )
  }
  else if (props.showFace) {

    const { suitClass, suitText } = getSuitPaintInfoFromSuit(props.card.suit);
    const { faceClass, faceText } = getFacePaintInfoFromFace(props.card.face);
    const classText = `pCard ${faceClass} ${suitClass}`;

    if (props.clickable) {
      return (
        <div className="player-card" onClick={() => props.onCardClick(props.card)}>
          <div className={'pointer ' + classText}>
            <span className="rank">{faceText}</span>
            <span className="suit">{suitText}</span>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="player-card">
          <div className={classText}>
            <span className="rank">{faceText}</span>
            <span className="suit">{suitText}</span>
          </div>
        </div>
      )
    }
  }
  else {
    if (props.clickable) {
      return (
        <div className="pCard back pointer" onClick={() => props.onCardClick(props.card)}>*</div>
      )
    }
    else {
      return (
        <div className="pCard back">*</div>
      )

    }
  }
}

function getSuitPaintInfoFromSuit(suit) {

  let suitClass, suitText, suitColor;

  if (suit === 'Hearts') {
      suitClass = 'hearts';
      suitText = '♥';
      suitColor = 'red';
  }
  else if (suit === 'Diamonds') {
    suitClass = 'diams';
    suitText = '♦';
    suitColor = 'red';
  }
  else if (suit === 'Spades') {
    suitClass = 'spades';
    suitText = '♠';
    suitColor = 'black';
  }
  else {
    suitClass = 'clubs';
    suitText = '♣';
    suitColor = 'black';
  }
  return {
    suitClass
    , suitText
    , suitColor
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
