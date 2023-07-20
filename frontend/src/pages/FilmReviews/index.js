import React, { useEffect, useState } from "react";
import "./styles.css";

import Header from "../../components/header";
import Menu from "../../components/menu";
import Publication from "../../components/Publication";

import { useParams, Link } from "react-router-dom";

import api from "../../api";

import axios from "axios";

const FilmReviews = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);

  const [numberPublications, setNumberPublications] = useState(0);

  useEffect(() => {
    async function fetchMovieData() {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`;

      const response = await axios.get(url);
      setMovie(response.data);
    }

    fetchMovieData();
  }, [id]);

  useEffect(() => {
    const fetchPublicationsByMovieId = async () => {
      try {
        const response = await api.get(`/criticas/${id}/?page=${page}`);
        setPublications((prevPublications) => [
          ...prevPublications,
          ...response.data.results,
        ]);
        setNumberPublications(response.data.count);

        if (response.data.results.length === 0) {
          setReachedEnd(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPublicationsByMovieId();
  }, [id, page]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        "innerHeight" in window
          ? window.innerHeight
          : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowHeight + window.scrollY;

      if (windowBottom >= docHeight && !reachedEnd) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [reachedEnd]);

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"1"} />
        </div>

        <div className="w-full sm:w-1/2 relative mt-8 mb-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
            <img
              className="w-full rounded-md mb-8"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
          </div>

          <h2 className="text-lg p-4 pb-8 font-bold absolute top-0 left-0 w-full text-white text-left bg-black bg-opacity-50 rounded-md">
            Críticas de "{movie?.title}"
          </h2>

          <h3 className="text-md top-0 left-0 text-white mt-7 p-4 absolute">
            {numberPublications <= 0
              ? "Não foram encontradas críticas"
              : `${numberPublications} ${
                  numberPublications === 1 ? "crítica" : "críticas"
                }`}
          </h3>

          {publications.length > 0 &&
            publications.map((publication, index) => (
              <Publication
                key={index}
                userID={publication.user_id}
                idPost={publication?.id}
                movieID={publication.movie_id}
                rating={publication.review}
                pubText={publication.pub_text}
                image={publication?.imgur_link}
                date={publication.date}
                myPub={false}
                id={publication.id}
              />
            ))}
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default FilmReviews;
