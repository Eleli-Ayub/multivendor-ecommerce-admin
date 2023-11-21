import React, { useState } from 'react';
import Logo from '../assets/logo.jpeg';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RegisteringUser } from '../Redux/slices/AuthSlice';
import { AppDispatch } from '../Redux/store';
import Loader from './constants/loader';

const RegisterForm: React.FC = ({}) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const isLoading = useSelector((state: any) => state.auth.isLoading);
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState({
        adminname: '',
        email: '',
        cell: '',
        role: 'admin',
        adminimage: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            let concatenatedImages = '';
            for (const file of files) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64Data = e.target!.result as string;
                    concatenatedImages += base64Data;
                };
                reader.readAsDataURL(file);
            }
            setFormData({ ...formData, adminimage: concatenatedImages });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate first name, middle name, and last name to ensure they don't contain numbers
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(formData.adminname)) {
            toast.error('First name cannot contain numbers.');
            return;
        }

        // Password validation: at least 8 characters, one special character, and one capital letter
        const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            toast.error(
                'Password must be at least 8 characters long, contain at least one special character, and have at least one capital letter.'
            );
            return;
        }

        // Check if password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }

        dispatch(RegisteringUser(formData));
        navigate('/login');

        setFormData({
            adminname: '',
            email: '',
            cell: '',
            adminimage: '',
            role: '',
            password: '',
            confirmPassword: '',
        });
    };

    if (isLoading) {
        // return <Loader />;
    }

    return (
        <>
            <div className="h-screen mx-auto p-10 bg-gray-light w-screen overflow-auto">
                <div
                    className="lg:w-2/6 h-auto w-full bg-white rounded-2xl p-10 shadow-2xl "
                    style={{ margin: 'auto' }}
                >
                    <div className="flex items-center justify-center gap-3">
                        <img src={Logo} alt="logo" className="h-24 object-cover " />
                    </div>
                    <p className="text-center">Create An Admin</p>

                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto p-4 border rounded-lg shadow-lg mt-4"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="adminname"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Admin Name:
                            </label>
                            <input
                                type="text"
                                id="adminname"
                                name="adminname"
                                value={formData.adminname}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                placeholder="Enter your First Name"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                placeholder="Enter your Email Address"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="cell"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                cell Number:
                            </label>
                            <input
                                type="number"
                                id="cell"
                                name="cell"
                                value={formData.cell}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                placeholder="Enter your cell Number"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="adminimage"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                User Image:
                            </label>
                            <input
                                type="file"
                                id="adminimage"
                                name="adminimage"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {formData.adminimage && (
                                <img
                                    src={formData.adminimage}
                                    alt="User Preview"
                                    className="h-16 w-16 mt-2"
                                />
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-bold mb-2 relative"
                            >
                                Password:
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                    placeholder={`Enter password `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-4"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </label>
                            <p className="text-sm text-gray-500 px-2">
                                The password must be at least 8 characters long{' '}
                            </p>
                            <p className="text-sm text-gray-500 px-2">
                                Must contain a symbol, a number, and an Uppercase Letter
                            </p>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 text-sm font-bold mb-2 relative"
                            >
                                Confirm Password:
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                    placeholder={`confirm your password `}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-4"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </label>
                        </div>
                        <button
                            onClick={() => {
                                setShowPassword(false);
                                // handleSubmit(event); // Call the handleSubmit function
                                console.log('Submit button clicked');
                            }}
                            type="submit"
                            className="bg-primary-orange text-white py-2 px-4 rounded-xl hover:bg-secondary-orange transition duration-300 w-full"
                        >
                            Submit
                        </button>
                        <p className="text-gray-500 text-center mt-3">
                            Already have an account?
                            <a href="/login" className="ml-2 text-blue-500">
                                Sign in
                            </a>{' '}
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
