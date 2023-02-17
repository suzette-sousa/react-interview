import {DEL_MOVIE} from '../actions/actionsTypes';

const initialState = {
/*   id: "0",
  deleted: false, */
  deletedMovies: []
};

const delMovieReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case DEL_MOVIE:
      return {
        ...state,
/*         movie: action.payload.queryData.results.find(movie=> movie.id === action.payload.id),
        deleted: true, */
        deletedMovies: [...state.deletedMovies, action.payload.id]
      };
    default:
      return state;
  }
};

export default delMovieReducer;
