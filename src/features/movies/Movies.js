import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  loadMoviesAndCategories,
  isLoadingMovies,
  moviesData,
  categoriesData,
  resetFilters,
  filterByCategory,
  setPage,
  prevPage,
  nextPage,
  delMovie,
  toggleLikeMovie,
  toggleDislikeMovie,
} from './moviesSlice';

const Movies = () => {
  const categories = useSelector(categoriesData);
  const loading = useSelector(isLoadingMovies);
  const filteredMovies = useSelector((state) => state.movies.filteredMovies);
  const filters = useSelector((state) => state.movies.filters);
  const filteredMoviesCount = useSelector((state) => state.movies.filteredMoviesCount);
  const moviesCount = useSelector(moviesData).length;
  const pageNumber = useSelector((state) => state.movies.pageNumber);
  const pageSize = useSelector((state) => state.movies.pageSize);
  const movies = useSelector(moviesData).slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  const moviesDisplayed = filters.category ? filteredMovies : movies;
  const moviesDisplayedCount = filters.category ? filteredMoviesCount : moviesCount;

  const nbPages = Math.ceil(moviesDisplayedCount/ 4);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(loadMoviesAndCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if(filters?.category) dispatch(filterByCategory({category: filters?.category}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  const onfilterByCategory = (e) => {
    dispatch(setPage(1));
    dispatch(filterByCategory({category: e.target.innerHTML}))
  }

  const onToggleLike = (movie) => {
    dispatch(toggleLikeMovie({id: movie.id, likes: !movie.liked ? movie.likes + 1 : movie.likes - 1, liked: !movie.liked}));
  }

  const onToggleDislike = (movie) => {
    dispatch(toggleDislikeMovie({id: movie.id, dislikes: !movie.disliked ? movie.dislikes + 1 : movie.dislikes - 1, disliked: !movie.disliked}));
  }

  return (
    <>
      {!loading && (
        <section>
          <h1>Liste des films</h1>

          {filters && <span onClick={() => dispatch(resetFilters())}>Reset filtres</span>}
          <br/><br/>

          <p>{moviesCount} film{moviesCount > 1 && "s"} répertorié{moviesCount > 1 && "s"}</p>
          <br/><br/>
          
          {filters?.category && <span style={{'border': '1px solid'}}>{filters?.category}</span>}
          <br></br>

          {categories.filter((category) => category !== filters?.category).map((category, index) => (
            <div key={index} onClick={(e) => onfilterByCategory(e)}>{category}</div>
          ))}

          {moviesDisplayed?.length > 0 && moviesDisplayed.map((movie) => (
            <div key={movie.id} style={{'border': '1px solid'}}>
              <p>{movie.title}</p>
              <p>{movie.category}</p>
              <p onClick={() => onToggleLike(movie)}>Likes {movie.likes}</p>
              <p onClick={() => onToggleDislike(movie)}>Dislikes {movie.dislikes}</p>
              <span onClick={() => dispatch(delMovie(movie.id))}>SUPPRIMER</span>
            </div>
          ))}

          {filters?.category && filteredMoviesCount !== moviesCount && <p>{filteredMoviesCount} résultat{filteredMoviesCount > 1 && "s"}</p>}
          {moviesDisplayedCount > 0 && (
            <>
              {pageNumber > 1 && <span onClick={() => dispatch(prevPage())}>Précédent</span>}
              <br/>
              <span>Page : {pageNumber}</span>
              <br/>
              nbPages: {nbPages}
              <br/>
              {pageNumber < nbPages && <span onClick={() => dispatch(nextPage())}>Suivant</span>}
            </>
          )}
        </section>
      )}
    </>
  );
}

export default Movies;
