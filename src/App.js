import { Suspense } from "react";
import { Route, RouterProvider, Routes } from "react-router-dom";
import Admin from "./components/AdminLayout/Admin";
import MovieAdmin from "./modules/Admin/MovieAdmin";
import UserAdmin from "./modules/Admin/UserAdmin/UserAdmin";
import routes from "./routers/routes";

function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
