// import React from "react";
import Sidebar from "../components/constants/Sidebar";
import Ads from "../components/Ads";

const AdsPage = () => {
  return (
    <div className="flex pt-20">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-5 mx-auto">
        <Ads />
      </div>
    </div>
  );
};

export default AdsPage;
