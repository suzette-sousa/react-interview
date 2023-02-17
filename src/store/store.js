/* import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const initalState = {};
const middleware = [thunk];
export const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)));
 */
/* export default store;
 */
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

