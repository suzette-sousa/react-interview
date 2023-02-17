import {store} from '../store';
import {ADD_LIKE} from './actionsTypes';

export const addLike = (id, field, value) => {
  const {queryData} = store.getState();
  return {
    type: ADD_LIKE,
    payload: {
      id,
      field,
      value,
      queryData: queryData
    }
  }
};
