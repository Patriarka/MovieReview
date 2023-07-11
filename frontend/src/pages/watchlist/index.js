import React, { useEffect, useState } from "react";

import Header from "../../components/header";

import Menu from "../../components/menu";

import api from "../../api";

import { useParams } from "react-router-dom";

import posternotfound from "../../assets/posternotfound.png";

import { Tooltip } from "react-tooltip";

import { Link } from "react-router-dom";

const Watchlist = () => {
  const { id } = useParams();

  const [watchlist, setWatchlist] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      const response = await api.get(`/watchlist/user/${id}/?page=1`);

      const watchlistMovies = response.data.results.map((movie) => ({
        ...movie,
        watchlist: movie.watchlist,
      }));

      setWatchlist(watchlistMovies);
    };

    fetchWatchlistData();
  }, [id]);

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
            <div className="w-full grid grid-cols-6 gap-x-1 gap-y-6">
              {watchlist.length > 0 &&
                watchlist.map((movie) => (
                  <Link to={`/movie/${movie?.movie_id}`} key={movie?.id}>
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
                    <Tooltip className="bg-gray-500" id={`tooltip-${movie?.movie_id}`} />
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Watchlist;
