import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrders, getAllOrders } from "../../../store/orderSlice";
import { Button, Input, Modal, Table } from "antd";

const Order = () => {
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const { listOrder } = useSelector((state) => state.order);
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrders(listOrder);
  }, [listOrder]);
  console.log(listOrder);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredOrders = orders.filter((order) =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const deleteOrder = (id) => {
    dispatch(deleteOrders(id));
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa đơn hàng này không?",
      width: 500,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteOrder(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  function showDetail(x) {
    setId(x);
    setIsModalOpen(true);
  }

  const convertUTCToVietnamTime = (utcDate) => {
    const utcTime = new Date(utcDate);
    const vietnamTime = new Date(utcTime.getTime() + 7 * 60 * 60 * 1000);

    const day = String(vietnamTime.getDate()).padStart(2, "0");
    const month = String(vietnamTime.getMonth() + 1).padStart(2, "0");
    const year = vietnamTime.getFullYear();
    const hours = String(vietnamTime.getHours()).padStart(2, "0");
    const minutes = String(vietnamTime.getMinutes()).padStart(2, "0");
    const seconds = String(vietnamTime.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const dataSource = filteredOrders.map((x) => ({
    key: x.id,
    customerName: x.customerName,
    phone: x.phone,
    address: x.address,
    dateCreated: convertUTCToVietnamTime(x.dateCreated),
    actions: (
      <div className="flex gap-3">
        <Button type="primary" onClick={() => showDetail(x.id)}>
          Chi tiết
        </Button>
        <Button type="primary" danger onClick={() => showDeleteConfirm(x.id)}>
          Xóa
        </Button>
      </div>
    ),
  }));

  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ngày mua",
      dataIndex: "dateCreated",
      key: "dateCreated",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const dataSource2 = filteredOrders
    .find((x) => x.id === id)
    ?.detail?.map((x) => ({
      key: x.id,
      product: (
        <div className="flex gap-x-4">
          {x.title}
        </div>
      ),
      customerName: filteredOrders.find((x) => x.id === id).customerName,
      phone: filteredOrders.find((x) => x.id === id).phone,
      address: filteredOrders.find((x) => x.id === id).address,
      price: Number(x.price).toLocaleString(),
      quantity: x.quantity,
      total: (Number(x.price) * x.quantity).toLocaleString(),
    }));

  const columns2 = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
    },
  ];

  const totalPrice = filteredOrders
    .find((x) => x.id === id)
    ?.detail?.reduce((acc, o) => acc + parseInt(o.price) * o.quantity, 0);

  return (
    <div>
      <Input
        size="large"
        placeholder="Tìm kiếm..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Chi tiết đơn hàng"
        width={"80%"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Table dataSource={dataSource2} columns={columns2} />
        {/* Assuming you want to display the totalPrice */}
        <div style={{ fontSize: 20, color: "red" }}>
          Tổng tiền : {Number(totalPrice).toLocaleString()} $
        </div>
      </Modal>
    </div>
  );
};

export default Order;
