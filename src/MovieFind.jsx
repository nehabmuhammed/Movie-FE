import React, { useState } from "react";
import { getResponse } from "../Services/allApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const MovieSearch = () => {
  const navigate = useNavigate()

    const[message,setMessage] = useState({
        message:""
    })
    const[movies,setMovies] = useState([])
    const[loggedIn,setLoggedIn] = useState(false)

    const searchMovie = async() => {
      try{
      if(message.message){
          let token = localStorage.getItem('token')
        if(token){
            let header = {     
        Authorization:`Bearer ${token}`
      }
      let apiRes = await getResponse(message,header)
        let movie = apiRes.data.message
        let arrMovie = movie.split('|')
        setMovies(arrMovie)
        setLoggedIn(true)
        }else{
          window.confirm("Navigate to Login Page",navigate('/login'))
          toast.error("Login to Find Movies")
          setLoggedIn(false)
        }
      }else{
        toast.error("Please Enter the Fields")
      }
    
        
        
    }catch(err){
      console.log(err)
    }
      }
    const LoginPage = () =>{
      navigate('/login')
    }
    const logOut = () => {
      localStorage.removeItem('token')
      setLoggedIn(false)
    }
    const clearMovies = () => {
      setMovies([])
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
 
      <header className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-center mb-4">
          🎬 Movie Finder
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Search and discover amazing movies from our collection
        </p>
      </header>
      <div className="flex justify-center flex-col items-center mb-5">
        {
          loggedIn ? <button className="p-2 rounded mt-2 hover:bg-black hover:text-white bg-white text-black" onClick={logOut}>LogOut</button>:<> <h1>Login to Search Movies</h1>
       <button onClick={LoginPage} className="p-2 rounded mt-2 hover:bg-black hover:text-white bg-white text-black">Login</button></>
        }
      </div>


      <main className="max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl mb-12">
         
          <div className="mb-8">
            <label htmlFor="movieSearch" className="block text-lg font-semibold mb-3">
              Search Movies
            </label>
            <input
              id="movieSearch"
              type="text"
              placeholder="Type movie title, director, or genre..."
              className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              onChange={(e) => setMessage({message:e.target.value})}
            />
            {
              movies.length>0?<button onClick={clearMovies} className="p-2 rounded mt-2 hover:bg-black hover:text-white bg-white text-black">Clear Movies</button>:<button onClick={searchMovie} className="p-2 rounded mt-2 hover:bg-black hover:text-white bg-white text-black">Search Movies</button>
            }
          </div>


          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              10 Movies Found
            </h2>
          </div>
          {
            movies.length>0 && movies.map((each) => (
                <li className="text">{each}</li>
            ))
          }


   
        </div>
      </main>

      <footer className="max-w-7xl mx-auto text-center text-gray-400 mt-12 pt-8 border-t border-gray-700">
        <p>Movie Finder • Search thousands of movies • Updated daily</p>
      </footer>
    </div>
  );
};

export default MovieSearch;