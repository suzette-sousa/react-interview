import {store} from '../store';
import {DEL_MOVIE} from './actionsTypes';

export const delMovie = (id) => {
  const {delMovie} = store.getState();
  return {
    type: DEL_MOVIE,
    payload: {
      id,
      delMovie: delMovie
    }
  }
};
