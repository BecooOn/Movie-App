import React from "react";
import { Link } from "react-router-dom";

const MovieModal = ({
  isModalOpen,
  setIsModalOpen,
  title,
  poster_path,
  overview,
  vote_average,
  release_date,
  vote_count,
}) => {
  if (!isModalOpen) return null;

  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="md:container flex justify-center items-center px-2 m-auto">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/2">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto rounded-full bg-green-100 "></div>

                <div className="flex max-w-6xl rounded-lg bg-gray-100 dark:bg-gray-dark-second shadow-lg">
                  <img
                    className=" lg:w-full h-12 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src={
                      poster_path ? baseImageUrl + poster_path : defaultImage
                    }
                    alt="poster"
                  />
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h5 className="text-gray-900 dark:text-gray-50 text-xl font-medium mb-2">
                        Overview
                      </h5>
                      <p className="text-gray-700 dark:text-gray-300  text-base mb-4">
                        {overview}
                      </p>
                    </div>
                    <ul className="rounded-lg border border-gray-400 text-gray-900 dark:text-gray-300">
                      <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
                        {"Release Date : " + release_date}
                      </li>
                      <li className="px-6 py-2 border-b border-gray-400 w-full">
                        {"Rate : " + vote_average}
                      </li>
                      <li className="px-6 py-2 border-b border-gray-400 w-full">
                        {"Total Vote : " + vote_count}
                      </li>
                      <li className="px-6 py-2 border-gray-400 w-full rounded-t-lg">
                        <Link
                          to={-1}
                          className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                        >
                          Go to Movies
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
