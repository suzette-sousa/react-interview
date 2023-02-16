import React from 'react';
import { useDispatch} from 'react-redux';
import { addLike } from '../store/actions/addLikeAction';

const Movie = (props) => {
  const {movieDetails} = props;

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
    </div>
  );
}

export default Movie;
