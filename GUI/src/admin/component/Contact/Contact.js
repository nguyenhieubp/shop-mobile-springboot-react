import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../../../store/contactSlice";
import { Button, Input, Modal, Table } from "antd";

const Contact = () => {
  const dispatch = useDispatch();
  const { confirm } = Modal;
  const reduxContacts = useSelector((state) => state.contact.contacts);
  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState(null); // Đã thêm vào đây
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    setContacts(reduxContacts);
  }, [reduxContacts]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showDetail = (x) => {
    setId(x.id);
    setIsModalOpen(true);
  };

  const dataSource = filteredContacts.map((x) => ({
    key: x.id,
    name: x.name,
    email: x.email,
    message: x.message,
    actions: (
      <div className="flex gap-3">
        <Button type="primary" onClick={() => showDetail(x)}>
          Chi tiết
        </Button>
      </div>
    ),
  }));

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tin nhắn",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Hành động",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  return (
    <div>
      <Input
        size="large"
        placeholder="Tìm kiếm..."
        onChange={(e) => handleSearchChange(e.target.value)}
      />
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Chi tiết liên hệ"
        width={"80%"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p>Name: {contacts.find((x) => x.id === id)?.name}</p>
        <p>Email: {contacts.find((x) => x.id === id)?.email}</p>
        <p>Message: {contacts.find((x) => x.id === id)?.message}</p>
      </Modal>
    </div>
  );
};

export default Contact;
