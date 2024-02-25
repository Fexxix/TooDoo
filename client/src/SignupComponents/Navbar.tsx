import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-orange-400 h-fit w-full px-10 py-2  flex justify-between items-center text-white ">
      <div className="cursor-pointer flex items-center justify-center">
        <img src="list-solid.svg" alt="" className="w-6 h-6 mr-2" />
        <span className="text-3xl font-bold">TooDoo</span>
      </div>

      <div className="overflow border-2 border-black bg-black rounded-xl p-3 cursor-pointer transform hover:scale-110 transition-transform duration-300">
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
