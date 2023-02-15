import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getQueryData } from '../store/actions/queryAction';

const Movies = (props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQueryData());
  }, [dispatch])

  useEffect(() => {
    console.log('props', props)
  })
  
  return (
    <>
      React-interview
    </>
  );
}

const mapStateToProps = (state) => ({queryData: state.queryData, newData: state.newData});

export default connect(mapStateToProps)(Movies);
