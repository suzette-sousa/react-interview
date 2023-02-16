import {ADD_LIKE, GET_QUERYDATA} from '../actions/actionsTypes';

const initialState = {
  loading: true,
  results: []
}

const queryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERYDATA:
      return {
        ...state,
        results: action.payload,
        loading: false
      }
      case ADD_LIKE:
        return {
          ...state,
          results:  state.results.map(x=> x.id === action.payload.id ? {...x, likes: action.payload.value, liked: true} : x),
          loading: false
        }
    default:
      return state;
  }
}

export default queryDataReducer;
