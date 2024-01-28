import Sidebar from "../components/constants/Sidebar";
// import Ads from "../components/Ads";
import { useEffect } from "react";
import AdsDashboard from "../dashboard/ads";
import UsersDashboard from "../dashboard/users";

const admin = localStorage.getItem("admin");

const DashboardPage = () => {
  useEffect(() => {}, [admin]);
  return (
    <div className="flex pt-20  bg-gray-200 ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 lg:p-5 p-[4px] mx-auto my-body  bg-gray-200">
        <AdsDashboard />
        {/* <UsersDashboard /> */}
      </div>
    </div>
  );
};

export default DashboardPage;
