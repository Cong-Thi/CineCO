import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import moviesManagementAPI from '../../services/moviesManagementAPI';
import locale from "antd/es/date-picker/locale/vi_VN";
import { DatePicker } from 'antd';
import "./cinemaModal.scss"
const CinemaModal = ({ movie,  show, handleClose }) => {
  const [cinema,setCinema] = useState([]);
  // const { handleSubmit, control } = useForm({
  //   defaultValues: {
  //     maPhim: movie?.maPhim,
  //     ngayChieuGioChieu: "",
  //     maRap: "",
  //     giaVe: 0,
  //   },
  //   mode: "onTouched",
  // });
useEffect(() => {
(async () =>{
  try {
    const data = await moviesManagementAPI.getCinema();
    setCinema(data);
  } catch (error) {
    console.log(error);
  }
})();
},[])
  return (
    <Modal show={show} onHide={handleClose} size={"xl"}>
      <Modal.Header closeButton>
        <Modal.Title>
          Thêm Lịch Chiếu
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
      <div className="poster col-6">
        <img src="https://genk.mediacdn.vn/2019/5/14/photo-1-15578081452091331833974.jpg" alt="" width={400} />
        <h5>Goku</h5>
      </div>
      <div className="cinema__input-group col-6">
        <form 
        // onSubmit={handleSubmit(onSubmit)}
        >
          
          <div className="cinema-form-control">
          <label htmlFor="">Hệ Thống Rạp:</label>
            <select name="" id="" className='w-100'>
              {cinema.map((item)=> (
              <option key={item.maHeThongRap} value={item.maHeThongRap}>{item.tenHeThongRap}</option>
              ))}
            </select>
            <label htmlFor="">Cụm Rạp:</label>
            <select name="" id="" className='w-100'>             
              <option value=""></option>
            </select>
            <label htmlFor="">Ngày Chiếu Giờ Chiếu:</label>
            <DatePicker
            getPopupContainer={() => document.getElementById("date-popup")}
            popupStyle={{
              position: "relative"
            }}
            
                  showTime
                  format="DD/MM/YYYY HH:mm:ss"
                  locale={locale}
                  className="w-100"
                />
                <div id="date-popup" />
            <label htmlFor="">Giá vé:</label>
            <input type="number" className='w-100' />
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
          Tạo Lịch Chiếu
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CinemaModal