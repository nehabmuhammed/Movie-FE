import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginuser, registerUser } from "../Services/allApi";
import { toast } from "react-toastify";


const Auth = ({ insideRegiter }) => {

  const navigate = useNavigate()

  const[userData,setUserData] = useState({
    userName:"",
    email:"",
    password:""
  })
  const[enter,setEnter] = useState(false)

  const regiterUser = async() =>{
    try{
      if(userData.userName && userData.email  && userData.password){
        setEnter(false)
        let apiRes = await registerUser(userData)
        if(apiRes.status == 201){
          console.log("Regiter Succesfully")
          navigate('/login')
          toast.success("Sucessfully Created")
        }else if(apiRes.status == 409){
          console.log("Already Registerd")
          toast.success("Already Registerd")
          toast.success("Please Login")
          navigate('/login')
        }
        else{
          console.log("Registeration Failed")
        }
      }else{
        setEnter(true)
      }
    }catch(err){
      console.log(err)
    }
  }

  const clickLogin = async() =>{
    try{
      let reqBody = {
      email:userData.email,
      password:userData.password
    }

    if(userData.email && userData.password){
    let apiRes = await loginuser(reqBody)
    if(apiRes.status == 200){
      toast.success("Login Successfull")
      localStorage.setItem('token',apiRes.data.token)
      navigate('/')
    }else{
      toast.error("User Not Found")
      navigate('/register')
      toast.info("Please Register to Login")
    }
    }else{
      toast.error("Enter the Fields")
      setEnter(true)
    }
   
    }catch(err){
      console.log(err)
      setEnter(true)
    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-center mb-4">🎬 Movie Finder</h1>
        <p className="text-gray-300 text-center mb-8">
          Search and discover amazing movies from our collection
        </p>
      </header>

      <div className="flex flex-col  gap-4 items-center">
        <h1 className="text-3xl text-center">
          {insideRegiter ? "Register" : "Login"}
        </h1>
        {enter && <h1 className="text-3xl text-center">Please Fill the Forms</h1>}
         {insideRegiter && (
        <input
          type="text"
          className="bg-white p-2 rounded w-100 text-black text-center"
          placeholder="User Name"
          onChange={(e) =>{ setUserData({...userData,userName:e.target.value})
                            setEnter(false)}}
        />
          )}
        <input
          type="text"
          className="bg-white p-2 rounded w-100 text-black text-center"
          placeholder="Email"
          onChange={(e) => {setUserData({...userData,email:e.target.value})
                             setEnter(false)}}
        />
       
          <input
            type="text"
            className="bg-white p-2 rounded w-100 text-black text-center"
            placeholder="Password"
          onChange={(e) =>{ setUserData({...userData,password:e.target.value})
                             setEnter(false)}}
          />
      
        {insideRegiter ? (
          <button className="p-2 bg-orange-500 text-white rounded-2xl hover:bg-white hover:text-orange-300"
          onClick={regiterUser}>
            Register
          </button>
        ) : (
          <button className="p-2 bg-orange-500 text-white rounded-2xl hover:bg-white hover:text-orange-300"
          onClick={clickLogin}>
            Login
          </button>
        )}
        {insideRegiter ? (
          <p>
            Aready have Account Please Login{" "}
            <Link to={"/Login"} className="underline text-blue-700">
              {" "}
              Login
            </Link>
          </p>
        ) : (
          <p>
            Please Register if you not Login{" "}
            <Link to={"/register"} className="underline text-blue-700">
              {" "}
              Regiter
            </Link>
          </p>
        )}
      </div>

      <footer className="max-w-7xl mx-auto text-center text-gray-400 mt-12 pt-8 border-t border-gray-700">
        <p>Movie Finder • Search thousands of movies • Updated daily</p>
      </footer>
    </div>
  );
};

export default Auth;
