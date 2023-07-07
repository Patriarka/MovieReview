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
    <div className="mx-auto mt-10 ml-4 flex-col items-center justify-center">
      {/* <h2 className="text-lg font-bold">Super Críticos</h2> */}

     
    </div>
  );
};

export default Trending;

// {superReviewers.length > 0 &&
//   superReviewers.slice(0, 5).map((superReviewer, index) => {
//     return (
//       <div className="flex">
//         {/* <img
//           className="image-user"
//           alt="user"
//           src={superReviewer?.profile_image}
//         /> */}
//         <Link
//           to={`/user/${superReviewer.id}`}
//           style={{ textDecoration: "none" }}
//         >
//           <p>{superReviewer.nickname}</p>
//         </Link> 
//       </div>
//     );
//   })}