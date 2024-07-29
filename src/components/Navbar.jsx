import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { logout } from "../firebase";
import {useMovie} from '../context/Movies';
import axios from 'axios';
import { toast } from "react-toastify";

const Navbar = () => {
  const { currentUser } = useAuth();
  const {setMovies} = useMovie()
  const navigate = useNavigate();
  const [search, setSearch] = useState('')

  const baseUrl = "https://api.themoviedb.org/3";
  const searchUrl = `${baseUrl}/search/movie?api_key=${import.meta.env.VITE_MOVIE_API_KEY}&query=`;


  const searchHandler = async(e)=>{
    e.preventDefault();
    if(search.trim()===''){
      toast.error('Please enter a movie name.');
      return ;
    }
    const res = await axios.get(`${searchUrl}${search}`);
    if(res.data.results.length>0) {
      setMovies(res.data.results);
      navigate('/');
    }else{
      toast.error('There are no movies with that name.')
    }
  }

  const logoutHandler = ()=>{
    logout();
    navigate('/login')
  }

  return (
    <nav
      className="navbar navbar-expand-md fixed-top navbar-dark"
      style={{ backgroundColor: "#070707" }}
    >
      <div className="container-fluid">
        <Link to="https://movies.shawaz.org" className="navbar-brand">
          <h4 className="text-white"> Shawaz's TMDB Movie App </h4>
        </Link>

        <div className="d-flex align-items-center">
          {currentUser ? (
            <>
              <form className="d-flex">
                <input
                  type="search"
                  className="form-control me-2"
                  placeholder="Enter a title"
                  value={search}
                  onChange={(e)=> setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" onClick={(e)=>searchHandler(e)}> Search </button>
              </form>
              <h4 className="text-capitalize d-inline-block text-warning mx-2">
                  {currentUser?.displayName}
              </h4>
              <button type="button" className="ms-2 btn btn-outline-light" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="ms-2 btn btn-outline-light"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button type="button" className="ms-2 btn btn-outline-light"
                onClick={() => navigate("/register")}>
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
