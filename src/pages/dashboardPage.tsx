import Sidebar from "../components/constants/Sidebar";
// import Ads from "../components/Ads";
import { useEffect } from "react";
import AdsDashboard from "../dashboard/ads";

const admin = localStorage.getItem("admin");

const DashboardPage = () => {
  useEffect(() => {}, [admin]);
  return (
    <div className="flex pt-20  bg-slate-600 ">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 lg:p-5 p-[4px] mx-auto my-body  bg-slate-700">
        <AdsDashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
