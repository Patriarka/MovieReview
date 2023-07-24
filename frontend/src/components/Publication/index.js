import React, { useState, useEffect } from "react";

import userImage from "../../assets/user-default.png";

import { BiCommentDetail } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import api from "../../api";

import { Rate, Modal } from "antd";

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

  const [modalVisible, setModalVisible] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);

  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommentsData = async () => {
      const url = `/comentarios/${idPost}/?page=${commentsPage}`;
      const response = await api.get(url);
      setComments((prevComments) => [
        ...prevComments,
        ...response.data.results,
      ]);
    };

    fetchCommentsData();
  }, [idPost, commentsPage]);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
        const response = await api.get(`/is_desliked/${idPost}/`);
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

  const handleCreateComment = async () => {
    const data = {
      comment_text: newComment,
    };

    const url = `/comentarios/${idPost}/`;

    try {
      const response = await api.post(url, data);
      
      setComments((prevComments) => [
        response.data.comment,
        ...prevComments,
      ])
    } catch (error) {
      console.log(error);
    } finally {
      setNewComment("");
    }
  };

  console.log(comments);

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

        <div
          className="flex items-center gap-2 hover:text-gray-500 cursor-pointer"
          onClick={handleOpenModal}
        >
          <BiCommentDetail size={17} />
          <h1>Comentários</h1>
        </div>
      </div>

      {modalVisible && (
        <Modal
          title={`Publicação de ${userPublicationOwner?.nickname}`}
          open={modalVisible}
          onCancel={handleCloseModal}
          footer={[<div></div>]}
        >
          <div className="max-h-[500px]">
            <div className="w-full max-h-[460px] overflow-y-auto overflow-x-hidden">
              <div className="flex items-center ml-2 pt-4 pb-4 gap-4">
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
              <div className="ml-2 w-full max-h-40 overflow-y-auto pr-2 mr-4">
                <p className="overflow-wrap break-word text-justify">
                  {pubText}
                </p>
              </div>

              <div className="ml-2 mt-2 mb-2">
                <Rate value={rating} disabled />
              </div>

              <div className="text-sm ml-2 mt-4 flex items-center gap-8">
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

              <div className="m-4 pt-4">
                {comments.map((comment) => (
                  <div className="flex gap-2">
                    <img
                      className="w-[32px] h-[38px] rounded-xl"
                      src="https://img.r7.com/images/2014/06/09/5ktvr6so5o_4g94bvv6r6_file.jpg"
                      alt="paodoce"
                    />
                    <div className="flex gap-2 max-w-max bg-gray-100 rounded-xl mb-2 p-2">
                      <div className="flex-col">
                        <h1 className="cursor-pointer text-xs text-black font-bold hover:text-gray-500">
                          José da Silva
                        </h1>
                        <p>{comment.comment_text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* {comments?.length > 0 && (
                  <p
                    className="cursor-pointer"
                    onClick={() => setCommentsPage((prevPage) => prevPage + 1)}
                  >
                    Ver mais
                  </p>
                )} */}
              </div>
            </div>

            <div className="pt-4 flex justify-between border-t-2">
              <input
                type="text"
                placeholder="Comente..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border-none rounded-xl text-black p-2 w-full bg-gray-100"
              />
              <button
                onClick={handleCreateComment}
                className="ml-4 px-4 py-2 bg-[#e90074] text-white rounded"
              >
                Comentar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Publication;
