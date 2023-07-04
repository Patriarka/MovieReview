import React, { useEffect, useState } from "react";
import "./styles.css";

import api from "../../api";

import { Link } from "react-router-dom";

const Trending = () => {
  const [superReviewers, setSuperReviewers] = useState([]);

  useEffect(() => {
    async function fetchSuperReviewers() {
      try {
        const response = await api.get("/supercriticos/?page=1");
        setSuperReviewers(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchSuperReviewers();
  }, []);

  return (
    <div className="w-80 mx-auto p-8 rounded-xl mt-10 pl-4 pr-4">
      {superReviewers.length > 0 &&
        superReviewers.slice(0, 5).map((superReviewer, index) => {
          return (
            <div className="flex">
              {/* <img
                className="image-user"
                alt="user"
                src={superReviewer?.profile_image}
              />*/}
              <Link
                to={`/user/${superReviewer.id}`}
                style={{ textDecoration: "none" }}
              >
                <p>{superReviewer.nickname}</p>
              </Link> 
            </div>
          );
        })}
    </div>
  );
};

export default Trending;
