import React from 'react';

const Movie = (props) => {
  const {movieDetails} = props;
  
  return (
    <div>
      <h3><strong>{movieDetails.title}</strong></h3>
      {" "}<span>{movieDetails.category}</span>
      <p>
        <span>Nb likes : {movieDetails.likes}</span>{" "}<span>Nb dislikes : {movieDetails.likes}</span>
      </p>
    </div>
  );
}

export default Movie;
