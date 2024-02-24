import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './config';

export default function Verify() {
  const { token } = useParams();
  const [verified, setVerified] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verify() {
      try {
        if (!token) {
          throw new Error('Token not provided');
        }
        const res = await axios.get(`${API_URL}/users/verify/${token}`);
        console.log('Response:', res.data);
        setVerified(res.data);
      } catch (error :any) {
        console.error('Error:', error);
        setError(error.message || 'An error occurred');
      }
    }

    verify();
  }, [token]);

  return (
    <div className='text-white'>
      <p>Parameter: {token}</p>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Verification Result: {verified}</p>
      )}
    </div>
  );
}
