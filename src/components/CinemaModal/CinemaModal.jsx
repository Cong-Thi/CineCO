import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form';

const CinemaModal = ({ movie,  show, handleClose }) => {

  const { handleSubmit, control } = useForm({
    defaultValues: {
      maPhim: movie?.maPhim,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    mode: "onTouched",
  });
console.log(movie?.tenPhim);
  return (
    <Modal show={show} onHide={handleClose} size={"xl"}>
      <Modal.Header closeButton>
        <Modal.Title>
          Thêm Lịch Chiếu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
      <div className="poster">
        <img src={movie?.hinhAnh} alt="" />
        <h5>{movie?.tenPhim}</h5>
      </div>
      <div className="cinema__input-group">
        <form 
        // onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="">Hệ Thống Rạp</label>
          <div className="cinema-form-control">
            <select name="" id="">
              <option value=""></option>
            </select>
          </div>
        </form>
      </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Hủy
        </Button>
        <Button
          variant="primary"
          type="submit"
        // onClick={handleSubmit(onSubmit)}
        >
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CinemaModal