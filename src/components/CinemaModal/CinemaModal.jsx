import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import moviesManagementAPI from "../../services/moviesManagementAPI";
import "./cinemaModal.scss";
import DateTimePicker from "react-datetime-picker";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import moment from "moment";

const CinemaModal = ({ calendaMovie, show, handleClose }) => {
  const [cinema, setCinema] = useState([]);
  const [cinemaBranches, setCinemaBranches] = useState([]);
  const [cinemaSelected, setCinemaSelected] = useState("");
  const [cinemaBranchSelected, setCinemaBranchSelected] = useState("");

  const [dateTimeValue, setDateTimeValue] = useState(new Date());

  const [cumRap, setCumRap] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        tenHeThongRap: "",
        tenCumRap: "",
        ngayChieuGioChieu: "",
        giaVe: "",
      };
    }, []),
    mode: "onTouched",
  });

  useEffect(() => {
    if (cinemaSelected) {
      (async () => {
        try {
          const data = await moviesManagementAPI.getCinemaBranches(
            cinemaSelected
          );
          setCinemaBranchSelected("");
          setCinemaBranches(data);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [cinemaSelected]);

  const handleChangeCinema = (e) => {
    setCinemaSelected(e.target.value);
  };

  const handleChangeCinemaBranch = (e) => {
    setCinemaBranchSelected(e.target.value);
    if (cinemaBranchSelected !== "") {
      setCumRap(
        cinemaBranches.find((item) => item.maCumRap === cinemaBranchSelected)
      );
    } else {
      alert("Nhập lại cụm rạp");
      return;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await moviesManagementAPI.getCinema();
        setCinema(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onSubmit = async (values) => {
    try {
      setDateTimeValue(moment().format("DD/MM/yyyy hh:mm:ss"));
      const newValues = {
        maPhim: calendaMovie.maPhim,
        ngayChieuGioChieu: dateTimeValue,
        maRap: cumRap.maCumRap,
        giaVe: values.giaVe,
      };
      console.log(
        calendaMovie.maPhim,
        dateTimeValue,
        cumRap.maCumRap,
        values.giaVe
      );
      await moviesManagementAPI.taoLichChieu(newValues);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} size={"xl"}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm Lịch Chiếu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="poster col-6">
            <img src={calendaMovie.hinhAnh} alt="" width="100%" />
            <h5 className="w-100">{calendaMovie.tenPhim}</h5>
          </div>
          <div className="cinema__input-group col-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="cinema-form-control">
                <label htmlFor="">Hệ Thống Rạp:</label>
                <select
                  name=""
                  id=""
                  className="w-100"
                  onChange={handleChangeCinema}
                >
                  <option value="">Hãy Chọn Rạp</option>
                  {cinema.map((item) => (
                    <option key={item.maHeThongRap} value={item.maHeThongRap}>
                      {item.tenHeThongRap}
                    </option>
                  ))}
                </select>
                <label htmlFor="">Cụm Rạp:</label>
                <select
                  name=""
                  id=""
                  className="w-100"
                  onChange={handleChangeCinemaBranch}
                >
                  {cinemaBranches.map((item) => (
                    <option key={item.maCumRap} value={item.maCumRap}>
                      {item.tenCumRap}
                    </option>
                  ))}
                </select>
                <label className="w-100" htmlFor="">
                  Ngày Chiếu Giờ Chiếu:
                </label>
                <DateTimePicker
                  onChange={setDateTimeValue}
                  value={dateTimeValue}
                  format="dd-MM-yyyy hh:mm:ss"
                  locale="vi-VI"
                  minDate={new Date()}
                />

                <label className="w-100" htmlFor="">
                  Giá vé:
                </label>
                <input
                  type="number"
                  className="w-90"
                  {...register("giaVe", {
                    required: "Không được để trống",
                  })}
                />
                <span className="mx-2">VND</span>
              </div>
              {errors.giaVe && (
                <p className="errorMessage">{errors.giaVe.message}</p>
              )}
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
          onClick={handleSubmit(onSubmit)}
        >
          Tạo Lịch Chiếu
        </Button>
      </Modal.Footer>
      <div id="date-popup" />
    </Modal>
  );
};

export default CinemaModal;
