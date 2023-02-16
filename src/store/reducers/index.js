import {combineReducers} from 'redux';
import addLikeReducer from './addLikeReducer';
import queryDataReducer from './queryDataReducer';

export default combineReducers({
  queryData: queryDataReducer,
  addLike: addLikeReducer
});
