import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import IMDB from "../Assets/IMDB.png";
import { useStateContext } from "../../Providers/ContextProvider";
import axios from "axios";
import axiosClient from "../../axiosClient";
import './header.css'
import dropdown from '../Assets/icons8-dropdown-50.png'
import bookmark from '../Assets/bookmark.png'

export default function Header() {
  const { user, token,userType, setUser, setToken,setUserType } = useStateContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.get('logout')
      .then(() => {
        setUser(null)
        setToken(null)
        setUserType(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
      <div className="flex space-x-2 header-cont pl-7 pr-7">
        <Link to="/movies/popular" className="px-1 py-2 hover:bg-zinc-950 font-thin">
          Popular
        </Link>
        <Link to="/movies/top_rated" className="px-4 py-2 hover:bg-zinc-950 font-thin">
          Top Rated
        </Link>
        <Link to="/movies/upcoming" className="px-4 py-2 hover:bg-zinc-950 font-thin">
          Upcoming
        </Link>
        <Link to="/movies/upcoming" className="px-4 py-2 hover:bg-zinc-950 font-thin">
          Watch
        </Link>
        <Link to="/movies/upcoming" className="px-4 py-2 hover:bg-zinc-950 font-thin">
          Awards
        </Link>
        <Link to="/movies/upcoming" className="px-4 py-2 hover:bg-zinc-950 font-thin">
          Community
        </Link>
      </div>

      <div className="search-cont flex flex-grow">
        <div className="flex items-center py-3 justify-between">
          <span className="flex rounded-tl-[4px] rounded-bl-[4px] rounded-tr-none rounded-br-none bg-[#1A1A1A] space-x-2 items-center h-10 pl-3 pr-1">
            <label className="font-thin">Todo</label>
            <img src={dropdown} alt="expand-arrow--v1" className="dropdown" />
          </span>
        </div>
        <div className="py-3 w-[95%]">
          <div className="search-input bg-[#1A1A1A] h-10 items-center flex w-[95%] px-2">
            <input type="text" placeholder="Buscar en IMDB" className='px-2 bg-[#1A1A1A] w-[95%] font-extralight' />    
          </div>
        </div>
      </div>

      {token && (
        <div className="watchlist inline-flex">
          <a href="" className="space-x-1 items-center inline-flex flex-grow pr-6">
            <img src={bookmark} alt="" className="bookmark" /> 
            <span className="font-extralight">En Seguimiento</span>
          </a>
        </div>
      )}

      {/* Botón de Registro o Información de Usuario */}
      <div className="actions flex items-center space-x-1" ref={dropdownRef}>
        {token ? (
          <div className="user-actions flex flex-grow relative">
            <span className="flex flex-grow space-x-2 cursor-pointer items-center" onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" className="ipc-icon ipc-icon--account-circle ipc-btn__icon ipc-btn__icon--pre" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path></svg>
              {userType === 'admin' ? `Hola administrador ${user.name}` : `Hola ${user.name}`}
              <img src={dropdown} className="dropdown" alt="dropdown" />
            </span>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-10 w-48 rounded-md shadow-lg bg-[#080808] ring-1 ring-black ring-opacity-5 duration-150">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <a href="#" className="block px-4 py-2 text-sm text-[#f0f0f0] hover:bg-gray-700 duration-500" role="menuitem" onClick={onLogout}>
                    Cerrar sesión
                  </a>
                  <Link to={'/admin/create'} className="block px-4 py-2 text-sm text-[#f0f0f0] hover:bg-gray-700 duration-500" role="menuitem">
                    
                      Añadir Obra
            
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="">
            <Link to="/register" className="px-4 py-2 hover:bg-zinc-950 fon">
              Registrarse
            </Link>
            <Link to="/Login" className="px-4 py-2 hover:bg-zinc-950 fon">
              Iniciar Sesion
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}