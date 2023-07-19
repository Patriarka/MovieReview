import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Menu from "../../components/menu";

import api from "../../api";

import { useParams, Link } from "react-router-dom";

import { StyledButton } from "../../styles/pages/FollowersStyles";

const Followers = () => {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [followerHoverStates, setFollowerHoverStates] = useState({});

  useEffect(() => {
    const fetchFollowersData = async () => {
      try {
        const url = `/followers/${id}/?page=${page}`;
        const response = await api.get(url);
        setFollowers((prevFollowers) => [
          ...prevFollowers,
          ...response.data.results,
        ]);
        if (response.data.results.length === 0) {
          setReachedEnd(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowersData();
  }, [id, page]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `/usuarios/${id}/`;
        const response = await api.get(url);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);

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

  const unfollow = async (id) => {
    try {
      const url = `/usuarios/${id}/unfollow/`;
      await api.post(url, null);

      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.id === id ? { ...follower, is_followed: false } : follower
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const follow = async (id) => {
    try {
      const url = `/usuarios/${id}/follow/`;
      await api.post(url, null);

      setFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.id === id ? { ...follower, is_followed: true } : follower
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block mt-10">
          <Menu selectedOption={"2"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <h2 className="text-lg font-bold mt-8 mb-8">
            Seguidores de {user?.nickname}
          </h2>
          {followers.map((userData) => (
            <li
              key={userData.id}
              className="w-full cursor-pointer bg-white rounded-xl mt-2 p-0 mb-4 shadow-lg h-[80px] hover:bg-gray-100 flex items-center gap-2"
            >
              <div className="flex">
                <img
                  className="w-20 h-30 p-2 rounded-xl object-cover"
                  src={userData?.profile_image}
                  alt={userData.nickname}
                />
                <div className="flex items-center gap-1">
                  <Link
                    to={`/user/${userData.id}`}
                    style={{ textDecoration: "none" }}
                    className="flex"
                  >
                    <h2 className="overflow-wrap break-word text-justify hover:underline">
                      {userData.nickname}
                    </h2>
                  </Link>
                </div>
              </div>

              {userData.is_followed ? (
                <StyledButton
                  onMouseEnter={() =>
                    setFollowerHoverStates((prevStates) => ({
                      ...prevStates,
                      [userData.id]: true,
                    }))
                  }
                  onMouseLeave={() =>
                    setFollowerHoverStates((prevStates) => ({
                      ...prevStates,
                      [userData.id]: false,
                    }))
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    unfollow(userData.id);
                  }}
                  isFollowed
                >
                  {followerHoverStates[userData.id]
                    ? "Deixar de Seguir"
                    : "Seguindo"}
                </StyledButton>
              ) : (
                <StyledButton onClick={() => follow(userData.id)}>
                  Seguir
                </StyledButton>
              )}
            </li>
          ))}
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Followers;
