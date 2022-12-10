import { useState, useEffect } from 'react'
import { Tabs, ScrollArea } from '@mantine/core'
import movieAPI from '../../../services/movieAPI'
import MovieList from './MovieList'
import "./cinema.scss"

const CinemaTheater = ({ cinemaId }) => {
    const [cinemas, setCinemas] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const data = await movieAPI.getMovieShowTimeFromCinema(cinemaId)
                setCinemas(data)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <Tabs defaultValue="BHD Star Cineplex - Bitexco" orientation="vertical">
            <div className='theater-content'>
                <div className='theater-logo'>
                    <ScrollArea style={{ height: 420 }}>
                        {cinemas?.map((cinema) => (
                            cinema.lstCumRap?.map((cinema, index) => (
                                <div key={index} >
                                    <Tabs.List>
                                        <Tabs.Tab value={cinema.tenCumRap} className='logo-item'>
                                            <h3>{cinema.tenCumRap}</h3>
                                            <p>{cinema.diaChi}</p>
                                        </Tabs.Tab>
                                    </Tabs.List>
                                </div>
                            ))
                        ))}
                    </ScrollArea>
                </div>
                <div className='movie-wrapper'>
                    {cinemas?.map((cinema) => (
                        cinema.lstCumRap?.map((cinema, index) => (
                            <div key={index}>
                                <Tabs.Panel value={cinema.tenCumRap}>
                                    <MovieList cinema={cinema} />
                                </Tabs.Panel>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </Tabs>
    )
}

export default CinemaTheater