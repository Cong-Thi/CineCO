import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { Tabs, ScrollArea } from '@mantine/core'
import movieAPI from "../../../services/movieAPI"
import Cinema from "./Cinema";
import "./ShowTime.scss";
import CinemaTheater from '../../Home/Cinema/CinemaTheater';
import { createStyles } from '@mantine/core';

const Showtimes = ({ movieId }) => {

  const [movies, setMovies] = useState({})
  //const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const data = await movieAPI.getMovieShowTime(movieId)
        setMovies(data)
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })()
  }, [])



  return (
    <div className='cinema-wrapper'>
      <div className='cinema-container'>
        <h3 className='cinema-title'>ĐẶT VÉ NGAY</h3>
        <Tabs defaultValue="BHDStar" >
          <div className='cinema-content'>
            <div className='cinema-logo'>
            <Tabs.List>
              {movies.heThongRapChieu?.map((cinema, index) => (
                <div key={index}>
                    <Tabs.Tab value={cinema.maHeThongRap} >
                      <img className="logo-item" src={cinema.logo} alt="" width="50px" />
                    </Tabs.Tab>
                </div>
              ))}
              </Tabs.List>
            </div>
            <div className='cinema-address'>
              {movies.heThongRapChieu?.map((cinema, index) => (
                <div key={index}>
                  <Tabs.Panel value={cinema.maHeThongRap}>
                    <Cinema cinemas={cinema.cumRapChieu} />
                  </Tabs.Panel>
                </div>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default Showtimes