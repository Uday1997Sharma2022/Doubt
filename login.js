import React, { useState } from 'react'
import loginsignupImage from "../imges/loginsignup.gif"
import {Link} from "react-router-dom"
import {toast} from "react-hot-toast"
import { useNavigate } from "react-router-dom";
//import {useSelector} from "react-redux"
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";


const Login = () => {
  const [data,setData] = useState({
    email : "",
    password : "",
  })


  const navigate = useNavigate()
 const userData = useSelector(state => state)


 const dispatch = useDispatch()


  const handleonChange = (e)=>{
    const {name,value} = e.target
    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
     })
  }

  const handleSubmit = async(e)=>{
     e.preventDefault()
    const {email,password} = data
    if(email && password){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      console.log(dataRes)

      toast(dataRes.message)


      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }
      console.log(userData)
      }  
      else{
        alert("please Enter required filed")
        }
  }
   
  return (
    <div className="p-3 m:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginsignupImage} className="w-full" />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.email}
            onChange={handleonChange}></input>

          <label htmlFor="password">Password</label>
          <input
            type={"password"}
            id="password"
            name="password"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline focus-within:outline-blue-500"
            value={data.password}
            onChange={handleonChange}></input>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 curser-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ?
          <Link to={"/signup"} className="text-red-500 underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login