import React, { useEffect, useState } from "react";

import { Input, Modal } from "antd";

import { IoIosAdd } from "react-icons/io";

import { FaStar } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";

import api from "../../api";

import { useSelector } from "react-redux";

import { Rate } from "antd";

import {
  StyledPublicationButton,
  StyledRate,
} from "../../styles/components/MovieEvaluationStyle.js";

import { toast } from "react-toastify";

const { TextArea } = Input;

const MovieEvaluation = ({ movie }) => {
  const idUser = useSelector((state) => state.idUser);

  const [rating, setRating] = useState(0);

  const [isMovieOnFavoriteList, setIsMovieOnFavoriteList] = useState(false);
  const [isMovieOnWatchList, setIsMovieOnWatchList] = useState(false);

  const [isFavoriteHovered, setIsFavoriteHovered] = useState(false);
  const [isWatchlistHovered, setIsWatchlistHovered] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchIsMovieOnFavoriteList = async () => {
      try {
        const url = `/favoritos/${movie.id}/is_movie_favorite/`;
        const response = await api.get(url);
        setIsMovieOnFavoriteList(response.data.is_favorite);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchIsMovieOnWatchList = async () => {
      try {
        const url = `/watchlist/${movie.id}/is_movie_on_watchlist/`;
        const response = await api.get(url);
        setIsMovieOnWatchList(response.data.is_movie_on_watchlist);
      } catch (error) {
        console.log(error);
      }
    };

    fetchIsMovieOnFavoriteList();
    fetchIsMovieOnWatchList();
  }, [movie]);

  async function handleFavorite() {
    const data = {
      movie_id: movie.id,
      poster_img: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      movie_title: movie.title,
    };

    try {
      const url = "/favoritos/";
      await api.post(url, data);
      setIsMovieOnFavoriteList(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDisfavor = async () => {
    try {
      const url = `/favoritos/${movie.id}/`;
      await api.delete(url);
      setIsMovieOnFavoriteList(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWatchlist = async () => {
    const data = {
      user_id: idUser,
      movie_id: movie.id,
      poster_img: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      movie_title: movie.title,
    };

    try {
      const url = "/watchlist/";
      await api.post(url, data);
      setIsMovieOnWatchList(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovetoWatchlist = async () => {
    try {
      const url = `/watchlist/movie/${movie.id}/`;
      await api.delete(url);
      setIsMovieOnWatchList(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setInputValue("");
  };

  const handleConfirm = async () => {
    let id = localStorage.getItem("idUser");
    id = id.substring(1, id.length - 1);

    const data = {
      review: rating,
      pub_text: inputValue,
      user_id: parseInt(id),
      movie_id: movie.id,
      movie_title: movie.original_title,
    };

    const formData = new FormData();

    formData.append("review", data.review);
    formData.append("pub_text", data.pub_text);
    formData.append("user_id", data.user_id);
    formData.append("date", data.date);
    formData.append("movie_id", data.movie_id);
    formData.append("movie_title", data.movie_title);

    await api
      .post("/publicacoes/", data)
      .then((response) => {
        toast.success("Publicação feita com sucesso!");
        handleCloseModal();
      })
      .catch((error) => {
        toast.error("Erro ao publicar. Por favor, tente novamente.");
      });
  };

  return (
    <div className="w-full mt-16">
      <Modal
        title={`Criar Crítica para ${movie.title}`}
        open={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <div className="pt-4 flex justify-between">
            <StyledRate value={rating} onChange={(value) => setRating(value)} />

            <StyledPublicationButton
              className="bg-pink-500 font-white"
              key="Publicar"
              onClick={handleConfirm}
            >
              Publicar
            </StyledPublicationButton>
          </div>,
        ]}
      >
        <TextArea
          rows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escreva sua Crítica"
        />
        <div>
          {movie && (
            <div className="mt-4 bg-white border-2 rounded-xl p-2 mb-4 flex items-center shadow-lg text-black">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-12 mr-2"
              />
              <h3>{movie.title}</h3>
            </div>
          )}
        </div>
      </Modal>
      <div className="flex-col gap-2 w-full max-w-[270px] mx-auto p-2 rounded-xl justify-around">
        <button
          className="cursor-pointer b-none rounded-md text-white font-bold flex w-full bg-black-30 hover:bg-black-50 p-2 gap-2"
          onClick={isMovieOnFavoriteList ? handleDisfavor : handleFavorite}
          onMouseEnter={() => setIsFavoriteHovered(true)}
          onMouseLeave={() => setIsFavoriteHovered(false)}
        >
          <FaStar color={isMovieOnFavoriteList ? "#fadb14" : "white"} size={16} />
          {isMovieOnFavoriteList ? (
            <label className="text-xs cursor-pointer"> {isFavoriteHovered ? "Desfavoritar" : "Favoritado"}</label>
          ) : (
            <label className="text-xs cursor-pointer"> Favoritar</label>
          )}
        </button>

        <button
          className="mt-2 cursor-pointer b-none rounded-md text-white font-bold flex w-full bg-black-30 hover:bg-black-50 p-2 gap-2"
          onClick={
            isMovieOnWatchList ? handleRemovetoWatchlist : handleAddToWatchlist
          }
          onMouseEnter={() => setIsWatchlistHovered(true)}
          onMouseLeave={() => setIsWatchlistHovered(false)}
        >
          <IoMdEye color={isMovieOnWatchList ? "#e90074" : "white"} size={17} />
          
          {isMovieOnWatchList ? (
            <label className="text-xs cursor-pointer">
              {" "}
              {isWatchlistHovered ? "Remover da Watchlist" : "Adicionado na Watchlist"}
            </label>
          ) : (
            <label className="text-xs cursor-pointer">
              {" "}
              Adicionar na Watchlist
            </label>
          )}
        </button>

        <button
          className="mt-2 cursor-pointer b-none rounded-md text-white font-bold flex items-center w-full bg-[#d30069] hover:bg-[#e90074] p-2 gap-2"
          onClick={handleOpenModal}
        >
          <IoIosAdd color={"white"} size={18} strokeWidth={12} />
          <label className="text-xs cursor-pointer">Adicionar crítica</label>
        </button>
      </div>
      <div className="flex gap-2 w-40 mx-auto p-2 rounded-xl justify-around">
        <Rate />
      </div>
    </div>
  );
};

export default MovieEvaluation;
