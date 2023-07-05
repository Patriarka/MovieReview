import React, { useEffect, useState } from "react";
import Menu from "../../components/menu";

import Header from "../../components/header";

import api from "../../api";

import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await api.get(`/usuarios/${idUser}/`);
        // setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="container mx-auto max-w-[1580px]">
        <Header />

        <div className="mx-auto flex">
          <div className="w-1/4 hidden sm:block mt-10">
            <Menu selectedOption={"2"} />
          </div>

          <div className="w-full sm:w-1/2 p-2">
            
          </div>

          <div className="w-1/4 hidden sm:block"></div>
        </div>
      </div>
    </>
  );
};

export default Profile;
