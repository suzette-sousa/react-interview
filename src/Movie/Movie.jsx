import React from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { addLike } from '../store/actions/addLikeAction';
import { delMovie } from '../store/actions/delMovieAction';
import { getQueryData } from '../store/actions/queryAction';

const Movie = (props) => {
  const {movieDetails} = props;
/* 
  const pageSize = useSelector((state) => state.queryData.pageSize);
  const filters = useSelector((state) => state.queryData.filters); */

  const dispatch = useDispatch();

  const toggleLike = (movieId, movieLikes) => {
    if(!movieDetails.liked) dispatch(addLike(movieId, 'likes', movieLikes + 1));
  }

  return (
    <div>
      <h3>{movieDetails.title}</h3>
      <p><span>{movieDetails.category}</span></p>
      <p onClick={() => toggleLike(movieDetails.id, movieDetails.likes)}>Nb likes : {movieDetails.likes}</p>
      <p>Nb dislikes : {movieDetails.dislikes}</p>
      <span onClick={() => {
        dispatch(delMovie(movieDetails.id));
      }}>Supprimer</span>
    </div>
  );
}

export default Movie;
