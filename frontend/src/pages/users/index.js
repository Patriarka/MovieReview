import React, { useEffect, useState } from "react";

import Header from "../../components/header";
import Menu from "../../components/menu";

import { useParams, Link } from "react-router-dom";

import api from "../../api";

import Pagination from "../../components/pagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const { search } = useParams() || "";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `/usuarios/search/?nickname=${search}&page=${currentPage}`;
        const response = await api.get(url);
        setUsers(response.data.results.results);
        setTotalPages(response.data.results.num_paginas);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [currentPage, search]);

  const handlePageChange = (event, currentPageNumber) => {
    event.preventDefault();
    setCurrentPage(currentPageNumber);
  };

  return (
    <div>
      <div className="container mx-auto max-w-[1580px]">
        <Header searchOptionAlreadyDefined={"users"} />

        <div className="mx-auto flex">
          <div className="w-1/4 hidden sm:block mt-10">
            <Menu />
          </div>

          <div className="w-full sm:w-1/2 p-2">
            {users.length > 0 ? (
              <div>
                <h2 className="text-lg font-bold mt-8 mb-8">
                  Resultados da busca por "{search}"
                </h2>

                <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                  {users.map((userData) => (
                    <Link
                      to={`/user/${userData.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li
                        key={userData.id}
                        className="w-full cursor-pointer bg-white rounded-xl mt-2 p-0 mb-4 shadow-lg h-[80px] hover:bg-gray-100 flex items-center gap-4"
                      >
                        <img
                          className="w-20 h-30 p-2 rounded-xl object-cover"
                          src={userData?.profile_image}
                          alt={userData.nickname}
                        />
                        <div className="flex items-center gap-1">
                          <h2 className="overflow-wrap break-word text-justify">{userData.nickname}</h2>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>

                <Pagination
                  totalPages={totalPages > 5 ? 5 : totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            ) : (
              <h2 className="text-lg font-bold mt-8 mb-8">
                Não foram encontrados resultados por "{search}"
              </h2>
            )}
          </div>
        </div>

        <div className="w-1/4 hidden sm:block"></div>
      </div>
    </div>
  );
};

export default Users;
