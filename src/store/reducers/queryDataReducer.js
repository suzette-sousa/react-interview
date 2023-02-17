import {ADD_LIKE, GET_QUERYDATA, DEL_MOVIE} from '../actions/actionsTypes';

const initialState = {
  loading: true,
  results: [],
  countResults: 0,
  countAll: 0,
  categories: [],
  filters: null,
  pageNumber: 1,
  pageSize: 4,
  deletedMovies: []
}

const queryDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUERYDATA:
      console.log('tsdfgjh', action.payload.results.filter(movie => movie.deleted !== true));
      return {
        ...state,
        results: action.payload.results.filter(movie => !action.payload.filters?.category ? movie : movie.category === action.payload.filters?.category).slice((action.payload?.pageNumber - 1) * action.payload?.pageSize, action.payload?.pageNumber * action.payload?.pageSize),
        filters: action.payload.filters,
        countResults: action.payload.results.filter(movie => !action.payload.filters?.category ? movie : movie.category === action.payload.filters?.category).length,
        countAll: action.payload.results.length,
        categories: [...new Set(action.payload.results.map(movie=> movie.category))],
        loading: false,
        pageNumber: action.payload?.pageNumber,
        pageSize: action.payload?.pageSize,
        deletedMovies: action.payload?.deletedMovies
      }
    case ADD_LIKE:
      return {
        ...state,
        results: state.results.map(movie=> movie.id === action.payload.id ? {...movie, likes: action.payload.value, liked: true} : movie),
        loading: false
      }
    case DEL_MOVIE:
      console.log('state.deletedMovies', state)
      return {
        ...state,
/*         results: state.deletedMovies, */
        results: state.results.map(movie=> movie.id === action.payload.id ? {...movie, deleted: true} : movie).filter(movie => !movie.deleted),
        countResults: state.countResults - 1,
        loading: false,
        deletedMovies: action.payload.deletedMovies
      }
    default:
      return state;
  }
}

export default queryDataReducer;
