import {ADD_LIKE, GET_QUERYDATA} from '../actions/actionsTypes';

const initialState = {
  loading: true,
  results: [],
  count: 0,
  categories: [],
  filters: null
}

const queryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERYDATA:
      return {
        ...state,
        results: action.payload.results.filter(movie => !action.payload.filters?.category ? movie : movie.category === action.payload.filters?.category),
        filters: action.payload.filters,
        count: action.payload.results.length,
        categories: [...new Set(action.payload.results.map(movie=> movie.category))],
        loading: false
      }
    case ADD_LIKE:
      return {
        ...state,
        results:  state.results.map(movie=> movie.id === action.payload.id ? {...movie, likes: action.payload.value, liked: true} : movie),
        loading: false
      }
    default:
      return state;
  }
}

export default queryDataReducer;
