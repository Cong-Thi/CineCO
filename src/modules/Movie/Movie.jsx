import React from 'react'
import { useParams } from 'react-router-dom'

import Overview from './Overview';
import Showtimes from './Showtimes';

const Movie = () => {

  const {movieId} = useParams();

  return (
    <>
      <Overview movieId={movieId} />
      <Showtimes movieId={movieId}/>
    </>
  )
}

export default Movie