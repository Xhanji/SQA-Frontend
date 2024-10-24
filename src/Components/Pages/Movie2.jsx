import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data));
    window.scroll(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-thin mb-2">{movie.original_title}</h1>
        <div className="flex items-center  text-sm text-gray-400 mb-4">
          <span >   {movie.release_date}   </span>
          <span className="ml-2">•</span>
          <span className="ml-2">PG-13</span>
          <span className="ml-2">•</span>
          <span className="ml-2">{movie.runtime} Mins</span>
          
            <div className="flex items-center ml-auto mx-2 justify-end rounded bg-slate-300 p-2 bg-opacity-5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-2">Rate</span>
            </div>
            <div className="flex items-center ml-4 mx-4 bg-slate-300 p-2 bg-opacity-5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 font-bold">{Math.round(movie.vote_average * 10) / 10} </span>
              <span className="ml-1 text-gray-400">(200K)</span>
            </div>
            <div className="bg-slate-300 p-2 bg-opacity-5 flex rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-400 ml-2">1</span>
            </div>
          </div>
        
        <div className="flex gap-6">
          <div className="w-1/2">
            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="Dune: Part Two Poster" className="w-full rounded-lg shadow-lg" />
          </div>
          <div className="w-1/2">
            <div className="aspect-video bg-gray-800 rounded-lg relative mb-4">
              <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Dune: Part Two Trailer" className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-4 left-4 flex items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Trailer • 00:31
              </div>
            </div>
          </div>
          
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex space-x-3 items-center">
            <h2 className="font-semibold mb-2">Genre</h2>
            <div className="flex space-x-2">
            {movie && movie.genres
          ? movie.genres.map((i, j) => (
              <span
                className=" py-1 rounded-full md:px-3 md:font-thin bg-slate-300 p-2 bg-opacity-5"
                key={j}
              >
                {i.name}
              </span>
            ))
          : " "}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Plot</h2>
            <p className="text-sm text-gray-400">{movie.overview}</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Director</h2>
            <p className="text-sm text-gray-400">Denis Villeneuve</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Writers</h2>
            <p className="text-sm text-gray-400">Denis Villeneuve • Jon Spaihts • Frank Herbert</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Stars</h2>
            <p className="text-sm text-gray-400">Timothée Chalamet • Zendaya • Rebecca Ferguson</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Awards</h2>
            <p className="text-sm text-gray-400">Top rated movie #10 • 2 nominations</p>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Reviews</h2>
            <p className="text-sm text-gray-400">
              1K User Reviews • 500 Critic Reviews •
              <span className="bg-green-800 text-white px-1 rounded ml-1">79</span> Metascore
            </p>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="bg-yellow-500 bg-opacity-90 text-black font-bold py-2 px-4 rounded inline-flex items-center">
            <span className="font-medium">52K • Add to Watchlist</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Movie;
