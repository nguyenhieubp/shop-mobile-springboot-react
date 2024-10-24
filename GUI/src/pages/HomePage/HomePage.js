import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/productSlice";
import "./HomePage.scss";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCartOfUser } from "../../store/cartSlice";
import UserLayout from "../../admin/layouts/UserLayout";

const HomePage = () => {
  const dispatch = useDispatch();

  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    dispatch(getCartOfUser(localStorage.getItem("userId")));
  }, [localStorage.getItem("userId")]);

  return (
    <UserLayout>
      <div className="home-page">
        <ProductList products={products} status={productStatus} />
      </div>
    </UserLayout>
  );
};

export default HomePage;
