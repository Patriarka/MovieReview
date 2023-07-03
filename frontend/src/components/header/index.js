import React, { useState } from "react";

import { StyledInput, StyledSelect } from "../../styles/pages/HomeStyles.js";

import {
  SearchOutlined,
  VideoCameraOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/logotype.png";

const Header = () => {
  const navigate = useNavigate();

  const [searchOption, setSearchOption] = useState("movies");

  const handleSearch = async (value) => {
    switch (searchOption) {
      case "users":
        navigate(`/search?user=${value}`);
        break;
      case "movies":
        navigate(`/search?movie=${value}`);
        break;
      default:
        break;
    }
  };

  return (
    <header className="bg-white w-full shadow-md">
      <div className="max-w-[1280px] flex items-center justify-between">
        <Link to="/">
          <img className="cursor-pointer max-w-[56px]" src={logo} alt="logo" />
        </Link>
        
        <div className="max-w-[420px] m-0">
          <StyledInput.Group compact>
            <StyledInput
              prefix={<SearchOutlined />}
              placeholder={
                searchOption === "movies"
                  ? "Pesquisar Filmes"
                  : "Pesquisar Usuários"
              }
              onPressEnter={(e) => handleSearch(e.target.value)}
            />
            <StyledSelect
              defaultValue="movies"
              className="max-w-[120px]"
              onChange={(value) => setSearchOption(value)}
            >
              <StyledSelect.Option value="movies">
                <div className="flex items-center justify-start m-0">
                  <VideoCameraOutlined className="mr-1" /> Filmes
                </div>
              </StyledSelect.Option>
              <StyledSelect.Option value="users">
                <div className="flex items-center justify-start m-0">
                  <UserOutlined className="mr-1" /> Usuários
                </div>
              </StyledSelect.Option>
            </StyledSelect>
          </StyledInput.Group>
        </div>
      </div>
    </header>
  );
};

export default Header;