import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div className="text-white flex justify-center items-center flex-col mt-20">
        <h1 className="text-4xl font-bold my-5 cursor-pointer">Add ToDos</h1>
        <div className="bg-orange-400 py-3 px-6 rounded-full text-bold my-5 cursor-pointer font-bold">
          {" "}
          <Link to="/SignUp">Get Started</Link>
        </div>
      </div>
    </>
  );
}
