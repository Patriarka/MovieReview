import React from "react";

import Header from "../../components/header";

import Publication from "../../components/Publication";

const Home = () => {
  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4 hidden sm:block">
 
        </div>

        <div className="w-full sm:w-1/2 bg-white rounded-xl m-8 shadow-lg">
          <Publication />
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Home;
