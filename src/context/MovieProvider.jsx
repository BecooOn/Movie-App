import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`; //!movie verilerini almak için endpoint
export const useMovieContext = () => {
  return useContext(MovieContext);
};

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  //!Movie verileri çağırıldığında ekranda görünmesi için bir fonksiyon oluşturuyoruz, bu fonksiyonda istek atıyoruz ve bu fonksiyonu useEffect ile hareketlendiriyoruz
  const getMovies = (URL) => {
    //? URL ile endpoint'leri dinamik hale getirdik. İlk işlemde FEATURED_API'a göre fimler çağrılırken; arama işleminde SEARCH_API'a göre işlem yapar.
    setLoading(true);
    axios(URL)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() =>setLoading(false));
  };

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);
  console.log(movies);
//   const values = {movies,loading};
  return (
    <MovieContext.Provider value={{movies,loading,getMovies}}>{children}</MovieContext.Provider>
  );
};

export default MovieProvider;
