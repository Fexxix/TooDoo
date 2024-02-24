import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios'; // Importing AxiosError
import { API_URL } from './config';

export default function Verify() {
  const { token } = useParams();
  const [verified, setVerified] = useState<any>(undefined);
  const [error, setError] = useState<any>({message:null});

  useEffect(() => {
    async function verify() {
      try {
        if (!token) {
          throw new Error('Token not provided');
        }
        const res = await axios.post(`${API_URL}/users/verify/${token}`);
        console.log('Response:');
        setVerified(res.data);
      } catch (e: any) {

        if (e instanceof AxiosError) {

          if (e.response?.data.message) {
            setError({ message: e.response.data.message });
          } else {
            e.cause?.message && setError({ message: e.cause.message });
          }
          
        }
      }
    }

    verify();
  }, [token]);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <h1 className="text-white absolute bg-orange-400 rounded-full text-3xl font-bold top-8 py-3 px-5">
        Verified
      </h1>
      <form className='w-fit h-fit bg-orange-400 rounded-xl mt-14 px-6 py-12'>
        <div className='text-white text-xl font-bold'>
          <p>Token: {token}</p>
          {error ? (
            <p>Error: {error}</p>
          ) : verified === undefined ? (
            <p>Loading...</p>
          ) : verified ? (
            <p>Verification Successful</p>
          ) : (
            <p>Verification Failed</p>
          )}
        </div>
      </form>
    </div>
  );
}
