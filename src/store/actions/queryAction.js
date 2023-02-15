import {GET_QUERYDATA, QUERYDATA_ERROR} from './actionsTypes';
import {movies$} from '../../data/movies';

export const getQueryData = () => async dispatch => {
  movies$
  .then(response => {
    dispatch({
      type: GET_QUERYDATA,
      payload: response.sort((a, b) => a.name > b.name ? 1:-1),
    })
  })
  .catch(error => {
    dispatch({
      type: QUERYDATA_ERROR,
      payload: console.log(error)
    })
  })
}
