import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { movies$ } from '../../data/movies';

const initialState = {
  status: 'idle',
  loadingMovies: true,
  loadingCategories: true,
  results: [],
  filteredMovies: [],
  filteredMoviesCount: 0,
  countAll: 0,
  categories: [],
  filters: {category: null},
  pageNumber: 1,
  pageSize: 4
};


export const getAllMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const movies = await movies$;

    return movies;
  }
);

export const getCategoriesAsync = createAsyncThunk(
  'movies/fetchCategories',
  async () => {
    const movies = await movies$;
    const categories = [...new Set(movies.map(movie=> movie.category))]

    return categories;
  }
);


export const loadMoviesAndCategories = () => (dispatch, getState) => {
  dispatch(getAllMoviesAsync());
  const currentValue = isLoadingMovies(getState());
  if (!currentValue) {
    dispatch(getCategoriesAsync());
  }
};


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetFilters: (state) => {
      return {
        ...state,
        filters: {category: null}
      }
    },
    filterByCategory: (state, action) => {
      return {
        ...state,
        filteredMovies: [...state.results].filter(movie => movie.category === action.payload.category).slice((state?.pageNumber - 1) * state?.pageSize, state?.pageNumber * state?.pageSize),
        filters: action.payload,
        filteredMoviesCount: [...state.results].filter(movie => movie.category === action.payload.category).length
      }
    },
    prevPage: (state) => {
      state.pageNumber -= 1;
    },
    nextPage: (state) => {
      state.pageNumber += 1;
    },
    delMovie: (state, action) => {
      state.results = [...state.results].filter(movie => movie.id !== action.payload);
      state.filteredMovies = [...state.filteredMovies].filter(movie => movie.id !== action.payload);
      state.filteredMoviesCount -= 1;
    },
    toggleLikeMovie: (state, action) => {
      state.results = state.results.map(movie=> movie.id === action.payload.id ? {...movie, likes: action.payload.likes, liked: action.payload.liked} : movie)
      state.filteredMovies = state.filteredMovies.map(movie=> movie.id === action.payload.id ? {...movie, likes: action.payload.likes, liked: action.payload.liked} : movie)
    },
    toggleDislikeMovie: (state, action) => {
      state.results = state.results.map(movie=> movie.id === action.payload.id ? {...movie, dislikes: action.payload.dislikes, disliked: action.payload.disliked} : movie)
      state.filteredMovies = state.filteredMovies.map(movie=> movie.id === action.payload.id ? {...movie, dislikes: action.payload.dislikes, disliked: action.payload.disliked} : movie)
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllMoviesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.results = action.payload;
        state.loadingMovies = false
      })
      .addCase(getCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
        state.loadingCategories = false
      });
  },
});

export const { getCategories, filterByCategory, resetFilters, prevPage, nextPage, delMovie, likeMovie, unlikeMovie, dislikeMovie, undislikeMovie, toggleLikeMovie, toggleDislikeMovie} = moviesSlice.actions;

export const isLoadingMovies = (state) => state.movies.loading;
export const moviesData = (state) => state.movies.results;
export const categoriesData = (state) => state.movies.categories;

export default moviesSlice.reducer;
