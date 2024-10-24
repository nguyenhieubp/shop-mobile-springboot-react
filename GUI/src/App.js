import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import {
  Home,
  LoginForm,
  CartPage,
  Checkout,
  HomeCategory,
  DetailProduct,
} from "./pages/index";
import AboutPage from "./pages/AboutPage/AboutPage";
import ContactPage from "./pages/ContactPage/ContactPage";
// components
import { useDispatch, useSelector } from "react-redux";
import RegisterForm from "./pages/Register/Register";
import LoginAdmin from "./admin/component/LoginAdmin/LoginAdmin";
import ProtectedAdminRoutes from "./ProtectedAdminRoutes";
import { getUserCurrent } from "./store/loginSlice";
import { useEffect } from "react";
import ProtectedUserRoutes from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedUserRoutes />} />
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="category" element={<HomeCategory />} />
          <Route path="detail" element={<DetailProduct />} />
          <Route path="about-us" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin/*" element={<ProtectedAdminRoutes />} />
          <Route path="/private/login" element={<LoginAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
