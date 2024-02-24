import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [hide, setHide] = useState<{ type: string; url: string }>({
    type: "password",
    url: "eye-slash-regular.svg",
  });

  const togglePasswordVisibility = () => {
    const newType = hide.type === "password" ? "text" : "password";
    const newUrl =
      hide.url === "eye-regular.svg"
        ? "eye-slash-regular.svg"
        : "eye-regular.svg";
    setHide({ type: newType, url: newUrl });
  };

  return (
    <>
      <button className="w-fit h-hit m-5 transform hover:scale-125 transition-transform duration-200">
        <Link to="/">
          <img className="w-10 h-10" src="circle-arrow-left-solid.svg" alt="" />
          jh
        </Link>
      </button>
      <div className="flex justify-center flex-col items-center  h-full w-full   relative">
        <h1 className="text-white cursor-pointer absolute bg-orange-400 rounded-full text-3xl font-bold top-8 py-3 px-5">
          Login
        </h1>
        <form
          action=""
          className="bg-orange-400 w-fit h-fit p-10 rounded-xl text-white mt-14"
        >
          <div className="w-full h-20 flex flex-col mt-2">
            <label className="text-lg font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="outline-none  bg-black text-white border-none px-5 ml-8 py-2"
              style={{ borderRadius: "5px 20px" }}
              type="email"
              placeholder="Example@gmail.com"
              id="email"
            />
          </div>

          <div className="w-full h-20 flex flex-col mt-2">
            <label className="text-lg font-bold" htmlFor="password">
              Password:
            </label>

            <div
              className=" bg-black text-white border-none px-5 ml-8 py-2  flex justify-center items-center"
              style={{ borderRadius: "5px 20px" }}
            >
              <input
                className="outline-none bg-black"
                type={hide.type}
                placeholder="Password"
                id="password"
              />
              <div
                className="w-5 h-5"
                onClick={() => {
                  togglePasswordVisibility();
                }}
              >
                <img className="w-full h-full" src={hide.url} alt="" />
              </div>
            </div>
          </div>

          <div className=" w-full flex justify-center items-center m-2 ">
            <button
              className="overflow border-2 border-black bg-black px-4 py-2 text-white font-bold rounded-lg"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="text-white cursor-pointer">
            If you don't have an account?{" "}
            <Link to="/signup" className="text-blue-700 font-bold">
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
