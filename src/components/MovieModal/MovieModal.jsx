import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./movieModal.scss";
import {useForm } from "react-hook-form";
import moviesManagementAPI from "../../services/moviesManagementAPI";
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

      const payload = { ...values, hinhAnh: values.hinhAnh, maNhom: "GP01" };
      
        const formData = new FormData();
      for (let key in payload) {
        formData.append(key, payload[key]);
      }
      console.log(formData);

      if(isUpdate) {
        await moviesManagementAPI.updateMovie(formData);
      }else{
        await moviesManagementAPI.addMovie(formData);
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
          {isUpdate ? " C????p nh????t Phim" : "Th??m Phim"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">T??n Phim</label>
            <div
              className={`movie-form-control ${
                errors.tenPhim ? "errorInput" : ""
              }`}
            >
              <input
                type="text"
                placeholder="T??n Phim"
                {...register("tenPhim", {
                  required: "Kh??ng ????????c ?????? tr????ng",
                })}
              />
            </div>
            {errors.tenPhim && (
              <p className="errorMessage">{errors.tenPhim.message} </p>
            )}
            <label htmlFor="">Bi?? Danh</label>
            <div
              className={`movie-form-control ${
                errors.biDanh ? "errorInput" : ""
              }`}
            >
              <input
                type="text"
                placeholder="Bi?? Danh.."
                {...register("biDanh", { required: "Kh??ng ????????c ?????? tr????ng" })}
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
                {...register("trailer", { required: "Kh??ng ????????c ?????? tr????ng" })}
              />
            </div>
            {errors.trailer && (
              <p className="errorMessage">{errors.trailer.message} </p>
            )}
            <label htmlFor="">Hi??nh A??nh</label>
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
            <label htmlFor="">Nga??y kh????i chi????u</label>
            <div
              className={`movie-form-control ${
                errors.ngayKhoiChieu ? "errorInput" : ""
              }`}
            >
              <input type="text" {...register("ngayKhoiChieu",{required:"Kh??ng ????????c ?????? tr????ng"})} />
            </div>
            {errors.ngayKhoiChieu && (
              <p className="errorMessage">{errors.ngayKhoiChieu.message} </p>
            )}
            
            <label htmlFor="">M?? Ta??</label>
            <div
              className={`movie-form-control ${
                errors.moTa ? "errorInput" : ""
              }`}
            >
              <input type="text" {...register("moTa",
              {required:"Kh??ng ????????c ?????? tr????ng"})} />
            </div>
            {errors.moTa && (
              <p className="errorMessage">{errors.moTa.message} </p>
            )}
            <label htmlFor="">??a??nh Gia??</label>
            <div
              className={`movie-form-control ${
                errors.danhGia ? "errorInput" : ""
              }`}
            >
              <input type="number" {...register("danhGia",
              {required: "Kh??ng ????????c ?????? tr????ng",
              pattern:{
                value:  /^([1-9]|10)$/,
                message:"??a??nh gia?? pha??i t???? 1 t????i 10"
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
            Hu??y
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >{isUpdate ? "C????p nh????t" : "Th??m"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MovieModal;
