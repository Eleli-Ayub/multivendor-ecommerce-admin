import Sidebar from "../components/constants/Sidebar";
import Ads from "../components/Ads";
import { useEffect } from "react";
const admin = localStorage.getItem("admin");

const AdsPage = () => {
  useEffect(() => {}, [admin]);
  return (
    <div className="flex pt-20 bg-gray-200">
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
