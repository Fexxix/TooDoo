import axios from "axios"
import { API_URL } from "./config"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {Link} from "react-router-dom"
 type UserData = {
  username: string
  email: string
  password: string
}

export default function SignUp() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>()

  const [apiError, setApiError] = useState<{ message: string }>({ message: "" })
  
  async function onSubmit(data: UserData) {
    console.log(data , API_URL)
    try {
      await axios.post(`${API_URL}/users/signup`, data)
    } catch (e) {
      console.log("err")
      setApiError(e as typeof apiError)
    }
   
  }
  return (
    <div className="flex justify-center items-center  h-full w-full  mt-20 ">
      <form className="bg-orange-400 w-fit h-fit p-10 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
       
      <div className="w-full h-20 flex flex-col">
  <label htmlFor="username" className="text-lg font-bold">UserName:</label>
  <input className="outline-none  bg-black text-white border-none px-5 ml-8 p-1"
  style={{ borderRadius: '5px 20px' }}
    type="text"
    placeholder="UserName"
    id="username"
    {...register("username", {
      minLength: {
        value: 5,
        message: "Username must be at least 5 characters"
      },
      required: "Username is required",
    })}
  />
  {errors.username && <div className="text-sm text-white">{errors.username.message}</div>}
</div>


        <div className="w-full h-20 flex flex-col">
  <label className="text-lg font-bold" htmlFor="email">Email:</label>
  <input className="outline-none  bg-black text-white border-none px-5 ml-8 p-1"
  style={{ borderRadius: '5px 20px' }}
    type="email"
    placeholder="Example@gmail.com"
    id="email"
    {...register("email", {
      required: "Email is required",
      pattern: {
        value: /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,}$/,
        message: "Invalid email format"
      }
    })}
  />
  {errors.email && <div className="text-sm text-white">{errors.email.message}</div>}
</div>


        <div className="w-full h-20 flex flex-col">
  <label className="text-lg font-bold" htmlFor="password">Password:</label>
  <input className="outline-none  bg-black text-white border-none px-5 ml-8 p-1"
  style={{ borderRadius: '5px 20px' }}
    type="password"
    placeholder="Password"
    id="password"
    {...register("password", {
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters long"
      },
      required: "Password is required"
    })}
  />
  {errors.password && <div className="text-sm text-white">{errors.password.message}</div>}
</div>

<div className="w-full flex justify-center items-center m-2">
        <button className="bg-black px-4 py-2 text-white font-bold rounded-lg" type="submit">submit</button>
</div>
      
      <div className="text-white">
        Already have an account? <Link to="/login" className="text-blue-700 font-bold">Login</Link>
      </div>
      </form>
      {apiError.message && <div>{apiError.message}</div>}
    </div>
  );
}