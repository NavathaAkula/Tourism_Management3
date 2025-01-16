import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-400 p-4 flex justify-between items-center">
      <h1
        className="h-min text-4xl font-bold relative"
        style={{
          color: "transparent",
          WebkitTextStroke: "0.7px",
          WebkitTextStrokeColor: "#fff",
        }}
      >
        Come
        <span
          className="shadow-xl rounded-lg text-slate-700 text-2xl absolute left-1 top-[-10px] text-center"
          style={{
            WebkitTextStroke: "0",
          }}
        >
          Dream Tours
        </span>
      </h1>
      <ul className="flex flex-wrap items-center justify-end gap-4 text-white font-semibold list-none">
        <li className="hover:underline hover:scale-105 transition-all duration-150">
          <Link to="/home">Home</Link>
        </li>
        <li className="hover:underline hover:scale-105 transition-all duration-150">
          <Link to="/profile1">Profile</Link>
        </li>
        <li className="hover:underline hover:scale-105 transition-all duration-150">
          <Link to="/search">Search</Link>
        </li>
        <li className="hover:underline hover:scale-105 transition-all duration-150">
          <Link to="/">Login</Link>

        </li>
        <li className="hover:underline hover:scale-105 transition-all duration-150">
          <Link to="/chatbot">chat</Link>
          
        </li>
      </ul>
    </div>
  );
};

export default Header;
