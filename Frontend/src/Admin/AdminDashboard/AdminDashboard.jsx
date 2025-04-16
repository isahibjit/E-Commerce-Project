import React from "react";
import { useOutletContext } from "react-router-dom";
import { FaBoxOpen, FaUsers, FaShoppingCart } from "react-icons/fa";

const AdminDashboard = () => {
  const { admin } = useOutletContext();

  const cards = [
    {
      title: "Products",
      desc: "Add, edit or remove products.",
      icon: <FaBoxOpen className="text-3xl text-rose-500" />,
    },
    {
      title: "Orders",
      desc: "Manage customer orders.",
      icon: <FaShoppingCart className="text-3xl text-rose-500" />,
    },
    {
      title: "Customers",
      desc: "Manage user details.",
      icon: <FaUsers className="text-3xl text-rose-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-rose-200 to-rose-300 p-6 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <img
            src="https://res.cloudinary.com/sunnysingh78376/image/upload/c_fill,g_auto,w_400/v1743870766/ChatGPT_Image_Apr_16_2025_09_25_27_PM_q0arg0.png"
            alt="Admin Profile"
            className="w-72 h-[28rem] object-cover object-top rounded-3xl shadow-xl border-4 border-rose-300 transition-transform duration-500 hover:scale-105"
          />

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-rose-700 mb-2">
              Welcome, {admin.name}
            </h1>
            <p className="text-gray-700 text-lg mb-8">
              You're in control of everything on <strong>ExtroBuy</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 shadow-md border border-rose-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4">{card.icon}</div>
                  <h2 className="text-xl font-semibold text-rose-700 group-hover:text-rose-800">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 mt-1">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
