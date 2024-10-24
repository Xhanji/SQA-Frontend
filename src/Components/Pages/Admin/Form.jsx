import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Component() {
  const [formType, setFormType] = useState('movie');
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState({
    titulo: '',
    duracion: '',
    fecha_estreno: '',
    sinopsis: '',
    director: '',
    genero: '',
    imagen_url: '',
    nombre_serie: '',
    temporadas: '',
    creador: '',
    imagen_portada: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = formType === 'movie' ? 'http://localhost:8001/api/movies/store' : 'http://localhost:8001/api/series/store';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setNotification({ show: true, message: 'Solicitud Completada' });
        setFormData({});
      } else {
        setNotification({ show: true, message: 'Error al enviar el formulario' });
      }
    } catch (error) {
      console.error('Error:', error);
      setNotification({ show: true, message: 'Error al enviar el formulario' });
    }
  };

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-2xl relative">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Agregar {formType === 'movie' ? 'Película' : 'Serie'}</h1>
        
        <div className="mb-6 flex justify-center space-x-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              checked={formType === 'movie'}
              onChange={() => setFormType('movie')}
            />
            <span className="ml-2 text-lg">Película</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-gray-800"
              checked={formType === 'serie'}
              onChange={() => setFormType('serie')}
            />
            <span className="ml-2 text-lg">Serie</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={formType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {formType === 'movie' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="titulo" className="block text-sm font-medium text-gray-400 mb-1">Título</label>
                      <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="duracion" className="block text-sm font-medium text-gray-400 mb-1">Duración (minutos)</label>
                      <input
                        type="text"
                        id="duracion"
                        name="duracion"
                        value={formData.duracion}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fecha_estreno" className="block text-sm font-medium text-gray-400 mb-1">Fecha de Estreno</label>
                    <input
                      type="date"
                      id="fecha_estreno"
                      name="fecha_estreno"
                      value={formData.fecha_estreno}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-400 mb-1">Sinopsis</label>
                    <textarea
                      id="sinopsis"
                      name="sinopsis"
                      value={formData.sinopsis}
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
                        value={formData.director}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="genero" className="block text-sm font-medium text-gray-400 mb-1">Género</label>
                      <input
                        type="text"
                        id="genero"
                        name="genero"
                        value={formData.genero}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="imagen_url" className="block text-sm font-medium text-gray-400 mb-1">URL de la Imagen</label>
                    <input
                      type="url"
                      id="imagen_url"
                      name="imagen_url"
                      value={formData.imagen_url}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="nombre_serie" className="block text-sm font-medium text-gray-400 mb-1">Nombre de la Serie</label>
                    <input
                      type="text"
                      id="nombre_serie"
                      name="nombre_serie"
                      value={formData.nombre_serie}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-400 mb-1">Sinopsis</label>
                    <textarea
                      id="sinopsis"
                      name="sinopsis"
                      value={formData.sinopsis}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 h-24"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="temporadas" className="block text-sm font-medium text-gray-400 mb-1">Número de Temporadas</label>
                      <input
                        type="number"
                        id="temporadas"
                        name="temporadas"
                        value={formData.temporadas}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="genero" className="block text-sm font-medium text-gray-400 mb-1">Género</label>
                      <input
                        type="text"
                        id="genero"
                        name="genero"
                        value={formData.genero}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="creador" className="block text-sm font-medium text-gray-400 mb-1">Creador</label>
                    <input
                      type="text"
                      id="creador"
                      name="creador"
                      value={formData.creador}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="imagen_portada" className="block text-sm font-medium text-gray-400 mb-1">URL de la Imagen de Portada</label>
                    <input
                      type="url"
                      id="imagen_portada"
                      name="imagen_portada"
                      value={formData.imagen_portada}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <button
            type="submit"
            className="w-full p-3 bg-yellow-400 text-gray-900 rounded font-bold hover:bg-yellow-500 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
          >
            Guardar {formType === 'movie' ? 'Película' : 'Serie'}
          </button>
        </form>

        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}