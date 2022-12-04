import { useEffect, useState } from "react";
import movieAPI from '../../../services/movieAPI'
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import "./movieFilter.scss";

const MovieFilter = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    movies: [],
    movieIdSelected: "",
    selectedMovieShowtime: [],
    theater: "",
    cinemaSelected: null,
    showTimeId: "",
  });
 
  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getMovies()
        setValues({ ...values, movies: data })
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])


  useEffect(() => {
    if (!values.movieIdSelected) return;
    handleSeclectedTheater(values.movieIdSelected);
  }, [values.movieIdSelected]);

  const handleSeclectedTheater = async (movieIdSelected) => {
    try {
      const data = await movieAPI.getMovieShowTime(movieIdSelected);
      setValues({
        ...values,
        selectedMovieShowtime: data.heThongRapChieu,
        theater: "",
        cinemaSelected: null,
        showTimeId: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectDay = (theater) => {
    const cinemas = values.selectedMovieShowtime?.forEach((cinemaSystem) => {
      cinemaSystem.cumRapChieu.forEach((cinema) => {
        if (cinema.maCumRap === theater) {
          setValues({ ...values, cinemaSelected: cinema });
        }
      });
    });

  };

  useEffect(() => {
    handleSelectDay(values.theater);
  }, [values.theater]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setValues({
          ...values,
          movieIdSelected: value,
        });
        break;
      case "theater":
        setValues({ ...values, theater: value });
        break;
      case "day":
        setValues({ ...values, showTimeId: value });
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`ticket/${values.showTimeId}`);
  };

  return (
    <div className="form-content">
      <div className="form-wrapper">

        <form className="form-group" onSubmit={handleSubmit}>
          <div className="form-title">
            <p>MUA VÉ <br /> ONLINE</p>
          </div>
          <div className="form-lists">
          <div className="form-list">
            <select
              name="name"
              id="name"
              className="form-item form-name"
              value={values.name}
              onChange={handleChange}
            >
              <option value="">Chọn phim</option>
              {values.movies?.map((movie) => (
                <option key={movie.maPhim} value={movie.maPhim}>
                  {movie.tenPhim}
                </option>
              ))}
            </select>
          </div>
          <div className="form-list">
            <select
              name="theater"
              id="theater"
              className="form-item form-theater"
              value={values.theater}
              onChange={handleChange}
            >
              <option value="">Chọn rạp</option>
              {values.selectedMovieShowtime?.map((cinemaSystem) => {
                return cinemaSystem.cumRapChieu?.map((cinema) => {
                  return (
                    <option key={cinema.maCumRap} value={cinema.maCumRap}>
                      {cinema.tenCumRap}
                    </option>
                  );
                });
              })}
            </select>

            <select
              name="day"
              id="day"
              className="form-item form-day"
              value={values.day}
              onChange={handleChange}
            >
              <option value="">Chọn Ngày</option>
              {values.cinemaSelected?.lichChieuPhim?.map((showtime) => {
                return (
                  <option key={showtime.maLichChieu} value={showtime.maLichChieu}>
                    {console.log(showtime.ngayChieuGioChieu)}
                    {`${moment(showtime.ngayChieuGioChieu.slice(0, 10)).format("DD/MM")
                      } ~ ${showtime.ngayChieuGioChieu.slice(-8, -3)}`}
                  </option>
                );
              })}
            </select>
          </div>
          </div>
          <button className="form-button">Đặt vé</button>
        </form>
      </div>
    </div>
  );
};

export default MovieFilter;
