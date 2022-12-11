import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import "./seat.scss";
import ticketAPI from '../../../services/ticketAPI'
import { ImBin } from "react-icons/im";
import useRequest from "../../../hooks/useRequest";
import { Notification } from '@mantine/core';


const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const Seat = ({ seats }) => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  const [newSeats, setNewSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  let count = 0;
  useEffect(() => {
    const handleData = async () => {
      if (seats && seats.length > 0) {
        const seatItem = await seats.map((seat) => {
          count++;
          if (count > 16) {
            count = 1;
          }
          return { ...seat, count, dangChon: false };
        });
        setNewSeats(seatItem);
      }
    };

    handleData();
  }, [seats]);

  const handleSelectSeat = (seatSelected) => {
    if (bookedSeats && bookedSeats.length > 0 && bookedSeats.length <= 10) {
      const index = bookedSeats.findIndex(
        (seat) => seat.maGhe === seatSelected.maGhe
      );
      if (index === -1) {
        if (bookedSeats.length > 9) {
          <Notification color="red">
            Bummer! Notification without title
          </Notification>
          return;
        }
        // set active ghế đang chọn
        seatSelected.dangChon = true;

        //setState cart
        setBookedSeats((state) => [...state, seatSelected]);
      } else {
        // set active ghế bỏ chọn
        seatSelected.dangChon = false;
        const newBookedSeat = bookedSeats.filter(
          (bookedSeat) => bookedSeat !== bookedSeats[index]
        );
        setBookedSeats(newBookedSeat);
      }
    } else {
      seatSelected.dangChon = true;
      setBookedSeats((state) => [...state, seatSelected]);
    }
  };

  const handleRemoveSeat = (seat) => {
    seat.dangChon = false;
    const newBookedSeats = bookedSeats?.filter(
      (bookedSeat) => bookedSeat.maGhe !== seat.maGhe
    );

    setBookedSeats(newBookedSeats);
  };

  const handleDeleteAllSeat = () => {
    bookedSeats.map((seat) => (seat.dangChon = false));
    setBookedSeats([]);
  };

  const { data: handleBookTicket, isLoading } = useRequest(
    (values) => ticketAPI.bookTicket(values),
    { isManual: true }
  );

  const handleClickBookSeat = async () => {
    let values = {
      maLichChieu: null,
      danhSachVe: [],
    };
    if (bookedSeats && bookedSeats.length > 0) {
      const newBookedSeats = bookedSeats.map((seat) => {
        return { maGhe: seat.maGhe, giaVe: seat.giaVe };
      });

      values = {
        ...values,
        maLichChieu: showtimeId,
        danhSachVe: newBookedSeats,
      };

      const onSuccess = async () => {
        try {
          await handleBookTicket(values);
          // reset form
          await handleDeleteAllSeat();
          // notification
          await 
//chuyển hướng về trang chủ
      navigate("/");
            } catch (error) {
  <Notification color="red">
    Bummer! Notification without title
  </Notification>
}
          };
// alert thông báo có chấp nhận đặt vé
alert(
  "Bạn có chấp nhận đặt vé không?",
  "Vé đã đặt không thể hoàn lại",
  onSuccess()
);
        }
      };

return (
  <div className="seat container">
    <div className="seat-book">
      <div className="seat-screen">
        <p>Màn Hình</p>
      </div>
      <div className="seat-list">
        <div className="seat-range">
          {rows.map((row, index) => (
            <div key={index} className="seat-item">
              <div key={index}>
                {row}
              </div>
            </div>
          ))}
        </div>
        <div className="seat-row">
          {newSeats?.map((seat, index) => (
            <div key={index} className="row-item">
              <div
                className={`row ${seat.loaiGhe === "Thuong" ? "normal" : ""
                  } ${seat.loaiGhe === "Vip" ? "vip" : ""} ${seat.daDat ? "selected" : ""
                  } ${seat.dangChon ? "seat-active" : ""}`}
                onClick={() => handleSelectSeat(seat)}
              >
                {seat.count}
              </div>
            </div>
          ))}
        </div>
      </div>

     
      <div className="seat-description">
        <div className="row">
          <div className="square selected"></div>
          <p>Không thể đặt</p>
        </div>
        <div className="row">
          <div className="square active">0</div>
          <p>Đang chọn</p>
        </div>
        <div className="row">
          <div className="square normal">0</div>
          <p>Ghế thường</p>
        </div>
        <div className="row">
          <div className="square vip">0</div>
          <p>Ghế VIP</p>
        </div>
      </div>
    </div>

   
    <div className="seat-detail">
      <h3>DANH SÁCH GHẾ ĐÃ CHỌN</h3>
      <div className="detail-table">
        <table width="100%">
          <thead>
            <tr>
              <th>Số ghế</th>
              <th>Giá</th>
              <th>Huỷ</th>
            </tr>
          </thead>
          <tbody>
            {bookedSeats &&
              bookedSeats.length > 0 &&
              bookedSeats.map((seat, index) => (
                <tr key={index}>
                  <td>{`${seat.tenGhe} - ${seat.loaiGhe === "Thuong" ? "Ghế thường" : "Ghế VIP"
                    }`}</td>
                  <td>{seat.giaVe.toLocaleString()}</td>
                  <td>
                    <button
                      className="cancel-btn"
                      onClick={() => handleRemoveSeat(seat)}
                    >
                      <ImBin size="16px" color="#000" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {bookedSeats.length > 0 && (
        <div className='seat-footer'>
          <div>
            <h4>Tổng tiền:</h4>
            <p>
              {`${bookedSeats
                .reduce((acc, curr) => acc + curr.giaVe, 0)
                .toLocaleString()} ₫`}
            </p>
          </div>
          <div className='btn-footer'>
            <button className="btn-delete" onClick={handleDeleteAllSeat}>
              XOÁ
            </button>
            <button className="btn-add" onClick={handleClickBookSeat}>
              ĐẶT VÉ
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)
}

export default Seat