import {
  Cancel,
  CheckOutlined,
  LibraryAdd,
  Pending,
} from "@mui/icons-material";
import AdsTable from "./AdsTable";
import { useSelector, useDispatch } from "react-redux";
import { FetchProductsAsync } from "../Redux/slices/AdsSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../Redux/store";
import Loader from "./constants/loader";
import { Card } from "antd";

const Ads = () => {
  const Ads = useSelector((state: any) => state.AllAds.Ads);
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);
  const ads = Ads;
  const totalAdsCount = ads;
  const approvedAdsCount = ads?.filter((ad: any) => ad.isapproved);
  const pendingAdsCount = ads?.filter((ad: any) => !ad.isapproved);
  const declinedAdsCount = ads?.filter((ad: any) => !ad.isActive);
  const closedAdsCount = ads?.filter((ad: any) => !ad.isactive);

  const [filteredAds, setfilteredAds] = useState(Ads);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(FetchProductsAsync());
  }, []);

  useEffect(() => {
    setfilteredAds(totalAdsCount);
  }, [totalAdsCount]);

  const totalPercentage = (totalAdsCount?.length / ads.length) * 100;
  const approvedPercentage = (approvedAdsCount?.length / ads.length) * 100;
  const pendingPercentage = (pendingAdsCount?.length / ads.length) * 100;
  const closedPercentage = (closedAdsCount?.length / ads.length) * 100;
  const declinedPercentage = (declinedAdsCount?.length / ads.length) * 100;

  return (
    <div className="flex flex-col mx-auto p-3 flex-wrap  x-overflow-scroll w-full">
      {isLoading && <Loader />}
      <div className="flex gap-4 flex-wrap lg:flex-nowrap">
        {/* for the bars */}
        <Card className="w-full lg:w-[60%] h-auto rounded-[20px] shadow-sm ">
          <h1 className="text-2xl font-semibold text-center">Ad's Stats</h1>

          <div className="flex flex-col mx-auto gap-6 max-w-xl px-5y pb-5 mt-5">
            <div>
              <span className="text-black">Total</span>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                  <div
                    className="bg-primary-orange h-full rounded-sm"
                    style={{ width: `${totalPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-black">Approved</span>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                  <div
                    className="bg-green-500 h-full rounded-sm"
                    style={{ width: `${approvedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-black">Pending</span>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                  <div
                    className="bg-orange-400  h-full rounded-sm"
                    style={{ width: `${pendingPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-black">Declined</span>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                  <div
                    className="bg-red-600  h-full rounded-sm"
                    style={{ width: `${declinedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-black">Closed</span>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                  <div
                    className=" bg-green-800 h-full rounded-sm"
                    style={{ width: `${closedPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="rounded-[20px] shadow-sm bg-white">
          <div className="flex gap-5 flex-wrap items-center justify-center lg:justify-normal ">
            {/* Total Ads */}
            <div
              className="p-4 rounded h-[100px] w-[220px]  shadow-custom flex items-center justify-between bg-primary-orange text-white cursor-pointer"
              onClick={() => {
                setfilteredAds(totalAdsCount);
              }}
            >
              <LibraryAdd className="text-white" />
              <div>
                <h1 className="text-2xl font-semibold text-white">
                  {totalAdsCount?.length}
                </h1>
                <p className="text-sm">Total Ads</p>
              </div>
            </div>

            {/* Approved Ads */}
            <div
              className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-500 cursor-pointer"
              onClick={() => {
                setfilteredAds(approvedAdsCount);
              }}
            >
              <CheckOutlined className="text-whites" />
              <div>
                <h1 className="text-2xl font-semibold ">
                  {approvedAdsCount?.length}
                </h1>
                <p className="text-sm">Approved Ads</p>
              </div>
            </div>

            {/* Pending Ads */}
            <div
              className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-orange-400 cursor-pointer"
              onClick={() => {
                setfilteredAds(pendingAdsCount);
              }}
            >
              <Pending />
              <div>
                {" "}
                <h1 className="text-2xl font-semibold ">
                  {pendingAdsCount?.length}
                </h1>
                <p className="text-sm">Pending Ads</p>
              </div>
            </div>

            {/* Declined Ads */}
            <div
              className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-red-600 cursor-pointer"
              onClick={() => {
                setfilteredAds(declinedAdsCount);
              }}
            >
              <Cancel />
              <div>
                <h1 className="text-2xl font-semibold ">
                  {declinedAdsCount?.length}
                </h1>
                <p className="text-sm">Declined Ads</p>
              </div>
            </div>

            {/* Closed Ads */}
            <div
              className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-800 cursor-pointer"
              onClick={() => {
                setfilteredAds(closedAdsCount);
              }}
            >
              <h1 className="text-2xl font-semibold ">
                {closedAdsCount?.length}
              </h1>
              <p className="text-sm">Closed Ads</p>
            </div>
          </div>
        </Card>
      </div>
      {/* second placeholder */}
      <div>
        <div>
          {/* <h1>filters</h1> */}
          {/* List of ads goes here */}
        </div>
        <div>
          <AdsTable Ads={filteredAds} />
        </div>
      </div>
      {/* end of second placeholder */}
    </div>
  );
};

export default Ads;
