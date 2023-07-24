import React, { useEffect, useState, useRef } from "react";

import { Input, Modal, Select, message, Upload } from "antd";

import { InboxOutlined } from "@ant-design/icons";

import debounce from "lodash/debounce";

import axios from "axios";

import api from "../../api.js";

import userImage from "../../assets/user-default.png";

import {
  StyledInput,
  StyledPublicationButton,
  StyledRate,
} from "../../styles/components/CreatePublicationStyle.js";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";

const { TextArea } = Input;

const { Dragger } = Upload;

const CreatePublication = ({ setPublications }) => {
  const userId = useSelector((state) => state.userId);

  const [user, setUser] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`usuarios/${userId}/`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userId]);

  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (info) => {
  //   const { status, originFileObj } = info.file;
  //   if (status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === "done") {
  //     message.success(`${info.file.name} Arquivo carregado com sucesso.`);
  //     setSelectedFile(originFileObj);
  //   } else if (status === "error") {
  //     message.error(`${info.file.name} Falha no carregamento do arquivo.`);
  //   }
  // };

  // const props = {
  //   onChange: handleFileChange,
  // };

  const debouncedSearch = useRef(
    debounce(async (value) => {
      if (value.length > 0) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${value}&language=pt-BR`
        );
        const results = response.data.results;
        setMovies(results);
      } else {
        setMovies([]);
      }
    }, 300)
  ).current;

  const handleClear = () => {
    setSelectedMovie(null);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setInputValue("");
    setSelectedMovie(null);
    setMovies([]);
    setRating(0);
  };

  const handleConfirm = async () => {
    let id = localStorage.getItem("idUser");
    id = id.substring(1, id.length - 1);

    const data = {
      review: rating,
      pub_text: inputValue,
      user_id: parseInt(id),
      movie_id: selectedMovie.id,
      movie_title: selectedMovie.original_title,
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
        setPublications((prevPublications) => [response.data, ...prevPublications]);
        handleCloseModal();
      })
      .catch((error) => {
        toast.error("Erro ao publicar. Por favor, tente novamente.");
      });
  };

  return (
    <div className="w-full p-8 bg-white rounded-xl mt-8 pl-4 pr-4 mb-12 shadow-lg">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={
            user?.profile_image
              ? user?.profile_image
              : userImage
          }
          alt="user"
        />
        <div className="w-full pl-4">
          <StyledInput
            placeholder="Escreva sua Crítica"
            onClick={handleOpenModal}
            readOnly
          />
          <Modal
            title="Criar Crítica"
            open={modalVisible}
            onCancel={handleCloseModal}
            footer={[
              <div className="pt-4 flex justify-between">
                <StyledRate
                  value={rating}
                  onChange={(value) => setRating(value)}
                />

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
              <Select
                allowClear
                showSearch
                onClear={handleClear}
                onSearch={debouncedSearch}
                onSelect={(value, option) => {
                  const [id, title] = value.split("-");
                  setSelectedMovie({ id, title, ...option.data });
                }}
                value={selectedMovie?.title}
                className="w-full mt-2 mb-2"
                placeholder="Digite o nome de um filme"
              >
                {movies.map((movie) => (
                  <Select.Option
                    key={movie.id}
                    value={`${movie.id}-${movie.title}`}
                    data={movie}
                  >
                    {movie.title}
                  </Select.Option>
                ))}
              </Select>

              {selectedMovie && (
                <div className="bg-white border-2 rounded-xl p-2 mb-4 flex items-center shadow-lg text-black">
                  <img
                    src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    className="rounded-lg w-12 mr-2"
                  />
                  <h3>{selectedMovie.title}</h3>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CreatePublication;
