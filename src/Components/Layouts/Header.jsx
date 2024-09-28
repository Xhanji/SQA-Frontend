import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import IMDB from "../Assets/IMDB.png";
import { useStateContext } from "../../Providers/ContextProvider";
import myicon from '../Assets/logout-svgrepo-com.svg'
import axios from "axios";
import axiosClient from "../../axiosClient";
const Header = () => {

  const {user, token, setUser} = useStateContext();

  useEffect(()=> {
    axiosClient.get('/user')
    .then(({data}) => {
      setUser(data)
    })
  }, []);
  

  return (
    <div className="flex h-16 items-center justify-between bg-[#121212] px-10 font-semibold text-[#f0f0f0]">
      {/* Logo */}
      <Link to="/">
        <img
          className="w-16 md:w-18"
          src={IMDB}
          alt="IMDb Logo"
        />
      </Link>

      {/* Menú de navegación */}
      <div className="flex space-x-4">
        <Link
          to="/movies/popular"
          className="rounded-full border-2 px-4 py-2 hover:bg-zinc-950"
        >
          Popular
        </Link>
        <Link
          to="/movies/top_rated"
          className="rounded-full border-2 px-4 py-2 hover:bg-zinc-950"
        >
          Top Rated
        </Link>
        <Link
          to="/movies/upcoming"
          className="rounded-full border-2 px-4 py-2 hover:bg-zinc-950"
        >
          Upcoming
        </Link>
      </div>

      {/* Botón de Registro */}
      <div className="actions" >
      {token ? <h1>{user.name}</h1> : <Link
        to="/register"
        className="rounded-full border-2 px-4 py-2 hover:bg-zinc-950"
      >
        Register
      </Link>}

      {token ? <button><img src={myicon} className="logout"></img></button>: <></>}
      </div>
    </div>
  );
};

export default Header;
