import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ children, className = '' }) => (
  <div className={`bg-gray-800 rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`px-4 py-2 rounded-md text-white bg-[#1A1A1A] hover:bg-purple-700 transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function Component() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(popularMovies.length - 4, 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(popularMovies.length - 4, 1)) % Math.max(popularMovies.length - 4, 1));
  };

  const featuredMovie = popularMovies[0] || {};
  const featuredVideos = popularMovies.slice(1, 4);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-6">
      <main className="flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`}
                alt={featuredMovie.title}
                className="w-full h-auto"
                style={{ aspectRatio: '2/1', objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent flex items-end">
                <div className="p-6 flex items-end space-x-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${featuredMovie.poster_path}`}
                    alt={`${featuredMovie.title} Poster`}
                    className="w-32 h-48 object-cover rounded-md shadow-lg"
                  />
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{featuredMovie.title}</h2>
                    <p className="text-lg mb-4">{featuredMovie.overview}</p>
                    <Button className="flex items-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Play Trailer
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Featured Videos</h3>
              <Button className="text-sm">Browse Trailers</Button>
            </div>
            {featuredVideos.map((movie) => (
              <Link to={`movie/${movie.id}`} key={movie.id} className='flex'>
              <Card key={movie.id} className="p-4 flex items-center space-x-4 flex-grow">
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{movie.title}</h4>
                  <p className="text-sm text-gray-400">Watch the new "{movie.title}" Trailer</p>
                </div>
                <div className="text-sm text-gray-400">{movie.vote_average.toFixed(1)}</div>
              </Card>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Featured Today</h3>
            <div className="flex space-x-2">
              <Button onClick={prevSlide} className='bg-[#1A1A1A]'>&lt;</Button>
              <Button onClick={nextSlide} className='bg-[#1A1A1A]'  >&gt;</Button>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 20}%)`,
              }}
            >
              {popularMovies.map((movie) => (
                <Link to={`movie/${movie.id}`} key={movie.id} className='flex-shrink-0 w-1/5 px-2'>
                <div key={movie.id} className=" flex-shrink-0 px-2">
                  <div className="aspect-[2/3] relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-center mt-2 truncate">{movie.title}</p>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}