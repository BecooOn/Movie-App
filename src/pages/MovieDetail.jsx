import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";
import MovieModal from "../components/MovieModal";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [videoKey, setVideoKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  const {
    title,
    poster_path,
    // overview,
    // vote_average,
    // release_date,
    // vote_count,
  } = movieDetail;

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetail(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <div className="md:container px-2 mx-auto py-5">
      <h1 className="text-center text-white text-3xl">{title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className="md:container flex justify-center items-center px-2">
        <div className="flex flex-col lg:flex-row max-w-6xl rounded-lg bg-gray-100 dark:bg-gray-dark-second shadow-lg p-1">
          <img
            className="w-full h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
          />
        </div>

        <button
          className="w-[74px] h-96 lg:h-[600px] bg-red-main hover:bg-red-600 text-white font-bold py-2 px-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Show Details
        </button>
      </div>
      <div className="text-center m-4">
        <Link
          to={-1}
          className="bg-red-main hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </Link>
      </div>
      <MovieModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        {...movieDetail}
      />
    </div>
  );
};

export default MovieDetail;
