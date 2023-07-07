import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Menu from "../../components/menu";

import { Link, useParams } from "react-router-dom";

import axios from "axios";

import posternotfound from "../../assets/posternotfound.png";

import Pagination from "../../components/pagination";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { search } = useParams() || "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${search}&page=${currentPage}&language=pt-BR`;
        const response = await axios.get(url);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [currentPage, search]);

  const handlePageChange = (event, currentPageNumber) => {
    event.preventDefault();
    setCurrentPage(currentPageNumber);
  }

  return (
    <div>
      <div className="container mx-auto max-w-[1580px]">
        <Header searchOptionAlreadyDefined={"movies"} />

        <div className="mx-auto flex">
          <div className="w-1/4 hidden sm:block mt-10">
            <Menu />
          </div>

          <div className="w-full sm:w-1/2 p-2">
            {movies.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold mt-8 mb-8">
                  Resultados da busca por "{search}"
                </h2>

                <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                  {movies.map((movie) => (
                    <Link
                      to={`/movie/${movie.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li
                        key={movie.id}
                        className="w-full cursor-pointer bg-white rounded-xl mt-2 p-0 mb-4 shadow-lg h-[110px] hover:bg-gray-100 flex items-center gap-4"
                      >
                        <img
                          className="w-20 h-30 p-2 rounded-xl"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                              : posternotfound
                          }
                          alt={movie.title}
                        />
                        <div className="flex items-center gap-1">
                          <h3 className="overflow-wrap break-word text-justify">
                            {movie.title}
                          </h3>
                          <p className="overflow-wrap break-word text-justify">
                            ({new Date(movie.release_date).getFullYear()})
                          </p>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>

                <Pagination
                  totalPages={totalPages > 5 ? 5 : totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              <h2 className="text-lg font-bold mt-8 mb-8">
                Não foram encontrados resultados por "{search}"
              </h2>
            )}
          </div>
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Movies;
