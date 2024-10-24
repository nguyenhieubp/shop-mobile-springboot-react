import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import "./EditUser.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, updateUser } from "../../../store/loginSlice";
import { Button, Form, Input, notification } from "antd";
import validators from "../../../utils/validators";

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email: encodedEmail } = useParams();
  const email = decodeURIComponent(encodedEmail);

  useEffect(() => {
    dispatch(getUserById(email));
  }, [dispatch, email]);

  const { userUpdate } = useSelector((state) => state.login);
  const [isCurrentPasswordInvalid, setIsCurrentPasswordInvalid] =
    useState(false);
  const handleSubmit = (values) => {
    if (values.currentPassword !== userUpdate.password) {
      setIsCurrentPasswordInvalid(true);
      return;
    }

    dispatch(
      updateUser({
        id: email,
        email: values.email,
        password: values.newPassword,
      })
    );

    navigate("/admin/dashboard/user");
  };

  return (
    <div className="grid grid-cols-3">
      <div>CẬP NHẬT NGƯỜI DÙNG</div>
      <Form
        onFinish={handleSubmit}
        initialValues={{
          email: userUpdate?.email,
          currentPassword: "",
          newPassword: "",
        }}
        className="col-start-2 col-end-3"
      >
        <Form.Item
          label="Email"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ email !",
            },
            {
              validator(_, value) {
                if (!validators.email.test(value)) {
                  return Promise.reject("Không đúng định dạng email !");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input prefix={<FaUser />} placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          label="Mật khẩu hiện tại"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="currentPassword"
          hasFeedback
          validateStatus={isCurrentPasswordInvalid ? "error" : ""}
          help={
            isCurrentPasswordInvalid ? "Mật khẩu hiện tại không chính xác!" : ""
          }
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu hiện tại!",
            },
          ]}
        >
          <Input.Password
            prefix={<FaLock />}
            size="large"
            placeholder="Mật khẩu hiện tại"
            onChange={() => setIsCurrentPasswordInvalid(false)} // Đặt lại khi người dùng thay đổi giá trị
          />
        </Form.Item>
        <Form.Item
          label="Mật khẩu Mới"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới!",
            },
            {
              validator(_, value) {
                if (validators.space.test(value)) {
                  return Promise.reject("Không bao gồm khoảng trắng ở đầu !");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password
            prefix={<FaLock />}
            size="large"
            placeholder="Mật khẩu mới"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            THAY ĐỔI
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
