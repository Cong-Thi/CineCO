import React, { useState, useEffect } from "react";
import MovieItem from "./MovieItem";
import movieAPI from '../../../services/movieAPI'
import './showing.scss'

const MovieShowing = () => {
  const [type, setType] = useState("dangChieu");
  const [movies, setMovies] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getMovies()
        setMovies(data)
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])

  const moviesByType = movies?.filter((movie) => movie[type] === true);

  const handleClickTitle = (e, movieType) => {
    const titleHeading = document.querySelector(".title-item.active");
    titleHeading.classList.remove("active");
    e.target.classList.add("active");
    setType(movieType);
  };

  return (
    <div className="movie-content">
      <div className="nav-item">
        <ul>
          <li
            className="title-item active"
            onClick={(e) => handleClickTitle(e, "dangChieu")}
          >
            Đang chiếu
          </li>
          <li
            className="title-item"
            onClick={(e) => handleClickTitle(e, "sapChieu")}
          >
            Sắp chiếu
          </li>
          <li
            className="title-item"
            onClick={(e) => handleClickTitle(e, "hot")}
          >
            Phim Hot
          </li>
        </ul>
      </div>
      <div className="movie-wrap">
        <MovieItem movies={moviesByType} />
      </div>
    </div>
  );
};

export default MovieShowing;
