import React, { useState, useEffect } from "react";
import UserLayout from "../../admin/layouts/UserLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";

const HomeCategory = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const category = location.state.data;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:3000/products?categoryId=${category.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const buyProduct = (data) => {
    navigation("/detail", { state: { data } });
  };

  return (
    <UserLayout>
      <div className="px-[10rem]">
        <h1>Tìm kiếm sản phẩm : {category.name}</h1>
        <div className="grid grid-cols-5 gap-10">
          {products.map((product) => (
            <div
              onClick={() => buyProduct(product)}
              className="product-item bg-white border border-gray-200 border-solid rounded-md"
              key={product.id}
            >
              <div className="product-item-img">
                <img
                  src={product.images[0]}
                  alt=""
                  className="rounded-md h-96 w-full"
                />
              </div>
              <div className="px-2 py-4">
                <p>Category: {product.category.name}</p>
                <h6 className="product-item-title text-black capitalize font-bold text-xl">
                  {product.title}
                </h6>

                <div className="product-item-price text-blue-400 font-semibold text-2xl">
                  {formatPrice(product.price)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default HomeCategory;
