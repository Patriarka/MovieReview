import React, { useEffect, useState } from "react";

import Header from "../../components/header";

// import Trending from "../../components/Trending";

import CreatePublication from "../../components/CreatePublication";

import Publication from "../../components/Publication";

import Menu from "../../components/menu";

import api from "../../api";

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

        <div className="w-1/4 hidden sm:block">
        </div>
      </div>
    </div>
  );
};

export default Home;
