import { Footer } from "antd/es/layout/layout";
import Navbar from "../../components/Navbar/Navbar";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";
import {
  AiOutlineEnvironment,
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FaVimeoV } from "react-icons/fa";
import { Divider } from "antd";

function UserLayout(props) {
  return (
    <div>
      <Navbar />
      <div>{props.children}</div>
      <Footer className="mt-16 p-0 footer">
        <div className="grid grid-cols-2 py-28 px-44 bg-[#0989FF] text-white">
          <div>
            <div className="font-bold">SALE 20% OFF ALL STORE</div>
            <div className="text-6xl font-bold">Subscribe our Newsletter</div>
          </div>
          <div>
            <Search
              placeholder="Enter Your Email"
              allowClear
              enterButton="Subscribe"
              size="large"
            />
          </div>
        </div>
        <div className="bg-[#F4F7F9] px-44 py-28 grid grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex justify-start items-center text-6xl font-bold"
            >
              <span>Shopping</span>
              <span className="text-gold">Hub.</span>
            </Link>
            <div className="text-2xl my-10 font-bold">
              We are a team of designers and developers that create high quality
              WordPress
            </div>
            <div className="flex gap-x-4">
              <div className="bg-white rounded-md border border-solid border-slate-200 w-16 h-16 flex justify-center items-center">
                <AiOutlineFacebook size={24} />
              </div>
              <div className="bg-white rounded-md border border-solid border-slate-200 w-16 h-16 flex justify-center items-center">
                <AiOutlineTwitter size={24} />
              </div>
              <div className="bg-white rounded-md border border-solid border-slate-200 w-16 h-16 flex justify-center items-center">
                <AiOutlineLinkedin size={24} />
              </div>
              <div className="bg-white rounded-md border border-solid border-slate-200 w-16 h-16 flex justify-center items-center">
                <FaVimeoV size={24} />
              </div>
            </div>
          </div>
          <div className="px-24">
            <div className="font-bold text-3xl">My Account</div>
            <ul className="list-disc ml-6 mt-5">
              <li>Track Orders</li>
              <li>Shipping</li>
              <li>Wishlist</li>
              <li>My Account</li>
              <li>Order History</li>
            </ul>
          </div>
          <div className="px-24">
            <div className="font-bold text-3xl">Infomation</div>
            <ul className="list-disc ml-6 mt-5">
              <li>Our Story</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Latest News</li>
            </ul>
          </div>
          <div className="px-24">
            <div className="font-bold text-3xl">Talk To Us</div>
            <ul className="mt-5">
              <li>Got Questions? Call us</li>
              <li className="font-bold text-4xl mb-6">+670 413 90 762</li>
              <li className="flex gap-x-3">
                <AiOutlineMail size={20} /> shofy@support.com
              </li>
              <li className="flex gap-x-3">
                <AiOutlineEnvironment size={20} /> 79 Sleepy Hollow St. Jamaica
              </li>
            </ul>
          </div>
          <div className="col-start-1 col-end-5 mt-28">
            <Divider />
            <div className="grid grid-cols-2">
              <div>
                © 2023 All Rights Reserved | HTML Template by Themepure.
              </div>
              <div className="flex justify-end items-end">
                <img
                  src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/footer/footer-pay.png"
                  alt="payment"
                  className="w-1/3"
                />
              </div>
            </div>
          </div>
        </div>
      </Footer>
    </div>
  );
}

export default UserLayout;
