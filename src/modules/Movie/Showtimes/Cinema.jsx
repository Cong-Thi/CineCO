import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { ScrollArea } from '@mantine/core'

const Cinema = ({ cinemas }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const handleClickMovieShowTime = (showtimeId) => {
        if (!user) {
            alert("Bạn chưa đăng nhập", "Bạn có muốn quay lại để đăng nhập", () =>
                navigate("/account/login")
            );
        } else {
            navigate(`/ticket/${showtimeId}`);
        }
    };
    return (
        <>
            {cinemas.map((cinema) => (
                <div key={cinema.tenCumRap} className="cinema-item">
                    <div className="cinema-title">
                        <h3>{cinema.tenCumRap}</h3>
                        <p>{cinema.diaChi}</p>
                    </div>
                    <div className="cinema-showtime">
                    <ScrollArea style={{ height: 130 }}>
                        {cinema.lichChieuPhim.map((showtime) => (
                            <button
                                onClick={() => handleClickMovieShowTime(showtime.maLichChieu)}
                                key={showtime.maLichChieu}
                                className="cinema__showtime__container"
                            >
                                {moment(showtime.ngayChieuGioChieu.slice(0, 10)).format(
                                    "DD/MM"
                                )}
                                ~
                                {showtime.ngayChieuGioChieu.slice(-5)}
                            </button>
                        ))}
                        </ScrollArea>
                    </div>
                </div>
            ))}

        </>
    );
};

export default Cinema;
