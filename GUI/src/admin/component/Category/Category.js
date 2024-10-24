import React, { useEffect, useState, useRef } from "react";
import {
  Switch,
  Table,
  Button,
  Modal,
  Checkbox,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  updateIsShowHomeStatus,
} from "../../../store/categorySlice";

export const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.category);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [switchStates, setSwitchStates] = useState(
    categories.map((category) => category?.isShowHome == true)
  );
  useEffect(() => {
    const newSwitchStates = categories?.map(
      (category) => category.isShowHome === true
    );
    setSwitchStates(newSwitchStates);
  }, [categories]);

  useEffect(() => {
    const newSwitchStates = categories.map(
      (category) => category.isShowHome === true
    );
    setSwitchStates(newSwitchStates);
  }, [categories]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const imageInputRef = useRef(null);

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const handleSwitchChange = (index) => {
    const categoryToUpdate = categories[index];
    const newIsShowHomeStatus = !categoryToUpdate.isShowHome;

    dispatch(
      updateIsShowHomeStatus({
        id: categoryToUpdate.id,
        isShowHome: newIsShowHomeStatus,
      })
    );
  };

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile([e.target.result]);
        setSelectedImage(e.target.result); // Cập nhật giá trị cho selectedImage tại đây
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const columns = [
    {
      title: "Loại sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record, index) => (
        <Switch
          checked={switchStates[index]}
          onChange={() => handleSwitchChange(index)}
        />
      ),
    },
    {
      title: "Chỉnh sửa",
      key: "edit",
      render: (text, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
    {
      title: "Xóa",
      key: "delete",
      render: (text, record) => (
        <Popconfirm
          title="Bạn có chắc muốn xóa loại sản phẩm này?"
          onConfirm={() => handleDelete(record.id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Button className="bg-red-600 text-white" type="danger">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Danh sách sản phẩm",
      key: "products",
      render: (text, record) => (
        <a href={`/admin/dashboard/product/${record?.id}`}>Xem sản phẩm</a>
      ),
    },
  ];

  const onFinish = (values) => {
    dispatch(
      createCategory({
        image: file[0],
        name: values.category_name,
        isShowHome: true,
      })
    );
    setIsModalOpen(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);

    // Nếu category có ảnh, cập nhật selectedImage state
    if (category.image) {
      setSelectedImage(category.image);
    } else {
      setSelectedImage(null);
    }
    setIsEditModalOpen(true);
  };

  const onFinishEdit = (values) => {
    const updatedCategoryData = {
      name: values.category_name,
      image: file[0],
      isShowHome: true,
    };
    console.log(editCategory.id);
    dispatch(
      editCategory({
        id: editingCategory.id,
        updatedCategory: updatedCategoryData,
      })
    );
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div className="flex ">
        <h1>Category</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="ml-[2rem] mt-[2rem]"
          type="primary"
        >
          Thêm
        </Button>
      </div>
      <div className="mt-[2rem]">
        <Table dataSource={categories} columns={columns} rowKey="id" />
      </div>
      <Modal
        title="Thêm danh mục sản phẩm"
        width={"50%"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên danh mục"
            name="category_name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            rules={[
              { required: true, message: "Vui lòng chọn ảnh sản phẩm !" },
            ]}
          >
            <Input
              type="file"
              name="image"
              ref={imageInputRef}
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected product"
                className="mt-4"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chỉnh sửa danh mục sản phẩm"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={null}
      >
        <Form
          name="editCategoryForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            category_name: editingCategory?.name,
            // Bạn cần thêm các giá trị khác nếu cần
          }}
          onFinish={onFinishEdit}
        >
          <Form.Item
            label="Tên danh mục"
            name="category_name"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ảnh"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
          >
            <Input
              type="file"
              name="image"
              ref={imageInputRef}
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Selected product"
                className="mt-4"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
            )}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
