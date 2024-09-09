import React, { useState } from 'react';
import './Register.css';
import { json } from 'react-router';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        let formdata = {name, email, password}
        
        // Validaciones básicas
        if (password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Si todo está bien, puedes manejar el registro aquí
        alert('Form submitted successfully!');
        // Aquí podrías enviar el formulario a un servidor usando fetch() o axios
        // Por ahora, solo resetearemos el formulario
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method : "POST",
                headers : {
                    "Content-Type": "aplication/json",
                },
                body: JSON.stringify(formdata), 
            });
            const responseData = await response.json();
            if (response.ok){
                window.location.href('/')
            }
        
        }catch (error){
            console.log(error)
        }

            
    };

    return (
        <div className="container">
            <div className="logo-imdb">IMDb</div>
            <h2>Regístrate</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"></label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Coloca tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email"></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password"></label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor="confirmPassword"></label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <input type="submit" value="Crear Cuenta" />
            </form>

            <div className="new-to-imdb">
                Ya tienes cuenta? <a href="/login">Inicia Sesion en IMDb</a>
            </div>
        </div>
    );
};

export default Register;