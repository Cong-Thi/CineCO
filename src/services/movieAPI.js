import fetcher from "./fetcher";

const movieAPI = {
    getBanners:  () => {
            return fetcher.get("QuanLyPhim/LayDanhSachBanner");
        },

    getMovies:  () => {
        return fetcher.get("QuanLyPhim/LayDanhSachPhim",{
            params:{
                maNhom: "GP03",
            },
        })
    },

    getMovieDetails: (movieId) => {
        return fetcher.get("QuanLyPhim/LayThongTinPhim",{
            params:{
                maPhim: movieId,
            },
        })
    },

    getMovieShowTime: (movieId) => {
        return fetcher.get("QuanLyRap/LayThongTinLichChieuPhim", {
          params: {
            maPhim: movieId,
          },
        });
      },

    getCinema: () => {
        return fetcher.get("QuanLyRap/LayThongTinHeThongRap");
    },

    getCinemaDetails: (cinemaId) => {
        return fetcher.get("QuanLyRap/LayThongTinCumRapTheoHeThong", {
            params:{
                maHeThongRap: cinemaId,
            }
        })
    },

    getMovieShowTimeFromCinema: (cinemaId) => {
        return fetcher.get("QuanLyRap/LayThongTinLichChieuHeThongRap", {
          params: {
            maHeThongRap: cinemaId,
            maNhom: "GP03",
          },
        });
      },
}

export default movieAPI