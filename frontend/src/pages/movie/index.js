import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Menu from "../../components/menu";

import { useParams } from "react-router-dom";

import axios from "axios";

import posternotfound from "../../assets/posternotfound.png";

const Movie = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [streamings, setStreamings] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`;
      const response = await axios.get(url);
      setMovie(response.data);
    };

    const fetchStreamingsData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
      const response = await axios.get(url);
      setStreamings(response.data.results.BR?.flatrate || []);
    };

    fetchMovieData();
    fetchStreamingsData();
  }, [id]);

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/2 hidden sm:block mt-10">
          <Menu selectedOption={"1"} />
        </div>

        <div className="w-full">
          <div className="pt-8">
            <h2 className="text-xl font-bold">
              {movie?.title} (
              {movie.release_date
                ? new Date(movie.release_date).getFullYear()
                : ""}
              )
            </h2>
            <div className="flex mt-4 mb-4">
              <img
                className="w-40 h-50 rounded-xl"
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : posternotfound
                }
                alt={movie.title}
              />
              <div className="h-50 w-full ml-2 rounded-xl bg-black">
                Trailer
              </div>
            </div>

            <div className="flex gap-2">
              {movie.genres?.length > 0 ? (
                movie.genres.map((genre) => (
                  <p className="font-bold" key={genre.id}>
                    {genre.name}
                  </p>
                ))
              ) : (
                <p>Nenhum gênero encontrado.</p>
              )}
            </div>
            
            <p className="text-justify">{movie.overview}</p>

            <ul className="flex gap-2 mt-4 mb-4">
              {streamings &&
                streamings.map((provider) => (
                  <li key={provider.provider_id}>
                    <img
                      className="w-8 h-8 rounded-sm"
                      src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                      alt={provider.provider_name}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="w-1/2 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Movie;
