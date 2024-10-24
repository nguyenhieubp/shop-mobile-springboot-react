import { Button, Checkbox, Form, Input } from "antd";
import UserLayout from "../../admin/layouts/UserLayout";
import { contact } from "../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../store/contactSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { getUserCurrent } from "../../store/loginSlice";
export default function ContactPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  window.scroll(0, 0);
  const user = useSelector((state) => state.login.userCurrent?.email);

  useEffect(() => {
    dispatch(getUserCurrent(localStorage.getItem("userId")));
  }, []);

  const onFinish = (values) => {
    const dataToSubmit = {
      ...values,
      email: user,
      id: uuidv4(),
    };
    console.log(dataToSubmit.id);
    dispatch(addContact(dataToSubmit));
    navigate("/");
  };
  return (
    <UserLayout>
      <div className="py-28 px-44">
        <div className="text-center font-bold text-5xl">
          Keep In Touch with Us
        </div>
        <div className="border border-solid border-slate-200 mt-16 rounded-md py-14 px-24 grid grid-cols-3 gap-x-6">
          <div className="col-start-1 col-end-3">
            <div className="text-3xl mb-8 font-bold">Sent A Message</div>
            <div>
              <Form
                initialValues={{
                  remember: true,
                  email: user,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Your Email" disabled />
                </Form.Item>
                <Form.Item
                  name="subject"
                  rules={[
                    {
                      required: true,
                      message: "Please input your subject!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Subject" />
                </Form.Item>

                <Form.Item
                  name="message"
                  rules={[
                    {
                      required: true,
                      message: "Please input your message!",
                    },
                  ]}
                >
                  <Input.TextArea size="large" placeholder="Your Message" />
                </Form.Item>

                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </Checkbox>
                  </Form.Item>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button"
                    style={{
                      backgroundColor: "black",
                    }}
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          <div className="px-4">
            <img src={contact} alt="contact" />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
