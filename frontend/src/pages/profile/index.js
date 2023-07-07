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
      const response = await api.get(`pubusuario/${userId}/?page=${page}`);
      setPublications(response.data.results);
    };

    fetchUserPublicationsData();
  }, [userId, page]);

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"1"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <div className="flex gap-2 mt-8">
            <img
              className="w-40 h-50 rounded-xl"
              src={user?.profile_image}
              alt={user?.id}
            />
            <div className="mt-4">
              <h2 className="text-lg font-bold">{user?.nickname}</h2>

              <div className="text-base flex gap-2 text-gray-600">
                <Link>
                  <h2 className="hover:text-black">10 Seguidores</h2>
                </Link>
                <Link>
                  <h2 className="hover:text-black">10 Seguindo</h2>
                </Link>
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
