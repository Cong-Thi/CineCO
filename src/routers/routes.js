import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary";
import NotFound from "../components/NotFound";
import RootLayout from "../components/RootLayout";
import Auth from "../modules/Auth";
import Signin from "../modules/Auth/Signin";
import Signup from "../modules/Auth/Signup";
import Home from "../modules/Home";
import Movie from "../modules/Movie";
import Ticket from "../modules/Ticket/Ticket";
import Admin from "../components/AdminLayout/Admin";
import MovieAdmin from "../modules/Admin/MovieAdmin";
import UserAdmin from "../modules/Admin/UserAdmin/UserAdmin";


export const routes = createBrowserRouter([
    {path:"/",
     element: <RootLayout/>,
     title:"Home",
     errorElement: <ErrorBoundary/>,
     children: [
        //Home
        {index: true, element: <Home/>, title:"Home"},
        // Movie
        {path: "/movie/:movieId", element: <Movie />, title:"Phim"},
        // Lịch chiếu
        {path:"/", title:"Lịch Phim"},
        // Tin tức
        {path:"/", title:"Tin Tức"},
        // Liên hệ
        {path:"/", title:"Liên Hệ"},
        
        // Authentication
        {path: "",
        element: <Auth/>,
        children: [
            {path: "/signin", element: <Signin/>, title:"Đăng Nhập"},
            {path: "/signup", element: <Signup/>, title:"Đăng Ký"},
        ]
        },
        {path:"/ticket/:showtimeId", element:<Ticket/>},
        {path:"*", element: <NotFound/>},
    ]
    },

    {
        path: "/admin",
        element: <Admin />,
        children: [
          { path: "/admin/", element: <UserAdmin /> },
          { path: "/admin/movie-admin", element: <MovieAdmin /> },
        ],
      },
    
    
    
])

//export default routes



