import {combineReducers} from 'redux';
import queryDataReducer from './queryDataReducer';

export default combineReducers({
  queryData: queryDataReducer
});
