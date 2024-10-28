'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function SeriesTable() {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigator = useNavigate();

  const fetchSeries = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/series/index')
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

  useEffect(() => {
    fetchSeries()
  }, [])

  const handleEdit = (id) => {
    navigator(`/serie/edit/${id}`)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/api/series/delete/${id}`, {
        method: 'POST',
      })
      if (!response.ok) {
        throw new Error('Failed to delete series')
      }
      fetchSeries() // Refresh the series list
    } catch (err) {
      console.error('Error deleting series:', err)
    }
  }

  if (loading) return <div className="text-center p-4 text-yellow-400">Loading...</div>
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center py-4">Series</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left text-yellow-400">Title</th>
                <th className="p-3 text-left text-yellow-400">Seasons</th>
                <th className="p-3 text-left text-yellow-400">Genre</th>
                <th className="p-3 text-left text-yellow-400">Creator</th>
                <th className="p-3 text-left text-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {series.map((show, index) => (
                <motion.tr
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-3">{show.nombre_serie}</td>
                  <td className="p-3">{show.temporadas}</td>
                  <td className="p-3">{show.genero}</td>
                  <td className="p-3">{show.creador}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(show.id)}
                        className="p-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(show.id)}
                        className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}