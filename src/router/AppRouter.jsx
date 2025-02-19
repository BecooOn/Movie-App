import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import MovieDetail from "../pages/MovieDetail";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/*//!conditional rendering in routing*/}
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:id" element={<PrivateRouter/>}>
          <Route path="" element={<MovieDetail/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
