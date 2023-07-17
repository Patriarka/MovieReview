import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Menu from "../../components/menu";

import { useSelector } from "react-redux";

import api from "../../api";

import { Link } from "react-router-dom";

import Publication from "../../components/Publication";

import { StyledButton } from "../../styles/pages/ProfileStyles";

const Profile = () => {
  const userId = useSelector((state) => state.userId);

  const [reachedEnd, setReachedEnd] = useState(false);

  const [user, setUser] = useState({});
  const [page, setPage] = useState(1);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/usuarios/${userId}/`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchUserPublicationsData = async () => {
      try {
        const response = await api.get(`/pubusuario/${userId}/?page=${page}`);
        setPublications((prevPublications) => [
          ...prevPublications,
          ...response.data.results,
        ]);
        if (response.data.results.length === 0) {
          setReachedEnd(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPublicationsData();
  }, [userId, page]);

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

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"2"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <div className="flex gap-2 mt-8">
            <img
              className="w-40 h-50 rounded-full"
              src={user?.profile_image}
              alt={user?.id}
            />
            <div className="w-full mt-4 flex flex-col">
              <h2 className="text-lg font-bold">{user?.nickname}</h2>
              <Link to="/edit-profile" className="hover:text-blue-500">
                <p>Editar Perfil</p>
              </Link>
              <p className="my-2 text-sm font-light">{user?.bio_text}</p>

              <div className="text-black-50 flex gap-4 justify-end text-sm pr-4 mt-auto">
                <div className="flex-col cursor-pointer border-r-2 border-black-30 pr-4 hover:text-[#d30069]">
                  <h2 className="text-center text-black-50">
                    {user.following_count}
                  </h2>
                  <h3>Seguindo</h3>
                </div>
                <div className="flex-col cursor-pointer border-r-2 border-black-30 pr-4 hover:text-[#d30069]">
                  <h2 className="text-center text-black-50">
                    {user.followers_count}
                  </h2>
                  <h3>Seguidores</h3>
                </div>
                <div className="flex-col cursor-pointer hover:text-[#d30069]">
                  <h2 className="text-center text-black-50">
                    {user.publications_count}
                  </h2>
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

export default Profile;
