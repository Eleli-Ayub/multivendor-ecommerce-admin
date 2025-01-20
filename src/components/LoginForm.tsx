import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoggingUser } from "../Redux/slices/AuthSlice";
import { AppDispatch } from "../Redux/store";
import Loader from "./constants/loader";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TiLockClosed } from "react-icons/ti";
import { FaUser } from "react-icons/fa";

const LoginForm: React.FC = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  // const isLoading = useSelector((state: any) => state.auth.isLoading);
  const { isLoading } = useSelector((state: any) => ({ ...state.auth }));
  // const token = useSelector((state: any) => state.auth.userToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(LoggingUser(formData));

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="h-screen mx-auto p-10 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-400 light w-screen">
        <div
          className="lg:w-2/6 h-5/6 w-full bg-transparent  p-10"
          style={{ margin: "auto" }}
        >
          <div className="flex flex-col justify-self-center text-center">
            <FaUser className="text-8xl bg-indigo-700 pt-4 rounded-full text-white ml-8" />

            <h1 className="text-center pt-4 text-slate-50 text-3xl font-bold">
              Admin Login
            </h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto p-4 bg-transparent  mt-4"
          >
            <div className="mb-8 relative  bg-transparent">
              <MdEmail className="absolute text-white md:text-4xl text-1xl inset-y-0 md:mt-1 mt-3 ml-2 cursor-pointer" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 bg-transparent autofill:shadow-autofill-transparent border-b-2 text-slate-50 placeholder:text-slate-50 focus:ring-0 md:pl-14 pl-8 md:text-3xl text-1xl focus:outline-none focus:border-primary-orange h-12 autofill:bg-transparent autofill:text-slate-50"
              />
            </div>
            <div className="mb-8 relative  bg-transparent">
              <TiLockClosed className="absolute text-white md:text-4xl text-1xl inset-y-0 md:mt-1 mt-3 ml-2 cursor-pointer" />

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-transparent autofill:shadow-autofill-transparent border-b-2 text-slate-50 placeholder:text-slate-50 focus:ring-0 md:pl-14 pl-8 md:text-3xl text-1xl focus:outline-none focus:border-primary-orange h-12 autofill:bg-transparent autofill:text-slate-50"
                placeholder={`Password `}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute mt-3 right-4 md:text-2xl  text-1xl text-slate-50"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-purple-700  shadow-5xl text-white py-2 px-4 rounded-xl hover:bg-purple-500 text-2xl transition duration-300 w-full"
            >
              Login
            </button>

            {/* <p className="text-gray-500 text-center mt-3">
                            Forgot Password?
                            <a href="/login" className="ml-2 text-blue-500">
                                Reset Password
                            </a>{' '}
                        </p>
                        <p className="text-gray-500 text-center mt-3">
                            You do not have an account?
                            <a href="/register" className="ml-2 text-blue-500">
                                Sign Up
                            </a>{' '}
                        </p> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
