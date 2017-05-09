import { createStore, combineReducers } from 'redux';

import movies from './reducers/movies';
import genres from './reducers/genres';
import highscore from "./reducers/highscore";
import gamemode from "./reducers/gamemode";

const reducer = combineReducers({
  movies,
  genres,
  highscore,
  gamemode

});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
