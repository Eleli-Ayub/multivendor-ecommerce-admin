import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchProductsAsync } from "../Redux/slices/AdsSlice";
import { AppDispatch } from "../Redux/store";
import { Card, Skeleton } from "antd";
import AdsTable from "./AdsTable";
import {
  Cancel,
  CheckOutlined,
  LibraryAdd,
  Pending,
} from "@mui/icons-material";
import Loader from "./constants/loader";

const Dashboard = () => {
  const Ads = useSelector((state: any) => state.AllAds.Ads);
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);

  const ads = Ads || [];
  const totalAdsCount = ads.length;
  const approvedAdsCount = ads.filter((ad: any) => ad.isapproved).length;
  const pendingAdsCount = ads.filter((ad: any) => !ad.isapproved).length;
  const declinedAdsCount = ads.filter((ad: any) => !ad.isActive).length;
  const closedAdsCount = ads.filter((ad: any) => !ad.isactive).length;

  const [filteredAds, setfilteredAds] = useState(ads);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(FetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    setfilteredAds(ads);
  }, [ads]);

  const totalPercentage = (totalAdsCount / ads.length) * 100;
  const approvedPercentage = (approvedAdsCount / ads.length) * 100;
  const pendingPercentage = (pendingAdsCount / ads.length) * 100;
  const closedPercentage = (closedAdsCount / ads.length) * 100;
  const declinedPercentage = (declinedAdsCount / ads.length) * 100;

  return (
    <div className="flex flex-col mx-auto p-3 flex-wrap overflow-x-scroll w-full ">
      {isLoading && <Loader />}
      <div className="flex gap-4 flex-wrap lg:flex-nowrap">
        {/* Statistics Card */}
        <Card className="w-full lg:w-[60%] h-auto rounded-[20px] shadow-sm bg-[#FFFFFF]">
          <h1 className="text-2xl font-semibold text-center">Ad's Stats</h1>

          <div className="flex flex-col mx-auto gap-6 max-w-xl px-5 pb-5 mt-5">
            <Skeleton loading={isLoading} active paragraph={{ rows: 1 }}>
              <div>
                <span className="text-black">Total</span>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-sm h-[10px]">
                    <div
                      className="bg-primary-orange h-full rounded-sm"
                      style={{ width: `${totalPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Skeleton>

            <Skeleton loading={isLoading} active paragraph={{ rows: 1 }}>
              <div>
                <span className="text-black">Approved</span>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-sm h-[10px]">
                    <div
                      className="bg-green-500 h-full rounded-sm"
                      style={{ width: `${approvedPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Skeleton>

            <Skeleton loading={isLoading} active paragraph={{ rows: 1 }}>
              <div>
                <span className="text-black">Pending</span>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-sm h-[10px]">
                    <div
                      className="bg-orange-400  h-full rounded-sm"
                      style={{ width: `${pendingPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Skeleton>

            <Skeleton loading={isLoading} active paragraph={{ rows: 1 }}>
              <div>
                <span className="text-black">Declined</span>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-sm h-[10px]">
                    <div
                      className="bg-red-600  h-full rounded-sm"
                      style={{ width: `${declinedPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Skeleton>

            <Skeleton loading={isLoading} active paragraph={{ rows: 1 }}>
              <div>
                <span className="text-black">Closed</span>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-sm h-[10px]">
                    <div
                      className=" bg-green-800 h-full rounded-sm"
                      style={{ width: `${closedPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>
        </Card>

        {/* Charts Card */}
        <Card className="rounded-[20px] shadow-sm bg-white">
          <div className="flex gap-5 flex-wrap items-center justify-center lg:justify-normal ">
            {/* Total Ads */}
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }}>
              <div
                className="p-4 rounded h-[100px] w-[220px]  shadow-custom flex items-center justify-between bg-primary-orange text-white cursor-pointer"
                onClick={() => {
                  setfilteredAds(ads);
                }}
              >
                <LibraryAdd className="text-white" />
                <div>
                  <h1 className="text-2xl font-semibold text-white">
                    {totalAdsCount}
                  </h1>
                  <p className="text-sm">Total Ads</p>
                </div>
              </div>
            </Skeleton>

            {/* Approved Ads */}
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }}>
              <div
                className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-500 cursor-pointer"
                onClick={() => {
                  setfilteredAds(approvedAdsCount);
                }}
              >
                <CheckOutlined className="text-whites" />
                <div>
                  <h1 className="text-2xl font-semibold ">
                    {approvedAdsCount}
                  </h1>
                  <p className="text-sm">Approved Ads</p>
                </div>
              </div>
            </Skeleton>

            {/* Pending Ads */}
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }}>
              <div
                className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-orange-400 cursor-pointer"
                onClick={() => {
                  setfilteredAds(pendingAdsCount);
                }}
              >
                <Pending />
                <div>
                  {" "}
                  <h1 className="text-2xl font-semibold ">{pendingAdsCount}</h1>
                  <p className="text-sm">Pending Ads</p>
                </div>
              </div>
            </Skeleton>

            {/* Declined Ads */}
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }}>
              <div
                className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-red-600 cursor-pointer"
                onClick={() => {
                  setfilteredAds(declinedAdsCount);
                }}
              >
                <Cancel />
                <div>
                  <h1 className="text-2xl font-semibold ">
                    {declinedAdsCount}
                  </h1>
                  <p className="text-sm">Declined Ads</p>
                </div>
              </div>
            </Skeleton>

            {/* Closed Ads */}
            <Skeleton loading={isLoading} active paragraph={{ rows: 2 }}>
              <div
                className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-800 cursor-pointer"
                onClick={() => {
                  setfilteredAds(closedAdsCount);
                }}
              >
                <h1 className="text-2xl font-semibold ">{closedAdsCount}</h1>
                <p className="text-sm">Closed Ads</p>
              </div>
            </Skeleton>
          </div>
        </Card>
      </div>

      {/* Ads Table */}
      <div className="mt-4">
        <Skeleton loading={isLoading} active>
          <AdsTable Ads={filteredAds} />
        </Skeleton>
      </div>
    </div>
  );
};

export default Dashboard;
