import { createStore, combineReducers } from 'redux';

import movies from './reducers/movies';
import genres from './reducers/genres';
import highScore from "./reducers/highscore";
import gameMode from "./reducers/gamemode";
import QuestionTest from "./reducers/questionsTestReducer";
import backImg from "./reducers/backgroundImg";

const reducer = combineReducers({
  backImg,
  QuestionTest,
  movies,
  genres,
  highScore,
  gameMode
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
