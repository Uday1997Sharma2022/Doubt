import React, { useState } from 'react';
import loginsignupImage from "../imges/loginsignup.gif";
import {Link, useNavigate} from "react-router-dom";
import { ImagetoBase64 } from '../utility/ImagetoBase64';


function Signup  () {
  const navigate = useNavigate();
  const [data,setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformpassword: "",
    image : ""
  });
  console.log(data)
  const handleonChange = (e)=>{
    const {name,value} = e.target;
    setData((preve)=>{
      return{
        ...preve,
        [name] : value,
      };
    });
  };

  const handleUploadProfileImage = async(e)=>{
    const data = await ImagetoBase64(e.target.files[0])
    console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
  })

  }



  console.log(process.env.REACT_APP_SERVER_DOMIN)
  const handleSubmit = async(e)=> {
     e.preventDefault();
    const {firstName,email,password,conformpassword} = data;
    if(firstName && email && password && conformpassword){
      if(password === conformpassword){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
          method : "POST",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
        
        const dataRes = await fetchData.json()
        console.log(dataRes);
        alert("successfull");
        //navigate("/signup")
        if(dataRes.alert){
          navigate("/login");
        }
      }
      else{
        alert("password and confirm password not equal")
      }
    }
        else{
        alert("please Enter required filed")
        }
  }
  return (
    <div className="p-3 m:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={data.image ? data.image : loginsignupImage} className="w-full h-full" />
         
         
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
          </label> 
      
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.firstName}
            onChange={handleonChange}></input>


          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.lastName}
            onChange={handleonChange}></input>

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

          <label htmlFor="conformpassword">Conform Password</label>
          <input
            type={"password"}
            id="conformpassword"
            name="conformpassword"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded  focus-within:outline focus-within:outline-blue-500"
            value={data.conformpassword}
            onChange={handleonChange}></input>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 curser-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have account ?
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup