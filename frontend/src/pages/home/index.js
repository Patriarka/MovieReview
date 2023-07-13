import React, { useEffect, useState, useRef } from "react";

import Header from "../../components/header";

import CreatePublication from "../../components/CreatePublication";

import Publication from "../../components/Publication";

import Menu from "../../components/menu";

import api from "../../api";

const Home = () => {
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await api.get(`/feed/?page=${page}`);
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

    fetchPublications();
  }, [page]);

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
      const windowBottom = windowHeight + window.scrollY;;

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
          <Menu selectedOption={"1"} />
        </div>

        <div className="w-full sm:w-1/2 p-2">
          <CreatePublication setPublications={setPublications} />
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

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Home;
