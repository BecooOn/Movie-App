import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

  useEffect(() => {
    userObserver();
  }, []);

  const createUser = async (email, password, displayName) => {
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
      console.log(userCredential);

      //!Kullanıcı bilgilerini güncellemek için register içinde bu firebase metodunu kullanıyoruz, displayName register alınacak. Çünkü ilk anda displayName boş olacaktır ve kullanıcının ismini ekranda görmesi için en güncel bilgiler bu metodla sağlanacaktır.
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      navigate("/login"); //? Kullanıcı kayıt olduktan sonra login sayfasına yönlendirmek için
      toastSuccessNotify("Registration successful");
      console.log(userCredential);
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
        //!auth metodu firebase.js den import edilir
        auth,
        email,
        password
      );
      navigate("/"); //? Kullanıcı giriş yaptıktan sonra login sayfasına yönlendirmek için
      toastSuccessNotify("Login successful");
      console.log(userCredential);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toastSuccessNotify("Logout Successful");
      })
      .catch((error) => {
        // An error happened.
        toastErrorNotify("An error happened", error);
      });
  };

  //!Bir kullanıcı başarıyla oturum açtığında gözlemcide kullanıcı hakkında bilgi alabilmek için kullanılan firebase metodu.(onAuthStateChanged). Bu işlemi tek sefer yapması yeterlidir
  const userObserver = () => {
    //? userObserver fonksiyonu, onAuthStateChanged ile otomatik takip yapacağı için artık diğer fonksiyonlarda ve metodlarda setCurrentUser çağırmaya gerek kalmadı.

    onAuthStateChanged(auth, (user) => {
      //!displayName kullanıcı bilgilerini alabilmek için bu kodlardan sonra updateProfile metoduna ihtiyacımız var
      if (user) {
        //?user login olduğunda
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        //?user logout olduğunda
        setCurrentUser(null);
      }
    });
  };

  //? 1.Google ile girişi enable ediyoruz
  //? 2.Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle(Authentication => settings => Authorized domains => add domain)
  //* googleProvider fonksiyonu register ve login de kullanılacak
  const googleProvider = () => {
    const provider = new GoogleAuthProvider();

    //!Açılır pencereyle oturum açmak için signInWithPopup metodu
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
        toastSuccessNotify("Login Successful");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  //?sendPasswordResetEmail metodunu kullanarak bir kullanıcıya şifre sıfırlama e-postası gönderebilmek için
  const forgotPassword = (email) => {
    //? Kullanıcı şifresini sıfırlayabilmesi için email girmek zorundadır.
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify("Password reset email sent to your email box!");
      })
      .catch((error) => {
        toastErrorNotify("Enter your email for reset",error.message);
      });
  };

  // console.log(currentUser);

  const values = {
    currentUser,
    createUser,
    signIn,
    logOut,
    googleProvider,
    forgotPassword,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
