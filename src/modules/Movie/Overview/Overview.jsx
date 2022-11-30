import {useState, useEffect} from 'react'

const Overview = ({movieId}) => {
    const [movie, setMovie] = useState({})

    useEffect(() => {
        // GỌi API và setMovie
    }, [movieId])
  return (
    <div>Overview</div>
  )
}

export default Overview