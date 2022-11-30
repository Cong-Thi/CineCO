import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./cinema.scss";
import moment from "moment/moment";
import { Tabs, ScrollArea } from '@mantine/core'

const MovieList = ({ cinema }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const handleClickMovieShowTime = (showtimeId) => {
    if (!user) {
      alert("Bạn chưa đăng nhập", "Bạn có muốn quay lại để đăng nhập", () =>
        navigate("/account/login")
      );
    } else {
      navigate(`ticket/${showtimeId}`);
    }
  };

  return (
    <ScrollArea style={{ height: 420 }}>
    <div className="movie-content">
      {cinema?.danhSachPhim?.map((movie, index) => (
        <div key={index} className="movie-item">
          <Link to={`/movie/${movie.maPhim}`}>
            <img className="movie-image" src={movie.hinhAnh} alt="movieImage" />
          </Link>
          <div className="movie-showtime">
            <Link to={`/movie/${movie.maPhim}`} >
              <p className="movie-title">{movie.tenPhim}</p>
            </Link>
            <div className="showtime">
              {movie.lstLichChieuTheoPhim
                ?.slice(0, 4)
                .map((showtime, index) => (
                  <div key={index} className="showtime-item">
                    <button
                      onClick={() =>
                        handleClickMovieShowTime(showtime.maLichChieu)
                      }
                    >
                          {moment(
                            showtime.ngayChieuGioChieu.slice(0, 10)
                          ).format("DD/MM")}        
                      ~
                          {showtime.ngayChieuGioChieu.slice(-8, -3)}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    </ScrollArea>
    
  );
};

export default MovieList;
