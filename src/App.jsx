import React from "react";
import Header from "./Components/Layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";
import MovieType from "./Components/Pages/MovieType";
import Error from "./Components/Pages/Error";
import Movie from "./Components/Pages/Movie";
import Register from "./Components/Login/Register";
import Login from "./Components/Login/Login";
import Mockup from "./Components/Pages/Mockup";
import Form from "./Components/Pages/Admin/Form";
import Table from "./Components/Pages/Admin/table";
import MovieEditForm from "./Components/Pages/Admin/MovieEditForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={Mockup} />
        <Route path="movie/:id" Component={Movie} />
        <Route path="movies/:type" Component={MovieType} />
        <Route path="/register" Component={Register} /> 
        <Route path="/Login" Component={Login} />
        <Route path="/*" Component={Error} />
        <Route path="/mockup" Component={Mockup}/>
        <Route path="/admin/create" Component={Form}/>
        <Route path="/admin/table" Component={Table}/>
        <Route path="movie/edit/:id" Component={MovieEditForm}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
