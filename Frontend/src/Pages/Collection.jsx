import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import stopImg from "./../assets/stop.png";
import ProductCard from "./ProductsPage/ProductCard";
import SortCollection from "./CollectionComponents/SortCollection";
import FilterCollection from "./CollectionComponents/FilterCollection";
import { useInfiniteQuery } from "@tanstack/react-query";
import { bouncy } from "ldrs";
import debounce from "lodash.debounce";
import ProductCardSkeleton from "./ProductsPage/Components/ProductCardSkeleton";
import { SearchContext } from "../Contexts/SearchContext";
import SearchBar from "./ProductsPage/Components/SearchBar";
const BACKEND_API = import.meta.env.VITE_BACKEND_API;
bouncy.register();

const Collection = () => {
  const [queries, setQueries] = useState({
    categories: [],
    types: [],
    sort: "default",
    searchQuery: "",
  });
  const { showSearch } = useContext(SearchContext);
  const [filterClicked, setFilterClicked] = useState(false);
  const fetchProducts = async ({ pageParam = 1 }) => {
    const url = new URL(`${BACKEND_API}api/product/filter`);
    queries.types.forEach((type) => url.searchParams.append("type[]", type));
    queries.categories.forEach((category) =>
      url.searchParams.append("category[]", category)
    );
    url.searchParams.append("sort", queries.sort);
    url.searchParams.append("_page", pageParam);
    url.searchParams.append("searchQuery", queries.searchQuery);
    const response = await axios.get(url.toString(), {
      withCredentials: true,
    });
    if (response.status === 200) {
      return {
        data: response.data.products,
        nextPage:
          response.data.products.length === 0 ? undefined : pageParam + 1,
      };
    } else {
      return {
        data: [],
        nextPage: undefined,
      };
    }
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["product", queries],
      queryFn: fetchProducts,
      getNextPageParam: (lastpage) => lastpage.nextPage,
      refetchOnWindowFocus: false,
    });

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  const debouncedSetQueries = debounce((updater) => {
    setQueries(updater);
  }, 200);
  const debouncedSetSearchQuery = useMemo(() =>
    debounce((updater) => {
      setQueries(updater);
    }, 500)
  );
  useEffect(() => {
    // Scroll to top only if user reloads from bottom
    if (
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - 300
    ) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const handleCharacterChange = (category) => {
    debouncedSetQueries((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleTypeChange = (type) => {
    debouncedSetQueries((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleSortChange = (sort) => {
    debouncedSetQueries((prev) => ({
      ...prev,
      sort: sort === prev.sort ? "default" : sort,
    }));
  };
  const handleSearchChange = (e) => {
    debouncedSetSearchQuery((prev) => ({
      ...prev,
      searchQuery: e.target.value,
    }));
  };
  const products = data?.pages?.flatMap((page) => page.data) || [];

  return (
    <div className=" border border-x-0 border-b-0 border-gray-300">
      {/* search form  */}
      {showSearch && <SearchBar handleSearchChange={handleSearchChange} />}
      <div className="flex md:flex-row flex-col gap-8  ">
        <FilterCollection
          handleCharacterChange={handleCharacterChange}
          handleTypeChange={handleTypeChange}
          filterClicked={filterClicked}
          setfilterClicked={setFilterClicked}
        />
        <div className="w-full ">
          <SortCollection handleSortChange={handleSortChange} />
          <div className="grid gap-6  justify-center  2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
            {isLoading ? (
              <>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
              </>
            ) : (
              products?.map((product, idx) => (
                <ProductCard key={idx} id={idx} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
      {isFetchingNextPage && (
        <div className="text-center">
          <l-bouncy size="50" speed="1.14" color="black"></l-bouncy>
        </div>
      )}
      {!hasNextPage && (
        <div className="text-center flex items-center justify-center">
          <p className="text-gray-500 md:text-2xl text-lg font-semibold">
            Nothing More To Load !
          </p>
          <img src={stopImg} className="w-22" alt="stop icon" />
        </div>
      )}
    </div>
  );
};

export default Collection;
