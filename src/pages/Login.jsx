import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return <div>Login
      <button className="border-2 border-blue-300 p-2 m-4 bg-slate-300">
        <Link to="/">Main</Link>
      </button>
  </div>;
};

export default Login;
