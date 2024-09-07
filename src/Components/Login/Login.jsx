import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  // Estado para los campos de correo/teléfono y contraseña
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    if (validateInputs()) {
      loginUser();
    } else {
      alert("Por favor, ingresa un correo/teléfono y una contraseña válidos.");
    }
  };

  // Función para validar los campos de entrada
  const validateInputs = () => {
    if (!emailOrPhone) {
      return false;
    }
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  // Función simulada para iniciar sesión
  const loginUser = () => {
    console.log("Iniciando sesión con:", emailOrPhone, password);
    alert("¡Inicio de sesión exitoso!");
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
          value={emailOrPhone}
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