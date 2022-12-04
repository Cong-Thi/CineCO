import fetcher from "./fetcher";

const usersManagementAPI = {
  getUsers: () => {
    return fetcher.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP01",
      },
    });
  },

  addUser: (user) => {
    return fetcher.post("QuanLyNguoiDung/ThemNguoiDung", user);
  },

  updateUser: (user) => {
    return fetcher.post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  },

  deleteUser: (id) => {
    return fetcher.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: id,
      },
    });
  },
};

export default usersManagementAPI;
