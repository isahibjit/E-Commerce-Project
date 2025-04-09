import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [filterClicked, setfilterClicked] = useState(false);
  useEffect(() => {
    const fetchDefaultProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/filter/?sort=default&_page=${page}`,
          { withCredentials: true }
        );

        if (response.status === 200) {
          const data = response.data.products;
          setProducts(data);
        } else {
          toast.error("Probably Empty");
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };
    fetchDefaultProducts();
  }, []);

  const [queries, setQueries] = useState({
    categories: [],
    types: [],
    sort: "default",
  });

  const handleTypeChange = async (type) => {
    setQueries((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleCharacterChange = async (categories) => {
    setQueries((prev) => ({
      ...prev,
      categories: prev.categories.includes(categories)
        ? prev.categories.filter((c) => c !== categories)
        : [...prev.categories, categories],
    }));
  };
  const handleSortChange = async (sort) => {
    setQueries((prev) => ({
      ...prev,
      sort: prev.sort.includes(sort) ? "" : sort,
    }));
    console.log(queries);
  };
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      try {
        const url = new URL("http://localhost:3000/api/product/filter");
        queries.types.forEach((type) =>
          url.searchParams.append("type[]", type)
        );
        queries.categories.forEach((category) =>
          url.searchParams.append("category[]", category)
        );
        url.searchParams.append("sort", queries.sort);
        url.searchParams.append("_page", page);

        const response = await axios.get(url.toString(), {
          withCredentials: true,
        });
        if (response.status === 200) {
          const newData = response.data.products;
          setProducts(newData);
        }
      } catch (error) {
        console.log(error);
        if (error.status === 404)
          return toast.info(error.response.data.message);
        toast.info(error.message);
      }
    };
    if (
      queries.types.length > 0 ||
      queries.categories.length > 0 ||
      queries.sort !== "default"
    ) {
      fetchFilteredProducts();
    } else {
      (async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/api/product/filter/?sort=default",
            {
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            const data = response.data.products;
            setProducts(data);
          }
        } catch (error) {
          toast.error(error.message);
          console.log(error);
        }
      })();
    }
  }, [queries]);

  return (
    <div className="flex md:flex-row flex-col gap-8   border border-x-0 border-b-0 border-gray-400">
      <div className="md:w-[20%] w-full">
      <div className="flex items-center pt-8">
        <h1 className="roboto-regular text-xl text-gray-800">FILTERS </h1>
        {filterClicked ? (
          <span
            onClick={() => setfilterClicked(false)}
            className={`cursor-pointer md:hidden block`}
          >
            <FaAngleDown />
          </span>
        ) : (
          <span
            onClick={() => setfilterClicked(true)}
            className={`cursor-pointer md:hidden block`}
          >
            <FaAngleRight />
          </span>
        )}
      </div>
      <div
        className={`  md:block ${
          filterClicked ? "block" : "hidden"
        }`}
      >
        <div className="md:flex   flex-col gap-4 py-8 ">
          <div className="border sticky  border-gray-300  flex flex-col gap-2 px-8 py-4">
            <h1 className="text-gray-950 font-semibold">CATEGORIES</h1>
            <div className="flex gap-2 text-gray-500">
              <input
                onClick={() => handleCharacterChange("Men")}
                type="checkbox"
                id="Men"
              />
              <label htmlFor="Men">Men</label>
            </div>
            <div className="flex gap-2 text-gray-500">
              <input
                onClick={() => handleCharacterChange("Women")}
                type="checkbox"
                id="Women"
              />
              <label htmlFor="Women">Women</label>
            </div>
            <div className="flex gap-2 text-gray-500">
              <input
                onClick={() => handleCharacterChange("Kids")}
                type="checkbox"
                id="Kids"
              />
              <label htmlFor="Kids">Kids</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-8">
          <div className="border w-full border-gray-300  flex flex-col gap-2 px-8 py-4">
            <h1 className="text-gray-950 font-semibold">Types</h1>
            <div className="flex gap-2 text-gray-500">
              <input
                onClick={() => handleTypeChange("Topwear")}
                type="checkbox"
                id="Topwear"
              />
              <label htmlFor="Topwear">Topwear</label>
            </div>
            <div className="flex gap-2 text-gray-500">
              <input
                onClick={() => handleTypeChange("Bottomwear")}
                type="checkbox"
                id="Bottomwear"
              />
              <label htmlFor="Bottomwear">Bottomwear</label>
            </div>
            <div className="flex gap-2 text-gray-500">
              <input
                onClick={() => handleTypeChange("Winterwear")}
                type="checkbox"
                id="Winterwear"
              />
              <label htmlFor="Winterwear">Winterwear</label>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="w-full ">
        <div className="flex justify-between pt-7">
          <div className="flex items-center justify-start ">
            <h1 className="font-semibold  roboto-regular text-gray-500 text-2xl  ">
              ALL{" "}
              <span className="text-gray-800 font-semibold"> COLLECTIONS</span>
            </h1>
            <span className="w-13 h-[2px] bg-gray-900"></span>
          </div>
          <div>
            <select
              onChange={(e) => {
                handleSortChange(e.target.value);
              }}
              className="border-[2px] text-gray-700 border-gray-300 px-2 py-3 rounded-lg"
            >
              <option value="default" className="px-24">
                Sort By: Relevant
              </option>
              <option value="ASC" className="px-24">
                Sort By: Low to High
              </option>
              <option value="DESC" className="px-24">
                Sort By: High to Low
              </option>
            </select>
          </div>
        </div>
        <div className="">
          <div className="grid  justify-center  2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 ">
            {products.map((product) => (
              <div className="card bg-base-100 w-72 h-[500px] shadow-sm md:my-12 my-4">
                <figure>
                  <Link
                    to={`/product/${product.product_id}/${product.product_name}`}
                  >
                    <img
                      src={`https://res.cloudinary.com/sunnysingh78376/image/upload/v1743870766/${product.product_img_url}`}
                      alt="Shoes"
                      className="hover:scale-120 transition-all duration-200 cursor-pointer"
                    />
                  </Link>
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {product.product_name}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p className="line-clamp-1 ">{product.product_description}</p>
                  <div className="flex justify-between">
                    <div className="card-actions">
                      <div className="flex items-center">
                        <FaRupeeSign className="text-xl text-gray-800" />
                        <span className="md:text-2xl text-lg font-serif font-semibold">
                          {product.product_price}
                        </span>
                      </div>
                    </div>
                    <div className="">
                      <button className="w-fit px-4 bg-[#ffa41c] hover:bg-[#ff8400] transition-all duration-200 cursor-pointer  py-2 rounded-lg ">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
