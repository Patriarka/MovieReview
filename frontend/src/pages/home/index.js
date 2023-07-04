import React, { useEffect, useState } from "react";

import Header from "../../components/header";

// import Trending from "../../components/Trending";

import { HomeOutlined, UserOutlined, LogoutOutlined, StarOutlined, EyeOutlined } from "@ant-design/icons";

import CreatePublication from "../../components/CreatePublication";

import Publication from "../../components/Publication";

import { StyledMenuItem, StyledMenu } from '../../styles/pages/HomeStyles';

import api from "../../api";

import { Link } from "react-router-dom";

import { Layout } from "antd";

const { Sider } = Layout;

const Home = () => {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await api.get(`feed/?page=1`);
        setPublications(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPublications();
  }, []);

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Layout
            style={{ minHeight: "100vh", backgroundColor: "transparent" }}
          >
            <Sider width={"90%"} style={{ backgroundColor: "transparent" }}>
              <StyledMenu
                mode="inline"
                defaultSelectedKeys={["1"]}
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
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <CreatePublication />
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

        <div className="w-1/4 hidden sm:block">{/* <Trending /> */}</div>
      </div>
    </div>
  );
};

export default Home;
