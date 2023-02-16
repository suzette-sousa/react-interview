import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import Movie from '../Movie/Movie';
import { getQueryData } from '../store/actions/queryAction';

const Movies = (props) => {
  const {results, loading, count, categories, filters} = props.queryData;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQueryData());
  }, [dispatch])

  const filterByCategory = (e) => {
    dispatch(getQueryData({category: e.target.innerHTML}))
  }

  return (
    <section>
      <h1>Liste des films</h1>
      {!loading && (
        <div>
          <p>{count} film{count > 1 && "s"} répertorié{count > 1 && "s"}</p>

          {filters?.category && <span  onClick={(e) => dispatch(getQueryData())}>Reset filtres</span>}

          <br/><br/>

          {filters?.category && <>Filtre sélectionné : {filters?.category}</>}
          
          <br/><br/>

          {categories.filter((category) => category !== filters?.category).map((category, index) => (
            <div key={index} onClick={(e) => filterByCategory(e)}>{category}</div>
          ))}

          {count !== results?.length && <p>{results?.length} résultat{results?.length > 1 && "s"}</p>}

          {results?.length && results.map((movie) => (
            <div key={movie.id}>
              <Movie movieDetails={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({queryData: state.queryData, addLike: state.addLike, newData: state.newData});

export default connect(mapStateToProps)(Movies);
