import React from "react";
import { Link } from "react-router-dom";
import IMDB from "../Assets/IMDB.png";

const Header = () => {
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
      <Link
        to="/register"
        className="rounded-full border-2 px-4 py-2 hover:bg-zinc-950"
      >
        Register
      </Link>
    </div>
  );
};

export default Header;
