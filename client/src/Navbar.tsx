import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="bg-orange-400 h-10 w-full px-10  py-7 flex justify-between items-center text-white font-bold">
      <div className="text-2xl cursor-pointer">TooDoo</div>
      <div className="bg-black rounded-xl p-3 cursor-pointer">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
