import React, { useState } from "react";
import Logo from "../assets/logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoggingUser } from "../Redux/slices/AuthSlice";
import { AppDispatch } from "../Redux/store";
import Loader from "./constants/loader";

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
      <div className="h-screen mx-auto p-10 bg-gray-light w-screen">
        <div
          className="lg:w-2/6 h-5/6 w-full bg-white rounded-2xl p-10 shadow-2xl "
          style={{ margin: "auto" }}
        >
          <div className="flex items-center justify-center gap-3">
            <img src={Logo} alt="logo" className="h-24 object-cover " />
          </div>
          <p className="text-center">Eleli Admin</p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto p-4 border rounded-lg shadow-lg mt-4 price"
          >
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
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange h-12"
                placeholder="Enter your Email Address"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2 relative"
              >
                Password:
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange h-12"
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
            </div>

            <button
              type="submit"
              className="bg-primary-orange text-white py-2 px-4 rounded-xl hover:bg-secondary-orange transition duration-300 w-full"
            >
              Submit
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
