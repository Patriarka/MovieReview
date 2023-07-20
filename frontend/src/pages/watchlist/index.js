import React, { useEffect, useState } from "react";

import Header from "../../components/header";

import Menu from "../../components/menu";

import api from "../../api";

import posternotfound from "../../assets/posternotfound.png";

import { Tooltip } from "react-tooltip";

import { Link, useParams } from "react-router-dom";

import { AiFillEye } from "react-icons/ai";

import Pagination from "../../components/pagination";

const Watchlist = () => {
  const { id } = useParams();

  const [watchlist, setWatchlist] = useState([]);
  const [watchlistTotalCount, setWatchlistTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      const response = await api.get(`/watchlist/user/${id}/?page=${currentPage}`);

      const watchlistMovies = response.data.results.map((movie) => ({
        ...movie,
        watchlist: movie.watchlist,
      }));

      setWatchlistTotalCount(response.data.count);

      setWatchlist(watchlistMovies);
    };

    fetchWatchlistData();
  }, [id, currentPage]);

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"3"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <div className="mt-8">
            <h2 className="text-lg font-bold mt-4 mb-4">Assistir no Futuro</h2>
            <div className="w-full grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-x-1 gap-y-6">
              {watchlist.length > 0 &&
                watchlist.map((movie) => (
                  <Link
                    className="relative"
                    to={`/movie/${movie?.movie_id}`}
                    key={movie?.id}
                  >
                    <img
                      className="rounded-xl hover:border-[#cb498a] border-4 cursor-pointer"
                      alt={movie?.id}
                      src={
                        movie?.poster_img
                          ? `https://image.tmdb.org/t/p/w500/${movie.poster_img}`
                          : posternotfound
                      }
                      data-tooltip-id={`tooltip-${movie?.movie_id}`}
                      data-tooltip-content={movie?.movie_title}
                    />
                    <Tooltip
                      className="bg-gray-500 z-20"
                      id={`tooltip-${movie?.movie_id}`}
                    />
                  </Link>
                ))}
            </div>
            {watchlist.length > 0 && (
                <Pagination
                  totalPages={Math.ceil(watchlistTotalCount / 35)}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
          </div>
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Watchlist;
