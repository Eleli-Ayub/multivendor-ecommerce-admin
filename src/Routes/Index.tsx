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
import { Login } from '@mui/icons-material';

const Index = () => {
    const [loggedin, setLoggedin] = useState(false);
    useEffect(() => {
        const auth = localStorage.getItem('userToken');
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
            <div className="">
                <Routes>
                    <Route path="/" element={loggedin ? <Ads /> : <Login />} />
                    <Route path="/users" element={loggedin ? <Users /> : <Login />} />
                    <Route path="/categories" element={loggedin ? <Categories /> : <Login />} />
                    <Route path="/new-category" element={loggedin ? <NewCategory /> : <Login />} />
                    <Route
                        path="/new-subcategory"
                        element={loggedin ? <NewSubcategory /> : <Login />}
                    />
                    <Route path="/details/:id" element={loggedin ? <AdDetail /> : <Login />} />
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
