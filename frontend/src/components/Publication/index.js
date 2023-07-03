import React, { useState, useRef } from "react";

import { Input, Modal, Select } from "antd";

import debounce from 'lodash/debounce';

import axios from "axios";

import {
  StyledInput,
  StyledPublicationButton,
} from "../../styles/components/PublicationStyle.js";

const { TextArea } = Input;

const Publication = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
  };

  const handleConfirm = () => {
    // fazer a lógica de enviar a req de publicação
    handleCloseModal();
  };

  return (
    <div className="w-full rounded-xl p-8">
      <div className="flex items-center">
        <img
          className="w-14 h-14 rounded-full object-cover"
          src={
            "https://www.cnnbrasil.com.br/wp-content/uploads/2021/06/21995_47022457A67E1FF5.jpg"
          }
          alt="user"
        />
        <div className="w-full pl-6">
          <StyledInput
            placeholder="Escreva sua Crítica"
            onFocus={handleOpenModal}
            readOnly
          />
          <Modal
            title="Criar Crítica"
            open={modalVisible}
            onCancel={handleCloseModal}
            onOk={handleConfirm}
            footer={[
              <div className="pt-4">
                {/* Seleção de nota */}
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
                <div
                  className="bg-white border-2 rounded-xl p-2 flex items-center shadow-lg text-black"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                    alt={selectedMovie.title}
                    style={{ borderRadius: 8, width: 40, marginRight: 16 }}
                  />
                  <h3>{selectedMovie.title}</h3>
                </div>
              )}
            </div>
            {/* Seleção de Imagem */}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Publication;
