import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/constants/Sidebar";
import { fetchSingleMainAd } from "../Redux/slices/action.ads";

interface MainAd {
  adimage: string;
  adname: string;
  adcategory: string;
  // Add other properties as needed
}

const MainAdPage: React.FC = () => {
  const [ad, setAd] = useState<MainAd | undefined>();
  const { id } = useParams();

  const getAd = async () => {
    try {
      const response = await fetchSingleMainAd(id);
      const data: MainAd = response.data.Data;
      setAd(data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching ad:", error);
    }
  };

  useEffect(() => {
    getAd();
  }, [id]);

  if (!ad) {
    // Consider adding a loading indicator here if needed
    return <div>Loading...</div>;
  }

  return (
    <div className="flex pt-20">
      <div>
        <Sidebar />
      </div>
      <div className="flex-1 p-5 mx-auto">
        <div>
          <div className="flex flex-col">
            <div className="bg-gray-200 h-[300px] w-full lg:w-[600px] rounded-[8px]">
              <img
                src={`data:image/png;base64,${ad.adimage}`}
                alt="img"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <h1>Name: {ad.adname}</h1>
            <h1>Category: {ad.adcategory}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAdPage;
