// import React from "react";
import Sidebar from '../components/constants/Sidebar';
import Ads from '../components/Ads';
// import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdsPage = () => {
    // const { isLoggedIn } = useSelector((state: any) => ({ ...state.auth }));
    const navigate = useNavigate();

    const loggedIn = localStorage.getItem('loggedIn');

    useEffect(() => {
        console.log('is the user logged in? ' + loggedIn);
        if (loggedIn === null) {
            navigate('/login');
        }
    }, [loggedIn]);
    return (
        <div className="flex pt-20">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1 p-5 mx-auto">
                <Ads />
            </div>
        </div>
    );
};

export default AdsPage;
