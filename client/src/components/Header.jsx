import React, { useContext } from "react";
import houseIcon from "/house.svg";
import SearchFilter from "./SearchFilter";
import UserBar from "./UserBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="pt-1 flex justify-between flex-wrap">
      <Link to={"/"} href="/" className="flex items-center gap-1  rounded-lg">
        <img src={houseIcon} width="50" className="" />

        <span className="text-[1.6rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-themeGold from-45% via-slate-300 via-50% to-themeBlue to-70%">
          Empyrean
        </span>
      </Link>
      <SearchFilter />
      <UserBar />
    </header>
  );
};

export default Header;
