"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, productsCount }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page);

  let queryParams;

  const handlePageChange = (currentPage) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      if (queryParams.has("page")) {
        queryParams.set("page", currentPage);
      } else {
        queryParams.append("page", currentPage);
      }

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  return (
    <div className="flex mt-20 justify-center">
      <Pagination
        activePage={page}
        itemsCountPerPage={resPerPage}
        totalItemsCount={productsCount}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="relative inline-flex items-center border border-gray-300 rounded-[5px] bg-white px-4 py-2 text-sm font-medium mx-[4px] hover:bg-black hover:text-white focus:z-20"
        activeLinkClassName="z-10 inline-flex items-center border border-black bg-primary text-sm font-medium text-white focus:z-21 hover:bg-white hover:text-black"
        activeClass="z-10 inline-flex items-center border border-black rounded-lg bg-primary text-sm font-medium text-white focus:z-20 hover:bg-white hover:text-primary"
      />
    </div>
  );
};

export default CustomPagination;
