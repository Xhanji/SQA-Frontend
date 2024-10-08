import React from "react";
import Header from "./Components/Layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import MovieType from "./Components/Pages/MovieType";
import Error from "./Components/Pages/Error";
import Movie from "./Components/Pages/Movie";
import Register from "./Components/Login/Register";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="movie/:id" Component={Movie} />
        <Route path="movies/:type" Component={MovieType} />
        <Route path="/register" Component={Register} /> 
        <Route path="/Login" Component={Login} />
        <Route path="/*" Component={Error} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
