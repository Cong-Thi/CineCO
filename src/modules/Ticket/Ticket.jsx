import React, {useState, useEffect} from 'react'
import Seat from './Seat'
import TicketTitle from './TicketTitle/TicketTitle'
import { useParams } from 'react-router-dom'
import ticketAPI from '../../services/ticketAPI'


const Ticket = () => {

    const { showtimeId } = useParams();

    const [movie, setMovie] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const data = await ticketAPI.getTicketRoom(showtimeId);
                setMovie(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

  return (
    <>
        <TicketTitle movieInfo={movie?.thongTinPhim}/>
        <Seat seats={movie?.danhSachGhe}/>
    </>
  )
}

export default Ticket