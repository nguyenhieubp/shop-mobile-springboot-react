/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      backgroundImage: {
        "banner-1":
          "url('https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/banner/product-banner-1.jpg')",
        "banner-2":
          "url('https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/banner/product-banner-2.jpg')",
        "banner-3":
          "url('https://html.weblearnbd.net/shofy-prv/shofy/assets/img/product/gadget/gadget-banner-1.jpg')",
      },
    },
  },
  plugins: [],
};
