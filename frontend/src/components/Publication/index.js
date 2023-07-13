import React, { useState, useEffect } from "react";
import "./styles.css";

import userImage from "../../assets/user-default.png";

import { BiCommentDetail } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import api from "../../api";

import { Rate } from "antd";

import {
  LikeStyled,
  DeslikeStyled,
} from "../../styles/components/PublicationStyle";

const Publication = ({
  userID,
  idPost,
  movieID,
  rating,
  pubText,
  image,
  pubDate,
  isMyPub,
}) => {
  const [userPublicationOwner, setUserPublicationOwner] = useState(null);
  const [moviePublication, setMoviePublication] = useState(null);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const navigate = useNavigate();

  const handleProfile = () => {
    const url = `/user/${userID}`;
    navigate(url);
  };

  const handleMovie = () => {
    const url = `/movie/${movieID}`;
    navigate(url);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`usuarios/${userID}/`);
        setUserPublicationOwner(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userID]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`;
      const response = await axios.get(url);
      setMoviePublication(response.data);
    };

    fetchData();
  }, [movieID]);

  useEffect(() => {
    const fetchWasLiked = async () => {
      try {
        const response = await api.get(`/is_liked/${idPost}/`);
        const { is_liked } = response.data;
        setLike(is_liked);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchWasDisliked = async () => {
      try {
        const response = await api.get(`/is_desliked/${idPost}/`)
        const { is_desliked } = response.data;
        setDislike(is_desliked);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWasLiked();
    fetchWasDisliked();
  }, [idPost]);

  const handleLike = async () => {
    const url = `/likes/${idPost}/`;
    try {
      const response = await api.post(url, null);
      const { is_liked } = response.data;
      setLike(is_liked);
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
    }
  };

  const handleDeslike = async () => {
    const url = `/deslikes/${idPost}/`;
    try {
      const response = await api.post(url, null);
      const { is_desliked } = response.data;
      setDislike(is_desliked);
    } catch (error) {
      console.error("Erro ao descurtir o post:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl mt-2 pb-4 pl-2 pr-4 mb-10 shadow-lg">
      <div className="flex items-center p-4 gap-4">
        <img
          className="w-11 h-11 rounded-full object-cover"
          src={
            userPublicationOwner?.profile_image
              ? userPublicationOwner?.profile_image
              : userImage
          }
          alt="user"
        />
        <div>
          <h1
            className="cursor-pointer hover:text-gray-500"
            onClick={handleProfile}
          >
            {userPublicationOwner?.nickname}
          </h1>
          <h1 className="text-gray-400 text-sm">
            Crítica de
            <span
              className="cursor-pointer hover:text-gray-500 ml-1 transition duration-300"
              onClick={handleMovie}
            >
              {moviePublication?.title}
            </span>
          </h1>
        </div>
      </div>
      <div className="ml-5 pr-8 w-full max-h-40 overflow-y-auto">
        <p className="overflow-wrap break-word text-justify">{pubText}</p>
      </div>

      <div className="ml-5 mt-2 mb-2">
        <Rate value={rating} disabled />
      </div>

      <div className="text-sm ml-5 mt-4 flex items-center gap-8">
        <div
          className="flex items-center gap-2 hover:text-gray-500 cursor-pointer"
          onClick={handleLike}
        >
          <LikeStyled like={like} size={18} />
          <h1>Curtir</h1>
        </div>

        <div
          className="flex items-center gap-2 hover:text-gray-500 cursor-pointer"
          onClick={handleDeslike}
        >
          <DeslikeStyled dislike={dislike} size={18} />
          <h1>Descurtir</h1>
        </div>

        <div className="flex items-center gap-2 hover:text-gray-500 cursor-pointer">
          <BiCommentDetail size={17} />
          <h1>Comentários</h1>
        </div>
      </div>
    </div>
  );
};

export default Publication;
