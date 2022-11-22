import React, { useRef } from "react";
import { IoMdSearch } from "react-icons/io";
export default function SearchBar() {
  const inputDiv = useRef();
  return (
    <form>
      <div
        className="flex items-center gap-2 p-2 rounded-lg input-control"
        onClick={() => inputDiv.current.focus()}
      >
        <IoMdSearch className="search-icon text-xl" />
        <input
          type="text"
          placeholder="Search for a city"
          className="bg-transparent opacity-100 w-full"
          ref={inputDiv}
        />
      </div>
    </form>
  );
}
