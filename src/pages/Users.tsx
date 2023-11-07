// import React from "react";
import Sidebar from "../components/constants/Sidebar";
import AllUsers from "../components/Users";

const Users = () => {
  return (
    <div className="flex pt-20">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-5 mx-auto">
        <AllUsers />
      </div>
    </div>
  );
};

export default Users;
