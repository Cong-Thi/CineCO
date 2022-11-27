import fetcher from "./fetcher";

const usersManagementAPI = {
  getUsers: () => {
    return fetcher.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        maNhom: "GP01",
      },
    });
  },
};

export default usersManagementAPI;
