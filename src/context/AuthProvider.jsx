import React, { createContext, useContext, useState } from "react";
import { auth } from "../auth/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("currentUser")) || null
  );
  const navigate = useNavigate();

  const createUser = async (email, password) => {
    //? Şifre 6 karakterden az ise kullanıcıya uyarı
    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }
    //?createUser metodunu çağırdığımız yerden email, password alınır, createUser'ı register sayfasında handleSubmit fonksiyonu içinde kullanacağız.
    try {
      //!Yeni bir kullanıcı oluşturmakiçin kullanılan firebase metodu
      //? auth, url gibi; email ve password ise data gibi
      //? createUserWithEmailAndPassword metodu post işlemi gibi
      const userCredential = await createUserWithEmailAndPassword(
        //!auth metodu firebase.js den import
        auth,
        email,
        password
      );
      navigate("/login"); //? Kullanıcı kayıt olduktan sonra login sayfasına yönlendirmek için
      // console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const values = {
    currentUser,
    createUser,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
