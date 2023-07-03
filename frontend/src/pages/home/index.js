import React, { useEffect, useState } from "react";

import Header from "../../components/header";

import CreatePublication from "../../components/CreatePublication";
import Publication from "../../components/Publication";

import api from "../../api";

const Home = () => {
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);

  const fetchFeed = async () => {
    const response = await api.get(`feed/?page=${page}`);
    setPublications((prevPublications) => [
      ...prevPublications,
      ...response.data.results,
    ]);
  };

  useEffect(() => {
    fetchFeed();
  }, [page]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block"></div>

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

        <div className="w-1/4 hidden sm:block">

          
        </div>
      </div>
    </div>
  );
};

export default Home;
