import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCartTotal } from "../../store/cartSlice";
import { getUserById, getUserCurrent } from "../../store/loginSlice";
import { FaCartPlus, FaShippingFast, FaSignOutAlt } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiOutlinePhone,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Affix } from "antd";

const Navbar = () => {
  const navigator = useNavigate();
  const user = useSelector((state) => state.login.userCurrent?.email);
  const cartProducts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCurrent(localStorage.getItem("userId")));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigator("/login");
  };



  return (
    <nav>
      <div className="h-14 px-44 bg-black grid grid-cols-2">
        <div className="text-slate-100 flex items-center gap-x-3">
          <FaShippingFast size={20} color="orange" />
          <span className="text-lg font-bold">
            FREE Express Shipping On Orders $570+
          </span>
        </div>
        <div className="text-white flex items-center justify-center gap-x-3">
          <AiOutlinePhone size={20} color="#74b9ff" /> Hotline : +(402) 763 282
          46
        </div>
      </div>
      <Affix>
        <div className="navbar-content py-6 bg-white shadow-sm">
          <div>
            <div className="flex flex-between px-44">
              <Link
                to="/"
                className="flex justify-start items-center text-6xl font-bold"
              >
                <span>Shopping</span>
                <span className="text-gold">Hub.</span>
              </Link>
              <div className="navbar-btns flex gap-x-12">
                <div className="flex gap-x-6">
                  <Link to={"/"}>Home</Link>
                  <Link to={"/about-us"}>About us</Link>
                  <Link to={"/contact"}>Contact</Link>
                </div>
                <div className="flex gap-x-3">
                  <div className="rounded-full h-16 w-16 border-solid border-2 border-slate-300 flex justify-center items-center">
                    <AiOutlineUser size={24} />
                  </div>
                  <p
                    onClick={handleLogout}
                    className="text-black cursor-pointer my-[2rem]"
                  >
                    {user ? " Đăng Xuất" : "Đăng nhập"}
                  </p>
                </div>
                <Link to="/cart" className="add-to-cart-btn flex">
                  <div className="btn-txt fw-5">
                    <AiOutlineShopping size={24} color="black" />
                    {cartProducts.length > 0 ? (
                      <span className="cart-count-value">
                        {cartProducts.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Affix>
    </nav>
  );
};

export default Navbar;
