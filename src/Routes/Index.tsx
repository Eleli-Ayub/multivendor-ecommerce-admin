import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/constants/navbar';

import Ads from '../pages/Ads';
import Footer from '../components/constants/footer';
import Users from '../pages/Users';
import Categories from '../pages/Categories';
import NewSubcategory from '../pages/NewSubcategory';
import NewCategory from '../pages/NewCategory';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from '../pages/404';
import AdDetail from '../pages/AdDetail';
import Register from '../pages/Register';

import LoginPage from '../pages/Loginpage';

import { useEffect, useState } from 'react';
import SingleUser from '../pages/SingleUser';

const Index = () => {
    const [loggedin, setLoggedin] = useState(false);
    useEffect(() => {
        const auth = localStorage.getItem('loggedIn');
        if (auth == '' || auth == null || auth == undefined) {
            setLoggedin(false);
        } else {
            setLoggedin(true);
        }
    }, []);

    return (
        <div>
            <Navbar
                SetShowLogin={function (): void {
                    throw new Error('Function not implemented.');
                }}
                SetShowAdsForm={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
            <div className="id" id="root">
                <Routes>
                    <Route path="/" element={<Ads />} />
                    <Route path="/users" element={loggedin ? <Users /> : <LoginPage />} />
                    <Route path="/categories" element={loggedin ? <Categories /> : <LoginPage />} />
                    <Route
                        path="/new-category"
                        element={loggedin ? <NewCategory /> : <LoginPage />}
                    />
                    <Route
                        path="/new-subcategory"
                        element={loggedin ? <NewSubcategory /> : <LoginPage />}
                    />
                    <Route path="/details/:id" element={loggedin ? <AdDetail /> : <LoginPage />} />
                    <Route path="/users/:id" element={loggedin ? <SingleUser /> : <LoginPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
            <ToastContainer position="top-center" />

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Index;
