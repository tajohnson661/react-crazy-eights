import { combineReducers } from 'redux';
import GameReducer from './reducer_gameboard';

const rootReducer = combineReducers({
  game: GameReducer
});

export default rootReducer;
