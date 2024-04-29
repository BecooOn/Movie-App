import React from "react";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
// import Register from "./pages/Register";

const App = () => {
  return (
    <div className="dark:bg-gray-dark-main min-h-screen">
      <AuthProvider>
        <AppRouter />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
};

export default App;
