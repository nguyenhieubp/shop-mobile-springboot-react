import React, { useState } from "react";
import "./style.css";
import UserLayout from "../../admin/layouts/UserLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { addCartOfUser } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const DetailProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.data;
  const dispatch = useDispatch();
  window.scroll(0, 0);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  console.log(product);
  const handleAddToCart = () => {
    const cart = {
      id: new Date().getTime().toString(), // Hoặc bạn có thể sử dụng ID khác
      userId: localStorage.getItem("userId"),
      title: product.title,
      category: product.category.name,
      description: product.description,
      price: product.price,
      images: product.images,
      quantity: quantity, // Thêm số lượng sản phẩm vào giỏ hàng
    };
    dispatch(addCartOfUser(cart));
    navigate("/cart");
  };

  return (
    <UserLayout>
      <div className="container px-[10rem] mt-[5rem]">
        <div className="row">
          <div className="col-xs-4 item-photo">
            <img className="max-w-full" src={product.images[0]} alt="Product" />
          </div>
          <div className="col-xs-5 border-0 border-gray-400">
            <h3>{product.title}</h3>

            <h6 className="title-price">
              <small className="text-[1.5rem]">Giá</small>
            </h6>
            <h3 className="mt-2">{product.price} $</h3>

            <div className="section pb-5 mt-[2rem]">
              <div className="flex items-center">
                <div
                  className="btn-minus border-2 mr-2 border-solid"
                  onClick={decreaseQuantity}
                >
                  <span className="glyphicon glyphicon-minus"></span>
                </div>
                <div className="mx-[2rem] w-12 text-center">{quantity}</div>
                <div
                  className="btn-plus border-2 ml-2 border-solid"
                  onClick={increaseQuantity}
                >
                  <span className="glyphicon glyphicon-plus"></span>
                </div>
              </div>
            </div>

            <div className="section pb-5 mt-[2rem]">
              <button onClick={handleAddToCart} className="btn btn-success">
                <span className="mr-5 glyphicon glyphicon-shopping-cart"></span>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>

          <div className="col-xs-9">
            <div className="w-full border-t border-gray-400">
              <p className="p-4">
                <small>{product.description}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default DetailProduct;
