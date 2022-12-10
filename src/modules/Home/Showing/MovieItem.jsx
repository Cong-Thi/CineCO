import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Carousel } from '@mantine/carousel';
import "./showing.scss"
import VideoModal from "../VideoModal/VideoModal"
import { AiOutlinePlayCircle } from "react-icons/ai";


function MovieItem({ movies }) {

  const navigate = useNavigate();

  const handleClickDetail = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const handleClickBuyTicket = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  const [trailer, setTrailer] = useState(null);
  const [openTrailer, setOpenTrailer] = useState(false);

  const handlePlayTrailer = (trailer) => {
    const trailerSelected = movies.find((movie) => movie.trailer === trailer);
    setTrailer(trailerSelected.trailer);
    console.log(setTrailer(trailerSelected.trailer));

    setOpenTrailer(true);
  };

  const slides = movies.map((item) => (
    <Carousel.Slide key={item.maPhim}>
      <div className='movie-card'>
        <div className='movie-img'>
          <img src={item.hinhAnh} alt={item.tenPhim} />
        </div>
        
        <div className="movie-overlay">
          <div className='overlay-text'>
          <p onClick={() => handleClickDetail(item.maPhim)}>{item.moTa.slice(0,100)} [...]</p>
          </div>
          <div className="overlay-play">
            <AiOutlinePlayCircle
              className="overlay-play"
              onClick={() => handlePlayTrailer(item.trailer)}
            >
              Trailer
            </AiOutlinePlayCircle>
          </div>
        </div>

        <div className='movie-tittle'>
          <h3 onClick={() => handleClickDetail(item.maPhim)}>{item.tenPhim}</h3>
          <button
              className="overlay-add"
              onClick={() => handleClickBuyTicket(item.maPhim)}
            >
              Đặt Vé
            </button>
        </div>
      </div>
    </Carousel.Slide>
  ))


  return (
    <div className='container-movie'>
      <Carousel mx="auto" withIndicators slideSize="auto" align="start" slideGap="md" draggable="false">
        {slides}
      </Carousel>
      <VideoModal trailer={trailer}
        open={openTrailer}
        setOpen={setOpenTrailer} />
    </div>

  );
}

export default MovieItem;
