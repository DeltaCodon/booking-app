import React from "react";
import searchIcon from "/house-search-svgrepo-com.svg";

const SearchFilter = () => {
  return (
    <div className="flex flex-wrap gap-1 border border-stone-300 rounded-full py-1 px-3 shadow-md shadow-stone-250">
      <div className="self-center pr-2 border-r border-stone-300">Anywhere</div>
      <div className="self-center pr-2 border-r border-stone-300">Any Week</div>
      <div className="self-center pr-2 border-r border-stone-300">
        Any Guests
      </div>
      <button className="bg-primary rounded-full">
        <img
          src={searchIcon}
          alt="Search Icon"
          width="30"
          className="bg-searchBlue rounded-2xl rounded-ss-xl"
        />
      </button>
    </div>
  );
};

export default SearchFilter;
