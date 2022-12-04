import fetcher from "./fetcher";

const ticketAPI = {
  getTicketRoom: (showtimeId) => {
    return fetcher.get("QuanLyDatVe/LayDanhSachPhongVe", {
      params: {
        MaLichChieu: showtimeId,
      },
    });
  },

  bookTicket: (values) => {
    return fetcher.post("QuanLyDatVe/DatVe", values);
  },
};

export default ticketAPI;
