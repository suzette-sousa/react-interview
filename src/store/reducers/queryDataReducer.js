import {GET_QUERYDATA} from '../actions/actionsTypes';

const initialState = {
  loading: true
}

const queryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERYDATA:
      return {
        ...state,
        results: action.payload,
        loading: false
      }
    default:
      return state;
  }
}

export default queryDataReducer;
