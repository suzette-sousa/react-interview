import {GET_QUERYDATA, QUERYDATA_ERROR} from './actionsTypes';
import {movies$} from '../../data/movies';

export const getQueryData = (pageNumber = 1, pageSize = 4, filters) => async dispatch => {
  movies$
  .then(response => {
    dispatch({
      type: GET_QUERYDATA,
      payload: {
        results: response,
        filters,
        pageNumber,
        pageSize
      }
    })
  })
  .catch(error => {
    dispatch({
      type: QUERYDATA_ERROR,
      payload: console.log(error)
    })
  })
}
