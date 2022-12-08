import { Suspense } from "react";
import { RouterProvider } from 'react-router-dom'
import {routes} from './routers/routes'
import Loading from "./components/Loading";

function App() {
  return (
    <Suspense fallback={<h1><Loading/></h1>}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
