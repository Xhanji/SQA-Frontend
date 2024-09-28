import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../Providers/ContextProvider';
import { useNavigate } from 'react-router-dom';
function Login() {
  // Estado para los campos de correo/teléfono y contraseña
  const [email, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const {setUser , setToken} = useStateContext();
  const navigate = useNavigate();

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto
    let formdata = {email, password}
    console.log(formdata);
        
        // Validaciones básicas
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        
        axiosClient.post('login', formdata)
    .then((response) => { // Cambié "data" por "response"
        console.log(response); // Aquí puedes ver toda la respuesta y su estructura

        // Verifica si response.data existe antes de acceder a user y token
        const { access_token, user } = response.data;

        if (user && access_token) { // Verifica si 'user' y 'access_token' no están indefinidos
            setUser(user); // Guarda el usuario
            setToken(access_token); // Guarda el token
            console.log('User:', user); // Muestra el usuario para verificar
            console.log('Token:', access_token); // Muestra el token para verificar
            navigate('/')
        } else {
            console.error('User or token are undefined.');
        }})
        .catch(err => {
            const response = err.response;
            if (response && response.status === 422){
                console.log(response.data.errors);
            } else {
                console.error('Error en la solicitud:', err);
            }
        });          
      };
      

  

  return (
    <div className="container">
      {/* Logo de IMDb */}
      <div className="logo-imdb">IMDb</div>
      <h2>Inicia sesión</h2>

      {/* Formulario de inicio de sesión */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo Electrónico o Teléfono"
          value={email}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Enlace de "Olvidaste tu Contraseña?" */}
        <div className="forgot-password">
          <a href="#">¿Olvidaste tu Contraseña?</a>
        </div>

        <input type="submit" value="Iniciar Sesión" />

        {/* Checkbox para mantener sesión iniciada */}
        <div className="keep-signed-in">
          <input type="checkbox" id="keep-signed-in" />
          <label htmlFor="keep-signed-in">
            Mantener Sesión. <a href="#">Detalles</a>
          </label>
        </div>
      </form>

      {/* Texto "¿Eres Nuevo?" */}
      <div className="new-to-imdb">
        ¿Eres Nuevo? <Link to="/register">Crea tu cuenta en IMDb</Link>
      </div>
    </div>
  );
}

export default Login;