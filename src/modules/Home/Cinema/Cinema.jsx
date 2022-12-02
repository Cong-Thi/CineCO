import { useState, useEffect } from 'react'
import { Tabs } from '@mantine/core';
import movieAPI from '../../../services/movieAPI'
import CinemaTheater from "./CinemaTheater"
import "./cinema.scss"


const Cinema = () => {
    const [cinemas, setCinemas] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const data = await movieAPI.getCinema()
                setCinemas(data)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <div className='cinema-wrapper'>
            <div className='cinema-container'>
                <h3 className='cinema-title'>Hệ Thống Rạp Trên Toàn Quốc</h3>
                <Tabs defaultValue="BHDStar" orientation="vertical">
                    <div className='cinema-content'>
                        <div className='cinema-logo'>
                            {cinemas?.map((cinema, index) => (
                                <div key={index}>
                                    <Tabs.List>
                                        <Tabs.Tab value={cinema.maHeThongRap} >
                                            <img className="logo-item" src={cinema.logo} alt="" width="50px" />
                                        </Tabs.Tab>
                                    </Tabs.List>
                                </div>
                            ))}
                        </div>
                        <div className='cinema-address'>
                            {cinemas?.map((cinema, index) => (
                                <div key={index}>
                                    <Tabs.Panel value={cinema.maHeThongRap}>
                                        <CinemaTheater cinemaId={cinema.maHeThongRap} />
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

export default Cinema