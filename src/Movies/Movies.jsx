import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Movie from '../Movie/Movie';
import { getQueryData } from '../store/actions/queryAction';

const Movies = (props) => {
  const {results, loading} = props.queryData;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQueryData());
  }, [dispatch])

  return (
    <section>
      <h1>Liste des films</h1>
      {!loading && (
        <div>
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

const mapStateToProps = (state) => ({queryData: state.queryData, newData: state.newData});

export default connect(mapStateToProps)(Movies);
