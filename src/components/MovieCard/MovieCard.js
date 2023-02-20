import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  filterByCategory,
  delMovie,
  toggleLikeMovie,
  toggleDislikeMovie,
  setPage,
} from '../../features/movies/moviesSlice';

import Styles from "./MovieCard.module.scss";

import {ReactComponent as LikeIcon}  from "../../assets/svg/like.svg";
import {ReactComponent as DislikeIcon}  from "../../assets/svg/like.svg";

const Movie = (props) => {
  const {movie, onfilterByCategory} = props;
  const filters = useSelector((state) => state.movies.filters);

  const dispatch = useDispatch();

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

  return (
    <div key={movie.id}>
      <div className={Styles.listInner}>
        <div className={Styles.movieTitle}>
          <h2>{movie.title}</h2>
          <span className={Styles.btnDelete} onClick={() => onDeleteMovie(movie)}>X</span>
        </div>
        <span className={Styles.category}>
          <span className={Styles.label} onClick={(e) => onfilterByCategory(e)}>{movie.category}</span>
        </span>
        <span className={Styles.ctas}>
          <button onClick={() => onToggleLike(movie)} className={movie.liked ? Styles.ctaActive : Styles.cta} disabled={movie.disliked}>
            <LikeIcon />{movie.likes}
          </button>
          <button onClick={() => onToggleDislike(movie)} className={movie.disliked ? Styles.ctaActive : Styles.cta} disabled={movie.liked}>
            <DislikeIcon />{movie.dislikes}
          </button>
        </span>
      </div>
    </div>
  );
}

export default Movie;
