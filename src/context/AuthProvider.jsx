import React, { createContext, useContext, useState } from "react";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/ToastNotify";
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
      toastWarnNotify("Password should be at least 6 characters");
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
      toastSuccessNotify("Registration successful");
      // console.log(userCredential);
    } catch (error) {
      toastErrorNotify(error.message); //?firebase'den gelen error içerisindeki message bilgisini toastErrorNotify ile kullanıcıya uyarı olarak veriyoruz
    }
  };

  //!email ve password ile girişi enable yapıyoruz
  const signIn = async (email, password) => {
    //?signIn metodunu çağırdığımız yerden email, password alınır, signIn'i login sayfasında handleSubmit fonksiyonu içinde kullanacağız.
    try {
      //!Mevcut kullanıcının giriş yapması için kullanılan firebase metodu
      //? auth, url gibi; email ve password ise data gibi
      const userCredential = await signInWithEmailAndPassword(
        //!auth metodu firebase.js den import
        auth,
        email,
        password
      );
      navigate("/"); //? Kullanıcı giriş yaptıktan sonra login sayfasına yönlendirmek için
      toastSuccessNotify("Login successful");
      // console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

const logOut = () =>{
  signOut(auth).then(() => {
    // Sign-out successful.
    toastSuccessNotify("Logout Successful");
  }).catch((error) => {
    // An error happened.
    toastErrorNotify("An error happened");
  });
}


  const values = {
    currentUser,
    createUser,
    signIn,
    logOut,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
