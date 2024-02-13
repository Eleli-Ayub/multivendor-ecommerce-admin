import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Links } from '../../Data/links';
import close from '../../assets/close.png';
import menu from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import { IconButton, MenuItem, Typography, FormControl, Select, InputBase } from '@mui/material';
import { MessageRounded, NotificationsActive } from '@mui/icons-material';
import { adminProps } from '../../interface/common';

type LoginFormProps = {
    SetShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
    SetShowAdsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar: React.FC<LoginFormProps> = () => {
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState<adminProps | null>(null);
    // console.log(user);

    const adminDataString = localStorage.getItem('admin');

    useEffect(() => {
        if (adminDataString !== null) {
            setUser(JSON.parse(adminDataString));
        } else {
            console.error('Admin data not found in localStorage');
        }
    }, [user, adminDataString]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`$
       w-full px-5 flex items-center fixed  shadow-custom top-0 z-20 ${
           scrolled ? 'bg-white' : 'bg-white'
       }`}
            style={{ marginBottom: '2px' }}
        >
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setActive('');
                        window.scrollTo(0, 0);
                    }}
                >
                    <img src={logo} alt="logo" className=" logo object-contain" />
                </Link>

                <ul className="list-none hidden sm:flex flex-row gap-10">
                    <div>
                        {/* <button
                            className="bg-primary-orange text-black  p-1  capitalize rounded px-4 hover:bg-secondary-orange} text-white"
                            // onClick={() => SetShowAdsForm(true)}
                        >
                            sell
                        </button> */}
                    </div>
                    {Links.map((nav) => (
                        <li
                            key={nav.name}
                            className={`${
                                active === nav.name ? 'text-black' : 'text-black'
                            } capitalize hover:text-primary-orange text-[18px] font-medium cursor-pointer`}
                            onClick={() => setActive(nav.name)}
                        >
                            <Link to={nav.url}>{nav.name}</Link>
                        </li>
                    ))}
                    {user ? (
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4   md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
                            <li>
                                <Link
                                    to="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    <IconButton
                                        style={{
                                            color: '#DC5F00',
                                            backgroundColor: '#eee',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => navigate('/messages')}
                                    >
                                        <MessageRounded />
                                    </IconButton>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                >
                                    <IconButton
                                        style={{
                                            color: '#DC5F00',
                                            backgroundColor: '#eee',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => navigate('/notifications')}
                                    >
                                        <NotificationsActive />
                                    </IconButton>
                                </Link>
                            </li>

                            <FormControl>
                                <Select
                                    value={`${user.adminname}`}
                                    sx={{
                                        backgroundColor: '#eee',
                                        width: '150px',
                                        borderRadius: '0.25rem',
                                        p: '0.25rem 1rem',
                                        '& .MuiSvgIcon-root': {
                                            pr: '0.25rem',
                                            width: '3rem',
                                        },
                                        '& .MuiSelect-select:focus': {
                                            backgroundColor: '#eee',
                                        },
                                    }}
                                    input={<InputBase />}
                                >
                                    <MenuItem
                                        value={`${user.adminname}`}
                                        onClick={() => {
                                            navigate('/');
                                        }}
                                    >
                                        <Typography>{`${user.adminname}`}</Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            setUser(null);
                                            localStorage.removeItem('adminToken');
                                            localStorage.removeItem('admin');
                                            navigate('/login');
                                        }}
                                    >
                                        Logout
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </ul>
                    ) : (
                        <div>
                            <button
                                className="bg-primary-orange text-white p-1 rounded px-4 hover:bg-secondary-orange}"
                                onClick={() => navigate('/login')}
                            >
                                Signin
                            </button>
                        </div>
                    )}
                </ul>

                <div className="sm:hidden flex flex-1 justify-end items-center">
                    <IconButton
                        style={{
                            color: '#991b1b',
                            backgroundColor: '#eee',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src={toggle ? close : menu}
                            alt="menu"
                            className="w-[24px] h-[24px] object-contain"
                            onClick={() => setToggle(!toggle)}
                        />
                    </IconButton>

                    <div
                        className={`${
                            !toggle ? 'hidden' : 'flex'
                        } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[300px] z-10 rounded-xl`}
                    >
                        <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
                            {Links.map((nav) => (
                                <li
                                    key={nav.name}
                                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                                        active === nav.name ? 'text-white' : 'text-secondary'
                                    }`}
                                    onClick={() => {
                                        setToggle(!toggle);
                                        setActive(nav.name);
                                    }}
                                >
                                    <Link to={nav.name}>{nav.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
