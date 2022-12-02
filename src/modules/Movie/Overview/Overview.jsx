import {useState, useEffect} from 'react'
import moment from "moment";
import VideoModal from "../../Home/VideoModal";
import movieAPI from "../../../services/movieAPI"
import { Breadcrumbs, Rating } from '@mantine/core';
import "./Overview.scss"


const Overview = ({movieId}) => {
    const [movie, setMovie] = useState({})

    useEffect(() => {
      (async () => {
        try{
          const data = await movieAPI.getMovieDetails(movieId)
          setMovie(data)
        } catch (error){
          console.log(error);
        } 
      })()
        // GỌi API và setMovie
    }, [movieId])

    const [openTrailer, setOpenTrailer] = useState(false);

    const handleClickTrailer = (trailer) => {
      setOpenTrailer(true);
    };

    const dayFormat = moment(movie?.ngayKhoiChieu).format("DD/MM/YYYY");
   
  return (
    <>
   
    {/* <Breadcrumbs movie={movie} /> */}
    {/* <Breadcrumbs separator="→">{movie}</Breadcrumbs> */}
    <div className="overview">
      <div className='overview-content container'>
      <div className="overview-img">
        <img src={movie?.hinhAnh} alt="anh" width="100%" height="100%"/>
      </div>
      <div className="overview-item">
        <h1 className="name">{movie?.tenPhim}</h1>

        <div className="rate">
          <Rating
            name="read-only"
            value={movie?.danhGia / 2}
            fractions={2}
            readOnly
            max={5}
            color="indigo"
          />
        </div>

        <div className="overview-list">
          <span className="list-title">Ngày khởi chiếu: </span>
          <span className="list-content">{dayFormat}</span>
        </div>

        <div className="overview-list">
          <span className="list-title">Thời gian: </span>
          <span className="list-content">120 phút</span>
        </div>

        <div className="overview-list">
          <span className="list-title">Loại: </span>
          <span className="list-content">2D/Nomal/Phụ đề tiếng Anh</span>
        </div>

        <p className="description">{movie?.moTa}</p>

        <div className="overview-btn">
          <button
            className="btn-datve"
            // onClick={handleScrollToShowTime}
          >
            Đặt vé
          </button>
          <button
            className="btn-trailer"
            onClick={() => handleClickTrailer(movie.trailer)}
          >
            Trailer
          </button>
        </div>
      </div>
      </div>
    </div>

    <VideoModal
      trailer={movie?.trailer}
      open={openTrailer}
      setOpen={setOpenTrailer}
    />
   
  </>
  )
}

export default Overview