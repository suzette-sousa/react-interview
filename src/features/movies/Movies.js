import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  getAllMoviesAsync,
  isLoadingMovies,
  moviesData,
  categoriesData,
  filterByCategory,
  setPage,
  prevPage,
  nextPage,
  delMovie,
  toggleLikeMovie,
  toggleDislikeMovie,
} from './moviesSlice';

import Styles from "./Movies.module.scss";

const Movies = () => {
  const categories = useSelector(categoriesData);
  const loading = useSelector(isLoadingMovies);
  const filteredMovies = useSelector((state) => state.movies.filteredMovies);
  const filters = useSelector((state) => state.movies.filters);
  const filteredMoviesCount = useSelector((state) => state.movies.filteredMoviesCount);
  const moviesCount = useSelector(moviesData).length;
  const allLikes = useSelector((state) => state.movies.allLikes);
  const allDislikes = useSelector((state) => state.movies.allDislikes);
  const pageNumber = useSelector((state) => state.movies.pageNumber);
  const moviesDisplayedCount = filters.category ? filteredMoviesCount : moviesCount;

  const nbPages = Math.ceil(moviesDisplayedCount/ 4);
  const dispatch = useDispatch();

  const [displaySelectOptions, setDisplaySelectOptions] = useState(false);
  const [filterCategory, setFilterCategory] = useState(false);
  
  useEffect(() => {
    dispatch(getAllMoviesAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(filterByCategory({category: filterCategory !== false ? filterCategory : filters?.category }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory, moviesCount, filteredMoviesCount, pageNumber, allLikes, allDislikes])

  useEffect(() => {
    if(!filteredMovies.length && filteredMoviesCount > 0) dispatch(prevPage());
    if(!filteredMovies.length && filteredMoviesCount === 0) onResetFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredMovies.length])

  const onfilterByCategory = (e) => {
    dispatch(setPage(1));
    setFilterCategory(e.target.innerHTML);
    setDisplaySelectOptions(!displaySelectOptions);
  }

  const onToggleLike = (movie) => {
    dispatch(toggleLikeMovie({id: movie.id, likes: !movie.liked ? movie.likes + 1 : movie.likes - 1, liked: !movie.liked}));
  }

  const onToggleDislike = (movie) => {
    dispatch(toggleDislikeMovie({id: movie.id, dislikes: !movie.disliked ? movie.dislikes + 1 : movie.dislikes - 1, disliked: !movie.disliked}));
  }

  const onDeleteMovie = (movie) => {
    dispatch(delMovie(movie.id));
    dispatch(filterByCategory({category: filters?.category}));
  }

  const onPaginate = (whichPage) => {
    if(whichPage === 'next') dispatch(nextPage());
    if(whichPage === 'prev') dispatch(prevPage());
    dispatch(filterByCategory({category: filters?.category}));
  }

  const onResetFilters = () => {
    setFilterCategory(null)
  }

  return (
    <>
      {!loading && (
        <>
        <section>
          <h1 className={Styles.title}>Liste des films</h1>

          <p>{moviesCount} film{moviesCount > 1 && "s"} répertorié{moviesCount > 1 && "s"}</p>
          <div className={Styles.selectWrapper}>
            <div className={Styles.selectOptionWrapper}>
              {filters?.category && <span className={Styles.closeSelectOption} onClick={() => onResetFilters()}>X</span>}
              <span className={Styles.selectOption} onClick={() => setDisplaySelectOptions(!displaySelectOptions)}>
                {categories.filter((category) => category === filters?.category).length
                  ? categories.filter((category) => category === filters?.category) 
                  : "Sélectionner une catégorie"}</span>
            </div>
            

            {displaySelectOptions && (
              <div className={Styles.selectDisplayOptions}>
                <div className={Styles.selectOptionWrapper}>
                  {categories.filter((category) => category !== filters?.category).map((category, index) => (
                    <div key={index} onClick={(e) => onfilterByCategory(e)} className={Styles.selectOption}>{category}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={Styles.list}>
            {filteredMovies?.length > 0 && filteredMovies.map((movie) => (
              <div key={movie.id}>
                <div className={Styles.listInner}>
                  <h2>{movie.title}</h2>
                  <p>{movie.category}</p>
                  <p onClick={() => onToggleLike(movie)}>Likes {movie.likes}</p>
                  <p onClick={() => onToggleDislike(movie)}>Dislikes {movie.dislikes}</p>
                  <span className={Styles.btnDelete} onClick={() => onDeleteMovie(movie)}>X</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {filters?.category && filteredMoviesCount !== moviesCount && <p>{filteredMoviesCount} résultat{filteredMoviesCount > 1 && "s"}</p>}
        {moviesDisplayedCount > 0 && (
          <>
            <span>Page : {pageNumber} / {nbPages}</span>

            <div className={Styles.inputPrevNext}>
              {pageNumber > 1 && <span onClick={() => onPaginate('prev')} className={Styles.inputPrev}>Précédent</span>}
              {pageNumber < nbPages && <span onClick={() => onPaginate('next')} className={Styles.inputNext}>Suivant</span>}
            </div>
          </>
        )}
        </>
      )}
    </>
  );
}

export default Movies;
