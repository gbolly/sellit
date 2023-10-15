import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Products from "./pages/Products/ProductList";
import ProductAdd from "./pages/Products/ProductAdd";
import Orders from "./pages/Orders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Products />} />
      <Route path="/create" element={<ProductAdd />} />
      <Route path="/orders" element={<Orders />} />
    </>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
