import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "./component/User/User";
import "./admin.css";
import EditUser from "./component/EditUser/EditUser";
import Home from "./Home";
import Product from "./component/Product/Product";
import EditProduct from "./component/EditProduct/EditProduct";
import Order from "./component/Order/Order";
import CreateProduct from "./component/CreateProduct/CreateProduct";
import AdminLayout from "../admin/layouts/AdminLayout";
import { Category } from "./component/Category/Category";
import ProductCategory from "./component/ProductCategory/ProductCategory";
import Contact from "./component/Contact/Contact";

const Admin = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard/home" element={<Home />} />
        <Route path="dashboard/category" element={<Category />} />
        <Route path="dashboard/user" element={<User />} />
        <Route path="dashboard/user/edit/:email" element={<EditUser />} />
        <Route path="dashboard/product" element={<Product />} />
        <Route
          path="dashboard/product/:category"
          element={<ProductCategory />}
        />
        <Route path="dashboard/product/edit/:name" element={<EditProduct />} />
        <Route path="dashboard/order" element={<Order />} />
        <Route path="/dashboard/product/create" element={<CreateProduct />} />
        <Route path="dashboard/contact" element={<Contact />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
