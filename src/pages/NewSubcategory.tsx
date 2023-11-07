// import React from "react";
import Sidebar from "../components/constants/Sidebar";
import SubcategoryForm from "../components/subcategoriesForm";

const NewSubcategory = () => {
  return (
    <div className="flex pt-20">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-5 mx-auto">
        <SubcategoryForm />
      </div>
    </div>
  );
};

export default NewSubcategory;
