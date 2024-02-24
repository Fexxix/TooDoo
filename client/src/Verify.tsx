import React from 'react'
import { useParams } from 'react-router-dom'
import {useState , useEffect} from "react"
import axios from 'axios'
import { API_URL } from './config'
export default function Verify() {
  const {token} = useParams()
  const [verified , setVerified] = useState(undefined)

  useEffect(()=>{
    async function verify() {
      try {
        const res = await axios.get(`${API_URL}/users/verify/${token}`);
        console.log('Response:', res.data); 
        setVerified(res.data); 
      } catch (error) {
        console.error('Error:', error);
        // setVerified(error);
      }
    } 
  })
  return (
    <div className='text-white'>
      para meter ${token}
    </div>
  )
}
