"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from ".";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword) {
      router.push(`/?keyword=${keyword}`);
    } else {
      router.push("/");
    }
  };

  return (
    <form
      className="flex flex-nowrap items-center w-full order-last md:order-none mt-5 md:mt-0 md:w-2/4 lg:w-2/4"
      onSubmit={submitHandler}
    >
      <input
        className="flex-grow appearance-none border border-gray-200 bg-gray-100 rounded-md mr-2 p-3 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        type="text"
        placeholder="Search for a product... "
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        required
      />
      <Button
        type="button"
        onClick={submitHandler}
        disabled={keyword.length < 1}
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
