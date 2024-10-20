import React, { useState } from 'react';

export default function Component() {
  const [formType, setFormType] = useState('movie');
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
        alert('Solicitud Completada');
        setFormData({});
      } else {
        alert('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">Agregar {formType === 'movie' ? 'Película' : 'Serie'}</h1>
        
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-yellow-400"
              checked={formType === 'movie'}
              onChange={() => setFormType(formType === 'movie' ? 'serie' : 'movie')}
            />
            <span className="ml-2">
              {formType === 'movie' ? 'Película' : 'Serie'}
            </span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formType === 'movie' ? (
            <>
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={formData.titulo}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="text"
                name="duracion"
                placeholder="Duración (minutos)"
                value={formData.duracion}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="date"
                name="fecha_estreno"
                placeholder="Fecha de Estreno"
                value={formData.fecha_estreno}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <textarea
                name="sinopsis"
                placeholder="Sinopsis"
                value={formData.sinopsis}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="text"
                name="director"
                placeholder="Director"
                value={formData.director}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="text"
                name="genero"
                placeholder="Género"
                value={formData.genero}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="url"
                name="imagen_url"
                placeholder="URL de la Imagen"
                value={formData.imagen_url}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </>
          ) : (
            <>
              <input
                type="text"
                name="nombre_serie"
                placeholder="Nombre de la Serie"
                value={formData.nombre_serie}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <textarea
                name="sinopsis"
                placeholder="Sinopsis"
                value={formData.sinopsis}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="number"
                name="temporadas"
                placeholder="Número de Temporadas"
                value={formData.temporadas}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="url"
                name="imagen_portada"
                placeholder="URL de la Imagen de Portada"
                value={formData.imagen_portada}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="text"
                name="genero"
                placeholder="Género"
                value={formData.genero}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
              <input
                type="text"
                name="creador"
                placeholder="Creador"
                value={formData.creador}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-700 rounded"
                required
              />
            </>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-yellow-400 text-gray-900 rounded font-bold hover:bg-yellow-500 transition-colors"
          >
            Guardar {formType === 'movie' ? 'Película' : 'Serie'}
          </button>
        </form>
      </div>
    </div>
  );
}