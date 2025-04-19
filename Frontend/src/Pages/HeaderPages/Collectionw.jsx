import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
import ProductCard from "../../Admin/ProductsPage/ProductCard";
import SortCollection from "./CollectionAdmin/SortCollection";
import FilterCollection from "./CollectionAdmin/FilterCollection";

const Collection = () => {
  const [queries, setQueries] = useState({
    categories: [],
    types: [],
    sort: "default",
  });

  const fetchProducts = async ({ pageParam = 1 }) => {
    const url = new URL(`${BACKEND_API}api/product/filter`);
    queries.types.forEach((type) => url.searchParams.append("type[]", type));
    queries.categories.forEach((cat) =>
      url.searchParams.append("category[]", cat)
    );
    url.searchParams.append("sort", queries.sort);
    url.searchParams.append("_page", pageParam);

    const response = await axios.get(url.toString(), {
      withCredentials: true,
    });

    if (response.status === 200) {
      return {
        data: response.data.products,
        nextPage: response.data.products.length === 0 ? undefined : pageParam + 1,
      };
    } else {
      toast.error("Failed to load products");
      return { data: [], nextPage: undefined };
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["products", queries],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  const handleCharacterChange = (category) => {
    setQueries((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleTypeChange = (type) => {
    setQueries((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleSortChange = (sort) => {
    setQueries((prev) => ({
      ...prev,
      sort: sort === prev.sort ? "default" : sort,
    }));
  };

  const products =
    data?.pages?.flatMap((page) => page.data) || [];

  return (
    <div className="flex md:flex-row flex-col gap-8 border border-x-0 border-b-0 border-gray-400">
      <FilterCollection
        handleCharacterChange={handleCharacterChange}
        handleTypeChange={handleTypeChange}
        filterClicked={false}
        
      />
      <div className="w-full">
        <SortCollection handleSortChange={handleSortChange} />
        <div className="grid justify-center 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
          {products.map((product, idx) => (
            <ProductCard key={product.product_id || idx} product={product} />
          ))}
        </div>
        {isLoading && <p>Loading...</p>}
        {isFetchingNextPage && <p>Loading more...</p>}
        {!hasNextPage && <p className="text-center text-gray-500">No more products to load.</p>}
      </div>
    </div>
  );
};

export default Collection;
