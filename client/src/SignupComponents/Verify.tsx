import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios"; // Importing AxiosError
import { API_URL } from "../config";
import { Link } from "react-router-dom";
export default function Verify() {
  const { token } = useParams();
  const [verified, setVerified] = useState<any>(undefined);
  const [error, setError] = useState<any>({ message: null }); // Set initial value for error state

  useEffect(() => {
    async function verify() {
      try {
        if (!token) {
          throw new Error("Token not provided");
        }
        const res = await axios.post(`${API_URL}/users/verify/${token}`);
        console.log("Response:", res.data);
        setVerified(res.data);
      } catch (e: any) {
        if (e instanceof AxiosError) {
          if (e.response?.data.message) {
            setError({ message: e.response.data.message });
          } else {
            setError({ message: e.message });
          }
        } else {
          setError({ message: e.message }); 
        }
      }
    }

    verify();
  }, [token]);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="text-white text-4xl font-bold py-6 cursor-pointer">
        Authenticate Your Too-Doos
      </div>
      <p className="text-white  lg:w-1/2 sm:w-full cursor-pointer">
        "Our verification form enhances the security of your to-do list. Enter
        the token from your email to ensure the integrity and accuracy of your
        tasks. This verification process adds peace of mind, protecting your
        list from unauthorized access or changes."
      </p>
      <form className="h-fit bg-orange-400 relative rounded-xl mt-14 px-6 py-8  lg:w-1/3 sm:w-full flex flex-col justify-center items-center md:w-1/2">
        <h1 className="text-white absolute bg-orange-400 rounded-full text-3xl font-bold top-[-25px] py-3 px-5">
          Verified
        </h1>
        <div className="text-white text-xl font-bold">
          <p className="cursor-pointer w-full px-4 py-4 my-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-sm">
            Token: {token}
          </p>

          {error.message ? (
            <>
              <p className="px-4 py-4 my-2 cursor-pointer">Error: {error.message}</p>
              <div className="w-full h-fit flex justify-center items-center">
                <button className="ok bg-black rounded-lg px-5 py-2">
                  <Link to="/signup">OK</Link>
                </button>
              </div>
            </>
          ) : verified === undefined ? (
            <>
              <p className="px-4 py-4 my-2 cursor-pointer">Loading...</p>
              <div className="w-full h-fit flex justify-center items-center">
                <button className="ok bg-black rounded-lg px-5 py-2">
                  <Link to="/signup">OK</Link>
                </button>
              </div>
            </>
          ) : verified ? (
            <>
              <p className="px-4 py-4 my-2 cursor-pointer">Verification Successful</p>
              <div className="w-full h-fit flex justify-center items-center">
                <button className="ok bg-black rounded-lg px-5 py-2">
                  <Link to="/login">OK</Link>
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="px-4 py-4 cursor-pointer">Verification Failed</p>
              <div className="w-full h-fit flex justify-center items-center">
                <button className="ok bg-black rounded-lg px-5 py-2">
                  <Link to="/signup">OK</Link>
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
