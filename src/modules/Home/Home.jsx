import React from 'react'
import Banner from "./Banner"
import Cinema from './Cinema/Cinema'
import MovieFilter from './MovieFilter/MovieFilter'
import Showing from "./Showing"
import MovieShowing from './Showing/MovieShowing'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
    <Banner/>
    <MovieFilter/>
    <MovieShowing/>
    <Cinema/>
    <Footer/>
    </>
  )
}

export default Home