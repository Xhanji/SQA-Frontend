'use client'

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { motion } from 'framer-motion'

export default function SeriesEditForm() {
  const navigator = useNavigate()
  const { id } = useParams()
  const [series, setSeries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchSeries()
    }
  }, [id])

  const fetchSeries = async () => {
    try {
      const response = await fetch(`http://localhost:8001/api/series/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch series')
      }
      const data = await response.json()
      setSeries(data.data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching series')
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSeries({ ...series, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8001/api/series/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(series),
      })
      if (!response.ok) {
        throw new Error('Failed to update series')
      }
      navigator('/admin/series')
    } catch (err) {
      setError('Error updating series')
    }
  }

  if (loading) return <div className="text-center p-4 text-yellow-400">Loading...</div>
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-2xl"
      >
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Edit Series</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nombre_serie" className="block text-sm font-medium text-gray-400 mb-1">Series Title</label>
            <input
              type="text"
              id="nombre_serie"
              name="nombre_serie"
              value={series.nombre_serie}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-400 mb-1">Synopsis</label>
            <textarea
              id="sinopsis"
              name="sinopsis"
              value={series.sinopsis}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 h-24"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="temporadas" className="block text-sm font-medium text-gray-400 mb-1">Seasons</label>
              <input
                type="number"
                id="temporadas"
                name="temporadas"
                value={series.temporadas}
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
                value={series.genero}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="creador" className="block text-sm font-medium text-gray-400 mb-1">Creator</label>
            <input
              type="text"
              id="creador"
              name="creador"
              value={series.creador}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="imagen_portada" className="block text-sm font-medium text-gray-400 mb-1">Cover Image URL</label>
            <input
              type="url"
              id="imagen_portada"
              name="imagen_portada"
              value={series.imagen_portada}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigator('/admin/series')}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded font-bold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            >
              Update Series
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}