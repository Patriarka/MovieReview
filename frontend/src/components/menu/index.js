import React from "react";

import { HomeOutlined, UserOutlined, LogoutOutlined, StarOutlined, EyeOutlined } from "@ant-design/icons";

import { StyledMenuItem, StyledMenu } from '../../styles/pages/HomeStyles';

import { Layout } from "antd";

import { Link } from "react-router-dom";

const { Sider } = Layout;

const Menu = ({ selectedOption }) => {

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
                  <Link to="/watchlist">Watchlist</Link>
                </StyledMenuItem>
                <StyledMenuItem key="4" icon={<StarOutlined />}>
                  <Link to="/favoritos">Favoritos</Link>
                </StyledMenuItem>
                <StyledMenuItem key="5" icon={<LogoutOutlined />}>
                  <Link to="">Sair</Link>
                </StyledMenuItem>
              </StyledMenu>
            </Sider>
          </Layout>
    )
}

export default Menu;