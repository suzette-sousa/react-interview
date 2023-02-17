import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Movie from '../Movie/Movie';
import { delMovie } from '../store/actions/delMovieAction';
import { getQueryData } from '../store/actions/queryAction';

const Movies = (props) => {
  const {results, loading, countAll, countResults, categories, filters, pageNumber, pageSize} = props.queryData;

  const nbPages = Math.ceil(countResults / pageSize);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQueryData());
  }, [dispatch])

  const filterByCategory = (e) => {
    dispatch(getQueryData(1, pageSize, {category: e.target.innerHTML}))
  }

  return (
    <section>
      <h1>Liste des films</h1>
      {!loading && (
        <div>
          <p>{countAll} film{countAll > 1 && "s"} répertorié{countAll > 1 && "s"}</p>

          {filters?.category && <span  onClick={(e) => dispatch(getQueryData())}>Reset filtres</span>}

          <br/><br/>

          {filters?.category && <>Filtre sélectionné : {filters?.category}</>}
          
          <br/><br/>

          {categories.filter((category) => category !== filters?.category).map((category, index) => (
            <div key={index} onClick={(e) => filterByCategory(e)}>{category}</div>
          ))}

          {countResults !== countAll && <p>{countResults} résultat{countResults > 1 && "s"}</p>}

          {countResults > 0 && results.map((movie) => (
            <div key={movie.id}>
              <Movie movieDetails={movie} />
              <span onClick={() => {
                dispatch(delMovie(movie.id));
              }}>Supprimer</span>
            </div>
          ))}

          {countResults > 0 && (
            <>
              {pageNumber > 1 && <span onClick={() => dispatch(getQueryData(pageNumber - 1, pageSize, filters))}>Précédent</span>}
              <br/>
              <span>Page : {pageNumber}</span>
              <br/>
              nbPages: {nbPages}
              {pageNumber < nbPages && <span onClick={() => dispatch(getQueryData(pageNumber + 1, pageSize, filters))}>Suivant</span>}
            </>
          )}
        </div>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({queryData: state.queryData, addLike: state.addLike, delMovie: state.delMovie});

export default connect(mapStateToProps)(Movies);
