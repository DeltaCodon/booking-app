import React from "react";
import searchIcon from "/house-search-svgrepo-com.svg";
import houseIcon from "/house.svg";

export const Header = () => {
  return (
    <header className="pt-7 pl-8 p-4 flex justify-between">
      <a href="" className="flex items-center gap-1">
        <img src={houseIcon} width="50" />

        <span className="text-[1.6rem] font-bold">Empyrean</span>
      </a>
      <div className="flex">
        <div className="self-center">Anywhere</div>
        <div className="self-center">Any Week</div>
        <div className="self-center">Any Guests</div>
        <button>
          <img src={searchIcon} alt="Search Icon" width="35" />
        </button>
      </div>
    </header>
  );
};

export default Header;
