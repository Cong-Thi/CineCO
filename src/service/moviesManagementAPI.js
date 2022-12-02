import fetcher from "./fetcher";

const moviesManagementAPI = {
  getMovies: (tenPhim, soTrang) => {
    let params = {};
    if (tenPhim) {
      params = {
        maNhom: "GP01",
        tenPhim: tenPhim || "",
        soTrang: soTrang || 1,
        soPhanTuTrenTrang: 10,
      };
    } else {
      params = {
        maNhom: "GP01",
        soTrang: soTrang || 1,
        soPhanTuTrenTrang: 10,
      };
    }
    return fetcher.get("QuanLyPhim/LayDanhSachPhimPhanTrang", {
      params,
    });
  },

  addMovie: (movie) => {
    return fetcher.post("QuanLyPhim/ThemPhimUploadHinh", movie);
  },

  updateMovie: (movie) => {
    return fetcher.post("QuanLyPhim/CapNhatPhimUpload", movie);
  },

  deleteUser: (id) => {
    return fetcher.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: id,
      },
    });
  },
};

export default moviesManagementAPI;
