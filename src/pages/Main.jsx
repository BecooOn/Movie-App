import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      Main
      <button className="border-2 border-blue-300 p-2 m-4 bg-slate-300">
        <Link to="/login">Login</Link>
      </button>
      <button className="border-2 border-blue-300 p-2 m-4 bg-slate-300">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default Main;
