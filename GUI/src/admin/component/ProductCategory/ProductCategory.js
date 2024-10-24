import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ProductCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:3000/products?categoryId=${category}&_expand=category`
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

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Miêu tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name, // Hiển thị tên của loại sản phẩm
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
  ];

  return (
    <div>
      <div className="flex ">
        <h1>Sản phẩm {products[0]?.category?.name}</h1>
      </div>
      <div className="mt-[2rem]">
        <Table dataSource={products} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default ProductCategory;
