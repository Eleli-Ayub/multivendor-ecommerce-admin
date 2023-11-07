import { Routes, Route } from "react-router-dom";
import Navbar from "../components/constants/navbar";

import Ads from "../pages/Ads";
import Footer from "../components/constants/footer";
import Users from "../pages/Users";
import Categories from "../pages/Categories";
import NewSubcategory from "../pages/NewSubcategory";
import NewCategory from "../pages/NewCategory";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "../pages/404";
import AdDetail from "../pages/AdDetail";
import Register from "../pages/Register";

import LoginPage from "../pages/Loginpage";

const Index = () => {
  return (
    <div>
      <Navbar
        SetShowLogin={function (): void {
          throw new Error("Function not implemented.");
        }}
        SetShowAdsForm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="">
        <Routes>
          <Route path="/" element={<Ads />} />
          <Route path="/users" element={<Users />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/new-category" element={<NewCategory />} />
          <Route path="/new-subcategory" element={<NewSubcategory />} />
          <Route path="/details/:id" element={<AdDetail />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" />
      <Footer />
    </div>
  );
};

export default Index;
