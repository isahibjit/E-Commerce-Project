import React from "react";
import aboutusBg from "../assets/aboutusmodel.jpg";
const About = () => {
  return (
    <div className="border border-gray-400 border-x-0 border-b-0">
      <div className="flex  flex-col py-8   gap-12">
        <div className="flex items-center justify-center">
          <h1 className="font-semibold  roboto-regular text-gray-500 text-2xl  ">
            ABOUT <span className="text-gray-800 font-semibold"> US</span>
          </h1>
          <span className="w-13 h-[2px] bg-gray-900"></span>
        </div>
        <div className="flex md:flex-row flex-col  md:max-w-[90%]   items-center gap-8">
          <div className="md:w-[60%] w-full">
            {/* this will have images */}
            <img
              src={aboutusBg}
              className="rounded-lg"
              alt="branding model image"
            />
          </div>
          <div className="w-2/3 text-gray-600 flex flex-col gap-8">
            <p>
              Welcome to <strong>Extrobuy</strong> – your ultimate fashion
              destination for Men, Women, and Kids! At Extrobuy, we believe
              fashion is more than just clothing – it's a way to express your
              personality, confidence, and style. Whether you're dressing for
              comfort, warmth, or making a bold statement, we've got you
              covered.
            </p>

            {/* This will contain all the texts and paragraphs */}

            <p>
              <strong>What We Offer</strong>
              <br />
              We bring you a wide range of stylish and comfortable clothing for
              every season and occasion:
            </p>

            <ul>
              <li>
                👕 <strong>Topwear:</strong> T-shirts, shirts, kurtas, and more
              </li>
              <li>
                🧥 <strong>Winterwear:</strong> Hoodies, jackets, sweaters –
                stay cozy and trendy
              </li>
              <li>
                👖 <strong>Bottomwear:</strong> Jeans, joggers, leggings,
                trousers, and more
              </li>
            </ul>

            <p>
              Designed for Men, Women, and Kids, our collections are carefully
              curated to offer the perfect blend of quality, comfort, and
              affordability – all in one place.
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center md:justify-start justify-center">
            <h1 className="font-semibold  roboto-regular text-gray-500 text-2xl  ">
              WHY CHOOSE{" "}
              <span className="text-gray-800 font-semibold"> US</span>
            </h1>
            <span className="w-13 h-[2px] bg-gray-900"></span>
          </div>
          <div className="grid md:grid-cols-3 ">
            <div className="border border-gray-300 border-r-0 px-16 py-18 ">
              <div className=" flex flex-col ">
                <b>Trendy Styles</b>
                <p>
                  {" "}
                  Stay updated with the latest fashion trends for all seasons
                  and occasions.
                </p>
              </div>
            </div>

            <div className="border border-gray-300 border-r-0 px-16 py-18 ">
              <div className="">
                <b>Quality You Can Trust</b>
                <p> Durable fabrics, precise stitching, and perfect fits – made to last.</p>
              </div>
            </div>
            <div className="border border-gray-300 px-16 py-18 ">
              <div className="">
                <b>Affordable Prices</b>
                <p>Stylish fashion that won’t hurt your wallet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
