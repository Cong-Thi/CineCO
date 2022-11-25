import {createBrowserRouter} from 'react-router-dom'
import Admin from '../components/AdminLayout/Admin'
import MovieAdmin from '../modules/Admin/MovieAdmin'
import UserAdmin from '../modules/Admin/UserAdmin/UserAdmin'

const routes = createBrowserRouter([
    {path: "/admin", element:<Admin/>,
    children:[
        {path:"/admin/", element:<UserAdmin/>},
        {path:"/admin/movie-admin", element:<MovieAdmin/>},
    ]
},{path: "*", element: <h1>NotFound</h1>},

])

export default routes