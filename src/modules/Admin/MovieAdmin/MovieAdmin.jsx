import React, { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { TbMovie } from "react-icons/tb"

import { Button, Form, InputGroup, Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import "./movieAdmin.scss";
import moviesManagementAPI from "../../../service/moviesManagementAPI";
import MovieModal from "../../../components/MovieModal/MovieModal";
import CinemaModal from "../../../components/CinemaModal";

const MovieAdmin = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [movieDetail, setMovieDetail] = useState({})

  const [show, setShow] = useState(false);
  const [showCinema, setShowCinema] = useState(false);
  console.log(movies);

  const handleClose =  async (tenPhim, soTrang) => {
    const data = await moviesManagementAPI.getMovies(tenPhim, soTrang);
    setMovies(data.items);
    setMovieDetail({});
    setShow(false); 
    setIsUpdate(false); 
  }

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async (tenPhim, soTrang) => {
    const data = await moviesManagementAPI.getMovies(tenPhim, soTrang);
    if (data) {
      setPage(data.currentPage);
      setMovies(data.items);
      setTotalPages(data.totalPages);
      setMovieDetail({});
      setIsUpdate(false);
    }
  };

  const handlePageClick = (event) => {
    getMovies(searchValue, event.selected + 1);
  };

  const handleDelete = async (maPhim) => {
  };

  const handleUpdate =  (movieDetail) => {
    setMovieDetail(movieDetail);
    setShow(true);
    setIsUpdate(true);
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const handleSearchClick = () => {
    getMovies(searchValue);
  };
  const handleShow = () => {
    setShow(true);  
  }
 
  const handleShowCinema = () => {
    setShowCinema(true);  
  }
  const handleCloseCinema = () => {
    setShowCinema(false);  
  }
  return (
    <div className="movie-admin">
      <div className="movie-admin__content">
        <div className="movie-admin__content__title">
          <div className="title-text">
            <h3>Quản lý Phim</h3>
          </div>
          <InputGroup>
            <Form.Control
              placeholder="Tìm Kiếm..."
              aria-label="search"
              aria-describedby="basic-addon1"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Button onClick={() => handleSearchClick()}>
              <FaSearch />
            </Button>
          </InputGroup>
          <Button className="btn-add" onClick={handleShow}>Thêm Phim</Button>
          <MovieModal  show={show} handleClose={handleClose}
          movieDetail={movieDetail.maPhim ? movieDetail : {
            tenPhim:"",
            biDanh:"",
            moTa: "",
            ngayKhoiChieu: "",
            trailer: "",
            hinhAnh: "",
            danhGia: "",
            hot: false,
            dangChieu: false, 
            sapChieu: false,
          }} 
            isUpdate={isUpdate}
          />
        </div>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Mã Phim</th>
              <th>Tên Phim</th>
              <th>Hình Ảnh</th>
              <th>Ngày khởi chiếu</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.maPhim}>
                <th>{movie.maPhim}</th>
                <th>{movie.tenPhim}</th>
                <th className="text-center">
                  <img src={movie.hinhAnh} alt={movie.tenPhim} width={50} />
                </th>
                <th>{movie.ngayKhoiChieu}</th>
                <th className="btn-group row">
                  <Button
                    variant="outline-primary"
                    className="col-5 m-1"
                    onClick={() => handleUpdate(movie)}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-5 m-1"
                    onClick={() => handleDelete(movie.maPhim)}
                  >
                    <BsTrash />
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="col-5 m-1"
                    onClick={() => handleShowCinema()}
                  >
                    <TbMovie/>
                  </Button>
                  <CinemaModal show={showCinema} handleClose={handleCloseCinema} />
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
        />
      </div>
    </div>
  );
};

export default MovieAdmin;
