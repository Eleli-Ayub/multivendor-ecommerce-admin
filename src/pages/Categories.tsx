// import React from "react";
import Sidebar from "../components/constants/Sidebar";
import Categories from "../components/Categories";

const CategoriesPage = () => {
  return (
    <div className="flex pt-20">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-5 mx-auto">
        <Categories />
      </div>
    </div>
  );
};

export default CategoriesPage;
