import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./movieModal.scss";
import {useForm } from "react-hook-form";
import moviesManagementAPI from "../../service/moviesManagementAPI";
import Switch from "react-switch";
const MovieModal = ({ movieDetail, show, handleClose, isUpdate }) => {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      if (movieDetail !== undefined){
        return{
          tenPhim: movieDetail.tenPhim,
          biDanh: movieDetail.biDanh,
          moTa: movieDetail.moTa,
          ngayKhoiChieu: movieDetail.ngayKhoiChieu,
          trailer: movieDetail.trailer,
          hinhAnh: movieDetail.hinhAnh,
        };
      }else {
     return {
      tenPhim: "",
      biDanh: "",
      moTa: "",
      ngayKhoiChieu: "",
      trailer: "",
      hinhAnh: "",
    };
  }
},[movieDetail]),
mode: "onTouched",
});

  

  const [imgPreview, setImgPreview] = useState("")
  const onSubmit = async (values) => {
    try {
      const newValues = {
        tenPhim: values.tenPhim,
        biDanh: values.biDanh,
        moTa: values.moTa,
        maNhom:"GP01",
        ngayKhoiChieu: values.ngayKhoiChieu,
        trailer: values.trailer,
        hinhAnh: values.hinhAnh,
      }


      const payload = { ...values, hinhAnh: values.hinhAnh, maNhom: "GP01" };
      
        const formData = new FormData();
      for (let key in payload) {
        console.log(values.hinhAnh)
        formData.append(key, payload[key]);
      }
      if(isUpdate) {
        await moviesManagementAPI.updateMovie(newValues);
      }else{
        await moviesManagementAPI.addMovie(newValues);
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    reset(movieDetail);
  },[movieDetail, reset]);
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
          <Modal.Title>
          {isUpdate ? " Cập nhật Phim" : "Thêm Phim"}
          </Modal.Title>
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
            <div
              className={`movie-form-control ${
                errors.biDanh ? "errorInput" : ""
              }`}
            >
              <input 
              // type="file" {...register("hinhAnh")} 
              type="file" onChange = {handleChangeImage}
              />
              {imgPreview && <img width={150} src={imgPreview} alt="preview"/>}
            </div>
            {errors.hinhAnh && (
              <p className="errorMessage">{errors.hinhAnh.message} </p>
            )}
            <label htmlFor="">Ngày khởi chiếu</label>
            <div
              className={`movie-form-control ${
                errors.ngayKhoiChieu ? "errorInput" : ""
              }`}
            >
              <input type="text" {...register("ngayKhoiChieu",{required:"Không được để trống"})} />
            </div>
            {errors.ngayKhoiChieu && (
              <p className="errorMessage">{errors.ngayKhoiChieu.message} </p>
            )}
            
            <label htmlFor="">Mô Tả</label>
            <div
              className={`movie-form-control ${
                errors.moTa ? "errorInput" : ""
              }`}
            >
              <input type="text" {...register("moTa",
              {required:"Không được để trống"})} />
            </div>
            {errors.moTa && (
              <p className="errorMessage">{errors.moTa.message} </p>
            )}
            <label htmlFor="">Đánh Giá</label>
            <div
              className={`movie-form-control ${
                errors.danhGia ? "errorInput" : ""
              }`}
            >
              <input type="number" {...register("danhGia",
              {required: "Không được để trống",
              pattern:{
                value:  /^([1-9]|10)$/,
                message:"Đánh giá phải từ 1 tới 10"
              }
            }
              
              )} />
            </div>
            {errors.danhGia && (
              <p className="errorMessage">{errors.danhGia.message} </p>
            )}
            
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Hủy
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >{isUpdate ? "Cập nhật" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieModal;
