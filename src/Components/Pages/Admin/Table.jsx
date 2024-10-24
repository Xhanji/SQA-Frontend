'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Edit2, Trash2 } from 'lucide-react'

const mockData = [
  { id: 1, title: "Inception", type: "Movie", durationOrSeasons: "148 min", releaseDate: "2010-07-16", genre: "Sci-Fi", directorOrCreator: "Christopher Nolan" },
  { id: 2, title: "Stranger Things", type: "Series", durationOrSeasons: "4 seasons", releaseDate: "2016-07-15", genre: "Drama", directorOrCreator: "Duffer Brothers" },
  { id: 3, title: "The Shawshank Redemption", type: "Movie", durationOrSeasons: "142 min", releaseDate: "1994-09-23", genre: "Drama", directorOrCreator: "Frank Darabont" },
  { id: 4, title: "Breaking Bad", type: "Series", durationOrSeasons: "5 seasons", releaseDate: "2008-01-20", genre: "Crime", directorOrCreator: "Vince Gilligan" },
  { id: 5, title: "Pulp Fiction", type: "Movie", durationOrSeasons: "154 min", releaseDate: "1994-10-14", genre: "Crime", directorOrCreator: "Quentin Tarantino" },
]

export default function Table() {
  const handleEdit = (id) => {
    console.log('Edit item with id:', id)
  }

  const handleDelete = (id) => {
    console.log('Delete item with id:', id)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center py-4">Movies and Series</h1>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left text-yellow-400">Title</th>
                <th className="p-3 text-left text-yellow-400">Type</th>
                <th className="p-3 text-left text-yellow-400">Duration/Seasons</th>
                <th className="p-3 text-left text-yellow-400">Release Date</th>
                <th className="p-3 text-left text-yellow-400">Genre</th>
                <th className="p-3 text-left text-yellow-400">Director/Creator</th>
                <th className="p-3 text-left text-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.durationOrSeasons}</td>
                  <td className="p-3">{item.releaseDate}</td>
                  <td className="p-3">{item.genre}</td>
                  <td className="p-3">{item.directorOrCreator}</td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="p-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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