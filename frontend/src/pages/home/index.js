import React from "react";

import Header from "../../components/header";

const Home = () => {
  return (
    <div className="container mx-auto max-w-[1580px]">
      <Header />

      <div className="mx-auto flex">
        <div className="w-1/4"></div>

        {/* Design do componente de publication, fazer a seção do meio sem cor mesmo. Utilizar mais espaçamento da header para telas pequenas. Arrumar a pesquisa para filmes */}
        <div className="w-1/2 bg-white rounded-xl m-8 shadow-lg">
        </div>

        <div className="w-1/4"></div>
      </div>
    </div>
  );
};

export default Home;
