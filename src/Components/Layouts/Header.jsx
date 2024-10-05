import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import IMDB from "../Assets/IMDB.png";
import { useStateContext } from "../../Providers/ContextProvider";
import myicon from '../Assets/logout-svgrepo-com.svg'
import profilepic from '../Assets/undraw_pic_profile_re_7g2h.svg'
import axios from "axios";
import axiosClient from "../../axiosClient";
import './header.css'
import dropdown from '../Assets/icons8-dropdown-50.png'
const Header = () => {

  const {user, token, setUser, setToken} = useStateContext();

const onLogout = (ev) =>{
  ev.preventDefault();
  axiosClient.get('logout')
  .then(({}) => {
    setUser(null)
    setToken(null)
  })
}

  useEffect(()=> {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }, []);
  

  return (
    <div className="flex h-16 items-center justify-between bg-[#080808] px-20 font-semibold text-[#f0f0f0] mx-0 my-auto">
      {/* Logo */}
      <Link to="/">
        <img
          className="w-16 md:w-18"
          src={IMDB}
          alt="IMDb Logo"
        />
      </Link>

      {/* Menú de navegación */}
      <div className="flex space-x-2 header-cont  pl-7 pr-7">
        <Link
          to="/movies/popular"
          className=" px-1 py-2 hover:bg-zinc-950 font-thin"
        >
          Popular
        </Link>
        <Link
          to="/movies/top_rated"
          className=" px-4 py-2 hover:bg-zinc-950 font-thin"
        >
          Top Rated
        </Link>
        <Link
          to="/movies/upcoming"
          className="px-4 py-2 hover:bg-zinc-950 font-thin"
        >
          Upcoming
        </Link>
        <Link
          to="/movies/upcoming"
          className="px-4 py-2 hover:bg-zinc-950 font-thin"
        >
          Watch
        </Link>
        <Link
          to="/movies/upcoming"
          className="px-4 py-2 hover:bg-zinc-950 font-thin"
        >
          Awards
        </Link>
        <Link
          to="/movies/upcoming"
          className="px-4 py-2 hover:bg-zinc-950 font-thin"
        >
          Community
        </Link>
      </div>

      <div className="search-cont flex flex-grow">
        <div className="flex items-center py-3 justify-between">
          <span htmlFor="flex" className="flex rounded-tl-[4px] rounded-bl-[4px] rounded-tr-none rounded-br-none bg-[#1A1A1A] space-x-2 items-center h-10 pl-3 pr-1">
            <label htmlFor="" className="font-thin">
              Todo
            </label>
            <img src={dropdown} alt="expand-arrow--v1" className="dropdown" />
          </span>
        </div>
        <div className="py-3 w-[95%] ">
          <div className="search-input bg-[#1A1A1A] h-10 items-center flex w-[95%] px-2">
            <input type="text" placeholder="Buscar en IMDB" className='px-2 bg-[#1A1A1A] w-[95%] font-extralight' />    
          </div>
        </div>
      </div>

      {/* Botón de Registro */}
      <div className="actions" >
      {token ? <h1>{user.name}</h1> : <Link
        to="/register"
        className="rounded-full border-2 px-4 py-2 hover:bg-zinc-950"
      >
        Register
      </Link>}

      {token ? <img src={profilepic} className="profile-pic flex mx-5"></img> : null}

      {token ? <button onClick={onLogout}><img src={myicon} className="logout"></img></button>: <></>}
      </div>
    </div>
  );
};

export default Header;
