// import React from "react";
import Sidebar from "../components/constants/Sidebar";
import CategoryForm from "../components/categoryForm";

const Users = () => {
  return (
    <div className="flex pt-20">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-5 mx-auto">
        <CategoryForm />
      </div>
    </div>
  );
};

export default Users;
