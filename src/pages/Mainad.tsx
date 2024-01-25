import { useParams } from "react-router-dom";
import { fetchSingleMainAd } from "../Redux/slices/action.ads";
import Sidebar from "../components/constants/Sidebar";
import { useEffect } from "react";

const MainAdPage = () => {
  const { id } = useParams();
  const getAd = async () => {
    const response = await fetchSingleMainAd(id);
    console.log(response.data);
  };
  useEffect(() => {
    getAd();
  }, []);
  return (
    <div className="flex pt-20">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-5 mx-auto"></div>
    </div>
  );
};

export default MainAdPage;
