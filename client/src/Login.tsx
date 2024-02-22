import React from 'react'
import {Link} from'react-router-dom'
export default function Login() {
  return (
    <>
    <button className='bg-orange-400'><Link to="/">Back</Link></button>
    <div className='text-white'>
      Login
    </div>
    </>
  )
}
