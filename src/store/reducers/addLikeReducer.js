import {ADD_LIKE} from '../actions/actionsTypes';

const initialState = {
  id: "0",
  likes: 0
};

const addLikeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_LIKE:
      const movie = action.payload.queryData.results.find(x=> x.id === action.payload.id);
      return {
        ...movie,
        [action.payload.field]: action.payload.value
      };
    default:
      return state;
  }
};

export default addLikeReducer;
