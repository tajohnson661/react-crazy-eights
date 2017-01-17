export const START_GAME = 'START_GAME';
export const SET_MESSAGE = 'SET_MESSAGE';
export const PLAYER_PLAYED = 'PLAYER_PLAYED';
export const DEALER_PLAYS = 'DEALER_PLAYS';
export const PLAYER_WINS = 'PLAYER_WINS';
export const DEALER_DRAWS = 'DEALER_DRAWS';
export const PLAYER_DRAWS = 'PLAYER_DRAWS';
export const DEALER_PLAYED = 'DEALER_PLAYED';
export const DEALER_WINS = 'DEALER_WINS';

// Action creator returns action object
export function startGame() {

  return {
    type: START_GAME
    , payload: null
  }
}

export function setMessage(msg) {
  return {
    type : SET_MESSAGE
    , payload : msg
  }
}

export function playerPlayed(data) {
  return {
    type : PLAYER_PLAYED
    , payload : data
  }
}

export function dealerPlays() {
  return {
    type : DEALER_PLAYS
    , payload : null
  }
}

export function dealerPlayed(data) {
  return {
    type : DEALER_PLAYED
    , payload : data
  }
}

export function playerWins() {
  return {
    type : PLAYER_WINS
    , payload : null
  }
}

export function dealerDraws(data) {
  return {
    type : DEALER_DRAWS
    , payload : data
  }
}

export function playerDraws(data) {
  return {
    type : PLAYER_DRAWS
    , payload : data
  }
}

export function dealerWins() {
  return {
    type : DEALER_WINS
    , payload : null
  }
}
