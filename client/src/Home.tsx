import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div className="text-white flex justify-center items-center flex-col mt-20">
        <h1 className="text-4xl font-bold my-5 cursor-pointer">Add ToDos</h1>
        <h4 className="text-2xl font-bold">"Organize Your Life, One Task at a Time"</h4>
        <p className=" text-center w-1/2 mt-2">Stay on top of your tasks and goals effortlessly with our intuitive task
        management platform. From daily to-do lists to long-term projects, we've
        got you covered. Say hello to a more organized, productive you!</p>
        <div className="bg-orange-400 py-3 px-6 rounded-full text-bold my-5 cursor-pointer font-bold">
          <Link to="/signup">Get Started</Link>
        </div>
      </div>
    </>
  );
}
