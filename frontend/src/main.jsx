import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/features/store.js";
import AllProducts from "./pages/Listings/AllProducts.jsx";
import ProductDetail from "./pages/Listings/ProductDetail.jsx";
import ProductEdit from "./pages/Listings/ProductEdit.jsx";
import NewProduct from "./pages/Listings/NewProduct.jsx";
import LogIn from "./pages/auth/LogIn.jsx";
import { ProtectedRoute } from "./components/PrivateRoute.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />} path="/">
      <Route path="*" element={<ErrorPage />} />
      <Route index element={<AllProducts />} />   {/* Home shows all products */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProductDetail />} path="listings/:id" />
      </Route>
      <Route element={<ProtectedRoute adminOnly />}>
        <Route element={<NewProduct />} path="listings/new" />
        <Route element={<ProductEdit />} path="listings/:id/edit" />
      </Route>
      <Route element={<LogIn />} path="login" />
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
