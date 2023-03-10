import React, { useEffect, useRef, useState } from 'react';

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
} from '../../features/movies/moviesSlice';

import Styles from "./Movies.module.scss";

import MovieCard from '../MovieCard/MovieCard';

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
  }

  const onfilterOptionsCategories = (e) => {
    onfilterByCategory(e);
    setDisplaySelectOptions(!displaySelectOptions);
  }

  const onPaginate = (whichPage) => {
    if(whichPage === 'next') dispatch(nextPage());
    if(whichPage === 'prev') dispatch(prevPage());
    dispatch(filterByCategory({category: filters?.category}));
  }

  const onResetFilters = () => {
    setFilterCategory(null)
  }

  const selectDisplayOptions = useRef(null);

  const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = (event) => {
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      }, [ref, handler]);
  }

  useOnClickOutside(selectDisplayOptions, () => setDisplaySelectOptions(false));

  return (
    <>
      {!loading && (
        <>
        <section>
          <h1 className={Styles.title}>Liste des films</h1>

          <p>{moviesCount} film{moviesCount > 1 && "s"} r??pertori??{moviesCount > 1 && "s"}</p>

          <div className={Styles.selectWrapper}>
            <div className={Styles.selectOptionWrapper}>
              {filters?.category && <span className={Styles.closeSelectOption} onClick={() => onResetFilters()}>X</span>}
              <span className={Styles.selectOption} onClick={() => setDisplaySelectOptions(!displaySelectOptions)}>
                {categories.filter((category) => category === filters?.category).length
                  ? categories.filter((category) => category === filters?.category) 
                  : "S??lectionner une cat??gorie"}</span>
            </div>

            {displaySelectOptions && (
              <div className={Styles.selectDisplayOptions} ref={selectDisplayOptions}>
                <div className={Styles.selectOptionWrapper}>
                  {categories.filter((category) => category !== filters?.category).map((category, index) => (
                    <div key={index} onClick={(e) => onfilterOptionsCategories(e)} className={Styles.selectOption}>{category}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={Styles.list}>
            {filteredMovies?.length > 0 && filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onfilterByCategory={(e) => onfilterByCategory(e)} />
            ))}
          </div>
        </section>

        <p>{filteredMoviesCount} r??sultat{filteredMoviesCount > 1 && "s"}</p>
        {moviesDisplayedCount > 0 && (
          <>
            <span>Page : {pageNumber} / {nbPages}</span>

            <div className={Styles.inputPrevNext}>
              {pageNumber > 1 && <span onClick={() => onPaginate('prev')} className={Styles.inputPrev}>Pr??c??dent</span>}
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
