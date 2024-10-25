

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router'

export default function MovieEditForm() {
  const { id } = useParams()
  console.log('Editing movie with id:', id);
  const navigator = useNavigate()
  const [movie, setMovie] = useState({
    titulo: '',
    duracion: '',
    fecha_estreno: '',
    sinopsis: '',
    director: '',
    genero: '',
    imagen_url: ''
  })
  const [loading, setLoading] = useState(true)
  

  useEffect(() => {
    console.log("ID value in useEffect:", id);
    if (id) {
      console.log(`Fetching movie with ID: ${id}`);
      fetchMovie();
    }
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await fetch(`http://localhost:8001/api/movies/movie/${id}`)
      console.log("Response from fetchMovie:", response)
      if (!response.ok) {
        throw new Error('Failed to fetch movie')
      }
      const data = await response.json()
      console.log("Movie data:", data)
      const transformedData = {
        ...data.data,
        duracion: String(data.data.duracion)
      };
      
      setMovie(transformedData);
      setLoading(false)
    } catch (err) {
      console.error("Error in fetchMovie:", err)
      
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    console.log(`Updating movie field: ${name} with value: ${value}`)
    setMovie({ ...movie, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting updated movie:", movie);
    
    try {
        const response = await fetch(`http://localhost:8001/api/movies/movie/update/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        });

        console.log("Response status:", response.status);
        console.log("Response status text:", response.statusText);
        
        const responseData = await response.json();
        console.log("Response from update:", responseData);
        
        if (!response.ok) {
            throw new Error(`Failed to update movie: ${responseData.message || response.statusText}`);
        }
        
        navigator('/admin/table');
    } catch (err) {
        console.error("Error in handleSubmit:", err);
        setError('Error updating movie');
    }
}


  if (loading) return <div className="text-center p-4 text-yellow-400">Loading...</div>
 

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Edit Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-400 mb-1">Title</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={movie.titulo}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duracion" className="block text-sm font-medium text-gray-400 mb-1">Duration (minutes)</label>
              <input
                type="text"
                id="duracion"
                name="duracion"
                value={movie.duracion}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="fecha_estreno" className="block text-sm font-medium text-gray-400 mb-1">Release Date</label>
              <input
                type="date"
                id="fecha_estreno"
                name="fecha_estreno"
                value={movie.fecha_estreno}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-400 mb-1">Synopsis</label>
            <textarea
              id="sinopsis"
              name="sinopsis"
              value={movie.sinopsis}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 h-24"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="director" className="block text-sm font-medium text-gray-400 mb-1">Director</label>
              <input
                type="text"
                id="director"
                name="director"
                value={movie.director}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-gray-400 mb-1">Genre</label>
              <input
                type="text"
                id="genero"
                name="genero"
                value={movie.genero}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="imagen_url" className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
            <input
              type="url"
              id="imagen_url"
              name="imagen_url"
              value={movie.imagen_url}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigator('/admin/table')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded font-bold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            >
              Update Movie
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
