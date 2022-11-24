import React, { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
export default function SearchBar({ onSearch, onFocuss, onBlurr }) {
  const inputDiv = useRef()
  const [search, setSearch] = useState("");

  const handleOnChange = (value) => {
    setSearch(value);
  };
  return (
    <form
      className="relative z-50"
      onSubmit={(e) => {
        e.preventDefault();
        if (search.trim() !== "")
          onSearch(search.trim());
          setSearch("")
      }}
    >
      <div
        className="flex items-center gap-2 p-2 rounded-lg input-control"
        onClick={() => {
          inputDiv.current.focus();
          onFocuss();
        }}
      >
        <IoMdSearch className="search-icon text-xl" />
        <input
          type="text"
          placeholder="Search for a city"
          value={search}
          className="bg-transparent opacity-100 w-full"
          onChange={(e) => handleOnChange(e.target.value)}
          onBlur={() => onBlurr()}
          ref={inputDiv}
        />
      </div>
    </form>
  );
}
