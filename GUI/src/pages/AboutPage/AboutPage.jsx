import UserLayout from "../../admin/layouts/UserLayout";

export default function AboutPage() {
  window.scroll(0, 0);
  return (
    <UserLayout>
      <div className="py-28">
        <div className="text-5xl font-bold mb-8 px-44">
          Well-coordinated Teamwork Speaks About Us
        </div>
        <img
          src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/about/about-big-1.jpg"
          alt="about"
          className="rounded-md px-44"
        />
        <div className="mt-16 px-44">
          <div>
            We are thrilled to offer you a wide range of products that you won't
            find anywhere else. Whether you're shopping for clothing,
            accessories, gadgets, or home decor, we have something for everyone.
          </div>
          <br />
          <div>
            Our commitment to quality is reflected in every product we offer. We
            work with top suppliers and manufacturers to ensure that every item
            we sell meets our high standards for durability, performance, and
            style. And with a user-friendly interface and intuitive navigation,
            shopping on our site is a breeze. We understand that security is a
            top concern for online shoppers, which is why we employ the latest
            encryption technologies and follow industry best practices to keep
            your personal information safe. And with fast, reliable shipping
            options, you can enjoy your purchases in no time.
          </div>
        </div>
        <div className="mt-32 bg-[#f8f8f8] grid grid-cols-2 p-36 gap-x-36">
          <div>
            <div className="font-bold text-6xl">About our Online Store</div>
            <div className="my-16">
              At our eCommerce site, we are passionate about providing our
              customers with the best possible shopping experience. From our
              extensive product selection to our exceptional customer service,
              we are committed to exceeding your expectations.
            </div>
            <div>
              So start browsing today and find the perfect products to suit your
              needs!
            </div>
          </div>
          <div>
            <img
              src="https://html.weblearnbd.net/shofy-prv/shofy/assets/img/history/history-1.jpg"
              alt="img"
            />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
