import React from "react";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./context/AuthProvider";
// import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  );
};

export default App;
