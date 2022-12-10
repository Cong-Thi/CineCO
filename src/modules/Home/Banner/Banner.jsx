import {useState, useEffect} from 'react'
import movieAPI from "../../../services/movieAPI"
import { Carousel } from '@mantine/carousel';
import "./banner.scss"
import "../../../responsive/home_responsive.scss"

const Banner = () => {
  const [banners, setBanners] = useState([])

  useEffect(() => {
    (async () => {
      const data = await movieAPI.getBanners()
      setBanners(data)
    })()
  },[])
  
  return (
    <div  className='banner'>
       <Carousel lg={{ maxWidth: 1000 }}mx="auto" withIndicators maxHeight={600} dragFree slideGap="md" align="start">
          {banners.map((item) => (
            <Carousel.Slide key={item.maBanner}><img  src={item.hinhAnh} alt={`banner-${item.maBanner}`} width="100%" height="100%"/></Carousel.Slide>
          ))}
      </Carousel>
      </div>
  )
}

export default Banner