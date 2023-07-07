import React, { useState, useEffect, useRef } from "react";
import './styles.css'
import Menu from '../../components/menu'
import api from "../../api";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header'
import HeaderDesktop from "../../components/headerDesktop";
import SuperCritico from '../../components/SuperCritico'
import ViewPublication from "../../components/ViewPublication";
import axios from 'axios';
import CardFollower from "../../components/CardFollower";

import { MdArrowBack } from 'react-icons/md';

import { useSelector } from 'react-redux';

import { Link } from "react-router-dom";


const Profile = () => {

    const userId = useSelector(state => state.userId);

    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [user, setUser] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const isFirstPageRef = useRef(false);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const navigate = useNavigate();

    useEffect(() => {
        async function userUtility() {
            await api.get(`/usuarios/${userId}/`)
                .then(response => { setUser(response.data) })

            const followersResponse = await api.get(`/usuarios/followers/`);

            const followingResponse = await api.get(`/usuarios/following/`);

            setFollowers(followersResponse.data);
            setFollowing(followingResponse.data);
        }

        userUtility()
    }, [userId])

    async function goEditProfile() {
        navigate("/edit-profile")
    }

    const fetchProfilePost = async () => {
        if (page === 1) {
            isFirstPageRef.current = true;
        }

        const response = await api.get(`pubusuario/${userId}/?page=${page}`);
        setPublications((prevPublications) => [
            ...prevPublications,
            ...response.data.results,
        ]);
    };

    useEffect(() => {
        if (isFirstPageRef.current === false || page !== 1) {
            fetchProfilePost();
        }
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

    return (
        <>
            {(window.innerWidth > 760) ?
                <HeaderDesktop />
                :

                <Header />
            }
            <div className="content-all">

                {windowSize.width < 680
                    ?
                    (
                        <Menu />
                    )
                    :
                    <div className="left-content">
                        <Menu />
                    </div>}
                <div className="content-box-profile">
                    <div className="profile-info">
                        <img
                            className="image-user"
                            alt="user"
                            src={user.profile_image ? user.profile_image : "https://i.imgur.com/piVx6dg.png"}
                            style={{ objectFit: "cover" }}
                        />
                        <div>
                            <p className="name-user">{user.full_name}</p>
                            <p className="username-text">@{user.nickname}</p>
                            {user.super_reviewer ? <SuperCritico /> : null}
                            <p className="bio-text">{user.bio_text}</p>
                            <p className="edit-profile" onClick={goEditProfile}>Editar Perfil</p>
                        </div>
                    </div>

                    <div className={'tabs-profile'}>
                        <Link
                            to={{
                                pathname: `/followers/${userId}`,
                            }}
                            state={{
                                prevPath: '/profile'
                            }}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            <p className={'tab-profile'}>{followers.length} Seguidores</p>
                        </Link>
                        <Link
                            to={{
                                pathname: `/following/${userId}`,
                            }}
                            state={{
                                prevPath: '/profile'
                            }}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            <p className={'tab-profile'}>{following.length} Seguindo</p>
                        </Link>
                        <Link
                            to={`/favoritos`}
                            state={{
                                prevPath: '/profile'
                            }}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            <p className={'tab-profile'}>Favoritos</p>
                        </Link>
                        <Link
                            to={`/watchlist/${userId}/`}
                            state={{
                                prevPath: '/profile'
                            }}
                            style={{ textDecoration: "none", color: "#fff" }}
                        >
                            <p className={'tab-profile'}>Assistir no futuro</p>
                        </Link>
                    </div>
                    {publications.length > 0 && (publications.map((publication, index) => (
                        <ViewPublication
                            key={index}
                            userID={publication.user_id}
                            idPost={publication?.id}
                            idMovie={publication.movie_id}
                            rating={publication.review}
                            critic={publication.pub_text}
                            image={publication?.imgur_link}
                            date={publication.date}
                            myPub={(publication.user_id === parseInt(userId)) ? true : false}
                            id={publication.id}
                        />
                    )))}
                </div>
                <div className="right-content">

                </div>
            </div>
        </>
    )
}

export default Profile;
