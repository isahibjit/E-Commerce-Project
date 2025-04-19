import React from "react";

const Contact = () => {
  return (
    <div className=" py-8 px-4 sm:px-6 lg:px-8 min-h-[65vh] border border-x-0 border-b-0 border-gray-400 bg">
      <div className="max-w-7xl mx-auto text-center">
      <div className="flex items-center justify-center mb-8">
          <h1 className="font-semibold  roboto-regular text-gray-500 text-2xl  ">
            CONTACT <span className="text-gray-800 font-semibold"> US</span>
          </h1>
          <span className="w-13 h-[2px] bg-gray-900"></span>
        </div>
        <p className="text-xl text-gray-600 mb-12">
          We're here to assist you with any questions or concerns!
        </p>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Visit Us */}
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M2 3a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V3zm3 2v12h12V5H5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Visit Us
            </h3>
            <p className="text-gray-600">Amritsar, Punjab, India</p>
          </div>

          {/* Email Us */}
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M2 3a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V3zm3 2v12h12V5H5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Email Us
            </h3>
            <a
              href="mailto:sahibjitsinghramghria@gmail.com"
              className="text-blue-600 hover:underline"
            >
              sahibjitsinghramghria@gmail.com
            </a>
          </div>

          {/* Call Us */}
          <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M2 3a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V3zm3 2v12h12V5H5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Call Us
            </h3>
            <p className="text-gray-600">+91 7837659473</p>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 flex justify-center space-x-8">
          <a href="https://linkedin.com/in/sahibjit-singh748" target="blank">
            <img
              align="center"
              src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
              alt="sahibjit-singh748"
              height="30"
              width="40"
            />
          </a>
          <a href="https://instagram.com/liljat46" target="blank">
            <img
              align="center"
              src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg"
              alt="liljat46"
              height="30"
              width="40"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
