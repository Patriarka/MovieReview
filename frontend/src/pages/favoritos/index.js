import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Menu from "../../components/menu";
import Pagination from "../../components/pagination";

import { Tooltip } from "react-tooltip";

import { Link, useParams } from "react-router-dom";

import api from "../../api";

import posternotfound from "../../assets/posternotfound.png";

const Favoritos = () => {
  const { id } = useParams();

  const [favorites, setFavorites] = useState([]);
  const [favoritesTotalCount, setFavoritesTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchWatchlistData = async () => {
      const response = await api.get(`/movies/favoritos/${id}/?page=${currentPage}`);

      const favoriteMovies = response.data.results.map((movie) => ({
        ...movie,
      }));
      
      // favorito: movie.favorito,

      setFavoritesTotalCount(response.data.count);

      setFavorites(favoriteMovies);
    };

    fetchWatchlistData();
  }, [id, currentPage]);

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"4"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <div className="mt-8">
            <h2 className="text-lg font-bold mt-4 mb-4">Favoritos</h2>
            <div className="w-full grid grid-cols-7 gap-x-1 gap-y-6">
              {favorites.length > 0 &&
                favorites.map((movie) => (
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
            {favorites.length > 0 && (
              <Pagination
                totalPages={Math.ceil(favoritesTotalCount / 35)}
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

export default Favoritos;