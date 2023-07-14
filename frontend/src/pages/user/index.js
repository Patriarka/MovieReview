import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import Header from "../../components/header";
import Menu from "../../components/menu";
import Publication from "../../components/Publication";

import { StyledButton } from "../../styles/pages/UserStyles";

import api from "../../api";

const User = () => {
  const currentUserId = useSelector((state) => state.userId);

  const [reachedEnd, setReachedEnd] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState({});
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/usuarios/${id}/`);
        setUser(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchUserPublicationsData = async () => {
      const response = await api.get(`/pubusuario/${id}/?page=${page}`);
      setPublications((prevPublications) => [
        ...prevPublications,
        ...response.data.results,
      ]);
      if (response.data.results.length === 0) {
        setReachedEnd(true);
      }
    };

    fetchUserPublicationsData();
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

  const unfollow = async () => {
    try {
      const url = `/usuarios/${user.id}/unfollow/`;
      await api.post(url, null);

      setUser((prevState) => ({
        ...prevState,
        is_followed: false,
      }));

    } catch (error) {
      console.log(error);
    }
  }

  const follow = async () => {
    try {
      const url = `/usuarios/${user.id}/follow/`;
      await api.post(url, null);

      setUser((prevState) => ({
        ...prevState,
        is_followed: true,
      }));

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"1"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <div className="flex gap-2 mt-8 max-h-[160px]">
            <img
              className="w-40 h-50 rounded-full object-cover"
              src={user?.profile_image}
              alt={user?.id}
            />
            <div className="mt-4 w-full flex flex-col">
              <h2 className="text-lg font-bold">{user?.nickname}</h2>
              <p className="my-2 text-sm font-light">{user?.bio_text}</p>

              {currentUserId != user.id && (
                <div className="mt-2">
                  {user.is_followed ? (
                    <StyledButton
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={unfollow}
                      isFollowed
                    >
                      {isHovered ? "Deixar de Seguir" : "Seguindo"}
                    </StyledButton>
                  ) : (
                    <StyledButton onClick={follow}>Seguir</StyledButton>
                  )}
                </div>
              )}

              <div className="text-black-50 flex gap-4 pr-4 justify-end text-sm mt-auto">
                <div className="flex-col cursor-pointer border-r-2 border-black-30 pr-4 hover:text-[#d30069]">
                  <h2 className="text-center text-black-50">{user.following_count}</h2>
                  <h3>Seguindo</h3>
                </div>
                <div className="flex-col cursor-pointer border-r-2 border-black-30 pr-4 hover:text-[#d30069]">
                  <h2 className="text-center text-black-50">{user.followers_count}</h2>
                  <h3>Seguidores</h3>
                </div>
                <div className="flex-col cursor-pointer hover:text-[#d30069]">
                  <h2 className="text-center text-black-50">{user.publications_count}</h2>
                  <h3>Publicações</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
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
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default User;
