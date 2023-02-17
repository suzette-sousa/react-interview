import {combineReducers} from 'redux';
import addLikeReducer from './addLikeReducer';
import delMovieReducer from './delMovieReducer';
import queryDataReducer from './queryDataReducer';

export default combineReducers({
  queryData: queryDataReducer,
  addLike: addLikeReducer,
  delMovie: delMovieReducer
});
