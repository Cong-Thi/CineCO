import React from "react";
import "./ticketTitle.scss";

const TicketTitle = ({ movieInfo }) => {
    return (
        <div className="ticket-wrapper container">
            <div className="ticket-info">
                <div className="ticket-img">
                    <img src={movieInfo?.hinhAnh} alt="MovieInfoImg" />
                </div>
                <div className="ticket-title">
                    <h1 className="title-name">{movieInfo?.tenPhim}</h1>
                    <div className="title-item">
                        <h4>Thông tin rạp: </h4>
                        <span>2D</span>
                    </div>
                    <div className="title-item">
                        <h4>Rạp chiếu: </h4>
                        <span>{movieInfo?.tenCumRap}</span>
                    </div>
                    <div className="title-item">
                        <h4>Phòng: </h4>
                        <span>{movieInfo?.tenRap}</span>
                    </div>

                    <div className="title-item">
                        <h4>Giờ chiếu: </h4>
                        <span>
                            {movieInfo?.gioChieu} ~ {movieInfo?.ngayChieu}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketTitle;
