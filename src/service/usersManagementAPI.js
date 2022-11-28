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
};

export default usersManagementAPI;
