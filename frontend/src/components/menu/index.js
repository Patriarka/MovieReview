import React from "react";

import { HomeOutlined, UserOutlined, LogoutOutlined, StarOutlined, EyeOutlined } from "@ant-design/icons";

import { StyledMenuItem, StyledMenu } from '../../styles/pages/HomeStyles';

import { useDispatch } from "react-redux";

import { Layout } from "antd";

import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../authActions.js";

import { useSelector } from "react-redux";

const { Sider } = Layout;

const Menu = ({ selectedOption }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.userId);

  const handleLogout = async () => {
    let refresh = localStorage.getItem("refreshTokenUser");
  
    refresh = refresh.substring(1, refresh.length - 1);
  
    const body = {
      refresh: refresh,
    };
  
    try {
      await dispatch(logout(body));
        localStorage.setItem("tokenUser", "");
        localStorage.setItem("refreshTokenUser", "");
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    };

    return(
        <Layout
            style={{ minHeight: "100vh", backgroundColor: "transparent" }}
          >
            <Sider width={"90%"} style={{ backgroundColor: "transparent" }}>
              <StyledMenu
                mode="inline"
                defaultSelectedKeys={selectedOption}
              >
                <StyledMenuItem key="1" icon={<HomeOutlined />}>
                  <Link to="/">Início</Link>
                </StyledMenuItem>
                <StyledMenuItem key="2" icon={<UserOutlined />}>
                  <Link to="/profile">Perfil</Link>
                </StyledMenuItem>
                <StyledMenuItem key="3" icon={<EyeOutlined />}>
                  <Link to={`/watchlist/${userId}`}>Watchlist</Link>
                </StyledMenuItem>
                <StyledMenuItem key="4" icon={<StarOutlined />}>
                  <Link to={`/favoritos/${userId}`}>Favoritos</Link>
                </StyledMenuItem>
                <StyledMenuItem key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
                  <Link to="">Sair</Link>
                </StyledMenuItem>
              </StyledMenu>
            </Sider>
          </Layout>
    )
}

export default Menu;
