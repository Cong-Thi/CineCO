import React, { useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import fetcher from "../../service/fetcher";
import "./movieModal.scss";
import { Controller, useForm } from "react-hook-form";
import moviesManagementAPI from "../../service/moviesManagementAPI";

const MovieModal = ({ movie, show, handleClose }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      ngayKhoiChieu: "",
      trailer: "",
      hinhAnh: "",
    },
    mode: "onTouched",
  });
  const [imgPreview, setImgPreview] = useState("")
  const onSubmit = async (values) => {
    try {
      const payload = { ...values, hinhAnh: values.hinhAnh[0], maNhom: "GP01" };
      if(payload.hinhAnh){
        const formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }
      await moviesManagementAPI.addMovie(formData);
      }else{
        alert("Hãy chọn hình ảnh")
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeImage = (evt) =>{
    const file = evt.target.files[0];
    if(!file){
      return;
    }else{
      setValue("hinhAnh", file)

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (evt) =>{
        setImgPreview(evt.target.result);
      }

    }
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Tên Phim</label>
            <div
              className={`movie-form-control ${
                errors.tenPhim ? "errorInput" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Tên Phim"
                {...register("tenPhim", {
                  required: "Không được để trống",
                })}
              />
            </div>
            {errors.tenPhim && (
              <p className="errorMessage">{errors.tenPhim.message} </p>
            )}
            <label htmlFor="">Bí Danh</label>
            <div
              className={`movie-form-control ${
                errors.biDanh ? "errorInput" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Bí Danh.."
                {...register("biDanh", { required: "Không được để trống" })}
              />
            </div>
            {errors.biDanh && (
              <p className="errorMessage">{errors.biDanh.message} </p>
            )}
            <label htmlFor="">Trailer</label>
            <div>
              <input
                type="text"
                placeholder="Trailer"
                {...register("trailer", { required: "Không được để trống" })}
              />
            </div>
            {errors.trailer && (
              <p className="errorMessage">{errors.trailer.message} </p>
            )}
            <label htmlFor="">Hình Ảnh</label>
            <div>
              <input 
              // type="file" {...register("hinhAnh")} 
              type="file" onChange = {handleChangeImage}
              />
              {imgPreview && <img width={150} src={imgPreview} alt="preview"/>}
            </div>
            <label htmlFor="">Ngày khởi chiếu</label>
            <div>
              <input type="text" {...register("ngayKhoiChieu")} />
            </div>
            <label htmlFor="">Mô Tả</label>
            <div>
              <input type="text" {...register("moTa")} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieModal;
