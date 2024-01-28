import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Skeleton } from "antd";
import {
  LibraryAdd,
  CheckOutlined,
  Pending,
  Cancel,
} from "@mui/icons-material";
import AdsTable from "./AdsTable";
import { FetchProductsAsync } from "../Redux/slices/AdsSlice";
import { AppDispatch } from "../Redux/store";

const Ads = () => {
  const { Ads: ads, isLoading } = useSelector((state: any) => state.AllAds);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(FetchProductsAsync());
  }, [dispatch]);

  const [filteredAds, setFilteredAds] = useState(ads);

  useEffect(() => {
    setFilteredAds(ads);
  }, [ads]);

  const calculatePercentage = (count: any) => (count.length / ads.length) * 100;

  const stats = [
    { name: "Total", data: ads, color: "primary-orange" },
    {
      name: "Approved",
      data: ads?.filter((ad: any) => ad.isapproved),
      color: "green-500",
    },
    {
      name: "Pending",
      data: ads?.filter((ad: any) => !ad.isapproved),
      color: "orange-400",
    },
    {
      name: "Declined",
      data: ads?.filter((ad: any) => !ad.isActive),
      color: "red-600",
    },
    {
      name: "Closed",
      data: ads?.filter((ad: any) => !ad.isactive),
      color: "green-800",
    },
  ];

  return (
    <div className="flex flex-col mx-auto p-3 w-full overflow-auto">
      <Skeleton loading={isLoading} active>
        <Card className="rounded-lg shadow-sm bg-white mb-4">
          <h1 className="text-2xl font-semibold text-center">Ad's Stats</h1>
          <div className="flex flex-wrap justify-center gap-6 p-5">
            {stats.map(({ name, data, color }) => (
              <div key={name} className="w-full max-w-xs">
                <span className="text-black">{name}</span>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-sm h-[10px]">
                    <div
                      className={`bg-${color} h-full rounded-sm`}
                      style={{ width: `${calculatePercentage(data)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Skeleton>

      <Skeleton loading={isLoading} active>
        <Card className="rounded-lg shadow-sm bg-white">
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {stats.map(({ name, data, color }) => (
              <div
                key={name}
                className={`p-4 rounded shadow-custom flex items-center justify-between bg-${color} text-white cursor-pointer`}
                style={{ minWidth: "220px", height: "100px" }}
                onClick={() => setFilteredAds(data)}
              >
                {name === "Total" && <LibraryAdd />}
                {name === "Approved" && <CheckOutlined />}
                {name === "Pending" && <Pending />}
                {name === "Declined" && <Cancel />}
                <div>
                  <h1 className="text-2xl font-semibold">{data.length}</h1>
                  <p className="text-sm">{name} Ads</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Skeleton>

      <div className="mt-4">
        <Skeleton loading={isLoading} active>
          <AdsTable Ads={filteredAds} />
        </Skeleton>
      </div>
    </div>
  );
};

export default Ads;
