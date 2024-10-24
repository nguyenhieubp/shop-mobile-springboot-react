import React, { useState } from "react";
import { STATUS } from "../../utils/status";
import "./ProductList.scss";
import SingleProduct from "../SingleProduct/SingleProduct";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "../../utils/helpers";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { Button, Carousel, Divider, Input, Pagination, Select } from "antd";
import { sliderImages } from "../../utils/images";
import { FaShippingFast, FaTicketAlt } from "react-icons/fa";
import {
  AiOutlineArrowRight,
  AiOutlineCustomerService,
  AiOutlineDollarCircle,
  AiOutlineTags,
} from "react-icons/ai";
import { getAllCategory } from "../../store/categorySlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products, status }) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { isModalVisible } = useSelector((state) => state.modal);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [productsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const categories = useSelector((state) => state.category.category);

  const buyProduct = (data) => {
    navigation("/detail", { state: { data } });
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.category?.name.toLowerCase().includes(category.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      } else if (sortOrder === "highToLow") {
        return b.price - a.price;
      } else {
        return 0;
      }
    });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const itemsPerPage = 12;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const size = filteredProducts.length;

  // Invoke when user click to request another page.
  const handlePageClick = (page) => {
    const newOffset = ((page - 1) * itemsPerPage) % size;
    setItemOffset(newOffset);
  };

  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;

  const openCategoryProduct = (item) => {
    navigation("/category", { state: { data: item } });
  };

  return (
    <>
      <section className="product">
        {isModalVisible && <SingleProduct />}
        <Carousel autoplay>
          <img src={sliderImages[0]} />
          <img src={sliderImages[1]} />
          <img src={sliderImages[2]} />
        </Carousel>
        <div className="px-44">
          <div className="grid grid-cols-5 gap-x-36 py-16">
            {categories
              .filter((cat) => cat.isShowHome === true)
              .map((item) => (
                <div key={item.id} onClick={() => openCategoryProduct(item)}>
                  <div className="w-full h-72 flex justify-center items-center bg-blue-200 rounded-full">
                    <img src={item.image} className="w-40 h-40" />
                  </div>
                  <div className="text-center mt-4">
                    <div className="font-bold">{item.name}</div>
                  </div>
                </div>
              ))}
          </div>
          <div className="grid grid-cols-4 gap-x-3">
            <div className="bg-[#F6F7F9] rounded-md px-2 py-8 grid grid-cols-4">
              <div className="flex justify-center items-center">
                <FaShippingFast size={32} color="#ff6b6b" />
              </div>
              <div className="col-start-2 col-end-5">
                <div className="font-bold">Free Delivary</div>
                <div>Orders from all item</div>
              </div>
            </div>
            <div className="bg-[#F6F7F9] rounded-md px-2 py-8 grid grid-cols-4">
              <div className="flex justify-center items-center">
                <AiOutlineDollarCircle size={32} color="#ff6b6b" />
              </div>
              <div className="col-start-2 col-end-5">
                <div className="font-bold">Return & Refunf</div>
                <div>Maney back guarantee</div>
              </div>
            </div>
            <div className="bg-[#F6F7F9] rounded-md px-2 py-8 grid grid-cols-4">
              <div className="flex justify-center items-center">
                <AiOutlineTags size={32} color="#ff6b6b" />
              </div>
              <div className="col-start-2 col-end-5">
                <div className="font-bold">Member Discount</div>
                <div>Onevery order over $140.00</div>
              </div>
            </div>
            <div className="bg-[#F6F7F9] rounded-md px-2 py-8 grid grid-cols-4">
              <div className="flex justify-center items-center">
                <AiOutlineCustomerService size={32} color="#ff6b6b" />
              </div>
              <div className="col-start-2 col-end-5">
                <div className="font-bold">Support 24/7</div>
                <div>Contact us 24 hours a day</div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Divider orientation="left">Lọc và tìm kiếm sản phẩm</Divider>
            <div className="flex gap-6 mt-3 mb-20">
              <Input.Search
                size="large"
                placeholder="Tìm kiếm..."
                allowClear
                onSearch={(value) => setSearchTerm(value)}
                className="w-1/2"
              />
              <Select
                placeholder="Chọn loại sắp xếp"
                allowClear
                size="large"
                onChange={(value) => setSortOrder(value)}
                options={[
                  {
                    value: "highToLow",
                    label: "Cao đến thấp",
                  },
                  {
                    value: "lowToHigh",
                    label: "Thấp đến cao",
                  },
                ]}
              />
            </div>
            <Divider orientation="left">Danh sách sản phẩm</Divider>
            <div className="grid grid-cols-4 gap-10">
              {currentItems.map((product) => (
                <div
                  className="product-item bg-white border border-gray-200 border-solid rounded-md"
                  key={product.id}
                  onClick={() => buyProduct(product)}
                >
                  <div className="product-item-img">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="rounded-md h-96"
                    />
                  </div>
                  <div className="px-10 py-4">
                    <div className="mt-3 text-slate-400">
                      {product.category.name}
                    </div>
                    <h6 className="product-item-title text-black capitalize  font-bold fs-15">
                      {product.title}
                    </h6>
                    <div className="product-item-price text-blue-400 fw-7 fs-18">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-20 text-center">
              {/* Pagination */}
              <Pagination
                showSizeChanger={false}
                defaultCurrent={1}
                onChange={handlePageClick}
                pageSize={itemsPerPage}
                total={size}
              />
            </div>
            <div className="mt-36 grid grid-cols-3 gap-x-10">
              <div className="col-start-1 col-end-3 bg-banner-1 h-96 rounded-md p-20">
                <div>Sale 20% off all store</div>
                <div className="capitalize text-4xl font-bold mt-3">
                  Smartphone BLU G91 Pro 2022
                </div>
                <div className="mt-8 flex gap-x-4">
                  Shop Now
                  <AiOutlineArrowRight />
                </div>
              </div>
              <div className="bg-banner-2 h-96 rounded-md p-20">
                <div className="capitalize text-4xl font-bold mt-3 w-2/3">
                  HyperX Cloud II Wireless
                </div>
                <div>Sale 35% off</div>
                <div className="mt-5 flex gap-x-4">
                  Shop Now
                  <AiOutlineArrowRight />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-24">
              <div>
                <div className="text-3xl font-bold mb-5">Discount Products</div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-1.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">HD Camera</div>
                    <div className="text-black text-2xl font-bold">
                      Oppo A96 5G Mobile Phone
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-2.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">Iron Man</div>
                    <div className="text-black text-2xl font-bold">
                      Single Stem Vase
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-3.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">Speaker</div>
                    <div className="text-black text-2xl font-bold">
                      Echo Dot smart speaker
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-5">Featured Products</div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-4.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">Motherboard</div>
                    <div className="text-black text-2xl font-bold">
                      CPU Cooler 6 Heat Pipes
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-5.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">Digital Camera</div>
                    <div className="text-black text-2xl font-bold">
                      Photography Camera
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-6.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">Smart Watches</div>
                    <div className="text-black text-2xl font-bold">
                      Real-Time Weather.
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-5">Selling Products</div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-7.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">Usb Flash Disk</div>
                    <div className="text-black text-2xl font-bold">
                      Metal Usb 3.0 Pen Drive 2TB
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-8.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">HawkEye</div>
                    <div className="text-black text-2xl font-bold">
                      HawkEye Fishtrax
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
                <div className="flex gap-x-5 mb-4">
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/sm/product-sm-9.jpg"
                    alt="img1"
                    className="w-56 rounded-md"
                  />
                  <div>
                    <div className="text-gray-400">Tablet</div>
                    <div className="text-black text-2xl font-bold">
                      Galaxy Tab S6 Android
                    </div>
                    <div className="text-blue-500 font-bold mt-4">$97.00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-16 grid grid-cols-3 gap-x-32">
              <div>
                <div className="grid grid-cols-2 border-3 border-solid border-[#FC427B] pl-16 pt-10 rounded-md">
                  <div>
                    <div>
                      <div className="font-bold text-3xl">
                        Electronics Gadgets
                      </div>
                      <div className="my-8">
                        <ul className="list-disc ml-7">
                          <li>Micrscope</li>
                          <li>Remote Control</li>
                          <li>Monitor</li>
                          <li>Thermometer</li>
                          <li>Backpack</li>
                          <li>Headphones</li>
                        </ul>
                      </div>
                      <div className="flex gap-x-3 font-bold">
                        More Products
                        <AiOutlineArrowRight />
                      </div>
                    </div>
                  </div>
                  <img
                    src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/gadget/gadget-girl.png"
                    alt="avt"
                  />
                </div>
                <div
                  className="bg-banner-3 h-72 rounded-md mt-12 px-16 py-20 text-white"
                  style={{
                    width: 380,
                  }}
                >
                  <div>Only $99.00</div>
                  <div className="font-bold">Selected novelty Products</div>
                </div>
              </div>
              <div className="col-start-2 col-end-4 grid grid-cols-3 gap-10">
                {currentItems.map(
                  (product, index) =>
                    index <= 5 && (
                      <div
                        className="product-item bg-white border border-gray-200 border-solid rounded-md"
                        key={product.id}
                      >
                        <div className="product-item-img">
                          <img
                            src={product.images[0]}
                            alt=""
                            className="rounded-md h-96"
                          />
                        </div>
                        <div className="px-10 py-4">
                          <div className="mt-3 text-slate-400">
                            {product.category.name}
                          </div>
                          <h6 className="product-item-title text-black capitalize  font-bold fs-15">
                            {product.title}
                          </h6>
                          <div className="product-item-price text-blue-400 fw-7 fs-18">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="my-32 bg-[#0989FF] rounded-md p-24 text-white grid grid-cols-2">
              <div>
                <div className="text-slate-200">Tablet Collection 2023</div>
                <div className="font-bold text-6xl my-6">
                  Samsung Galaxy Tab S6, Wifi Tablet
                </div>
                <div className="text-slate-200 line-through">$1240.00</div>
                <div>$975.00</div>
                <Button
                  type="primary"
                  size="large"
                  className="bg-black text-white mt-6"
                >
                  <span className="mx-8">Shop Now</span>
                </Button>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/banner/banner-slider-1.png"
                  alt="avt2"
                  style={{ width: 400 }}
                />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-x-12 my-32">
              <img
                src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/instagram/instagram-1.jpg"
                className="rounded-md"
              />
              <img
                src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/instagram/instagram-2.jpg"
                className="rounded-md"
              />
              <img
                src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/instagram/instagram-3.jpg"
                className="rounded-md"
              />
              <img
                src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/instagram/instagram-4.jpg"
                className="rounded-md"
              />
              <img
                src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/instagram/instagram-5.jpg"
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
