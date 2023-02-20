import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { movies$ } from '../../data/movies';

const initialState = {
  status: 'idle',
  loadingMovies: true,
  results: [],
  filteredMovies: [],
  filteredMoviesCount: 0,
  countAll: 0,
  categories: [],
  filters: {category: null},
  pageNumber: 1,
  pageSize: 4,
  allLikes: 0,
  allDislikes: 0,
};

export const getAllMoviesAsync = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const movies = await movies$;

    return movies;
  }
);

export const filterByCategory = createAsyncThunk(
  'movies/getMoviesByCategory',
  async (payload, store) => {
    const movies = await store.getState().movies.results;
    const filteredMovies = payload.category ? movies.filter(movie => movie.category === payload.category) : movies;

    return {filteredMovies: filteredMovies, filters: payload};
  }
);

export const delMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (payload, store) => {
    const moviesBeforeDelete = await store.getState().movies.results;
    const movies = moviesBeforeDelete.filter(movie => movie.id !== payload)
    return movies;
  }
);

export const toggleLikeMovie = createAsyncThunk(
  'movies/toggleLikeMovies',
  async (payload, store) => {
    const movies = await store.getState().movies.results;
    const isLikedMovies = movies.map(movie=> movie.id === payload.id ? {...movie, likes: payload.likes, liked: payload.liked} : movie);
    return {movies: isLikedMovies, likes: payload.likes};
  }
);

export const toggleDislikeMovie = createAsyncThunk(
  'movies/toggleDislikeMovies',
  async (payload, store) => {
    const movies = await store.getState().movies.results;
    const isDislikedMovies = movies.map(movie=> movie.id === payload.id ? {...movie, dislikes: payload.dislikes, disliked: payload.disliked} : movie);
    return {movies: isDislikedMovies, dislikes: payload.dislikes};
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pageNumber = action.payload
    },
    prevPage: (state) => {
      state.pageNumber -= 1;
    },
    nextPage: (state) => {
      state.pageNumber += 1;
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
        state.filteredMovies = action.payload.slice((state.pageNumber - 1) * state.pageSize, state.pageNumber * state.pageSize);
        state.categories = [...new Set(action.payload.map(movie=> movie.category))]
        state.loadingMovies = false
      })
      .addCase(filterByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(filterByCategory.fulfilled, (state, action) => {
        state.status = 'idle';
        state.filteredMovies = action.payload.filteredMovies.slice((state?.pageNumber - 1) * state?.pageSize, state?.pageNumber * state?.pageSize);
        state.filters = action.payload.filters;
        state.filteredMoviesCount = action.payload.filteredMovies.length;
        state.categories = [...new Set(state.results.map(movie=> movie.category))]
      })
      .addCase(delMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(delMovie.fulfilled, (state, action) => {
        state.results = action.payload;
      })
      .addCase(toggleLikeMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleLikeMovie.fulfilled, (state, action) => {
        state.results = action.payload.movies;
        state.allLikes += action.payload.likes;
      })
      .addCase(toggleDislikeMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(toggleDislikeMovie.fulfilled, (state, action) => {
        state.results = action.payload.movies;
        state.allDislikes += action.payload.dislikes;
      })
  },
});

export const {setPage, prevPage, nextPage, resetFilters} = moviesSlice.actions;

export const isLoadingMovies = (state) => state.movies.loading;
export const moviesData = (state) => state.movies.results;
export const categoriesData = (state) => state.movies.categories;

export default moviesSlice.reducer;
