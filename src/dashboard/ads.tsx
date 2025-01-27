import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchProductsAsync } from "../Redux/slices/AdsSlice";
import { AppDispatch } from "../Redux/store";
import { Card, Skeleton } from "antd";
import "tailwindcss/tailwind.css";
import AdsTable from "../components/AdsTable";
import { ApexOptions } from "apexcharts";
import { Box, Stack, Typography } from "@mui/material";
import { ArrowCircleUpRounded } from "@mui/icons-material";
import ReactApexChart from "react-apexcharts";
import UsersDashboard from "../dashboard/users.tsx";

const AdsDashboard: React.FC = () => {
  const Ads = useSelector((state: any) => state.AllAds.Ads);
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);

  const ads = Ads || [];
  const totalAdsCount = ads?.length;
  const approvedAdsCount = ads?.filter((ad: any) => ad.isapproved)?.length;
  const pendingAdsCount = ads?.filter((ad: any) => !ad.isapproved)?.length;
  const activeAdsCount = ads?.filter((ad: any) => ad.isactive)?.length;
  const deactivatedAdsCount = ads?.filter((ad: any) => !ad.isactive)?.length;
  const closedAdsCount = ads?.filter((ad: any) => !ad.isactive)?.length;

  const percentageTotalAds = Math.round((totalAdsCount / totalAdsCount) * 100);
  const percentageApprovedAds = Math.round(
    (approvedAdsCount / totalAdsCount) * 100,
  );
  const percentagePendingAds = Math.round(
    (pendingAdsCount / totalAdsCount) * 100,
  );
  const percentageActiveAds = Math.round(
    (activeAdsCount / totalAdsCount) * 100,
  );
  const percentageDeactivatedAds = Math.round(
    (deactivatedAdsCount / totalAdsCount) * 100,
  );
  const percentageClosedAds = Math.round(
    (closedAdsCount / totalAdsCount) * 100,
  );

  const [, setFilteredAds] = useState(ads);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(FetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    setFilteredAds(ads);
  }, [ads]);

  const TotalRevenueSeries = [
    {
      data: [
        percentageTotalAds,
        percentageApprovedAds,
        percentagePendingAds,
        percentageActiveAds,
        percentageDeactivatedAds,
        percentageClosedAds,
      ],
    },
  ];

  const TotalRevenueOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: true,
      },
    },
    colors: ["green"],
    plotOptions: {},
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "#FFFFFF",
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    stroke: {
      colors: ["#0000FF"],
      width: 2,
    },
    xaxis: {
      title: {
        text: "Categories",
        style: {
          color: "#000000",
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      categories: ["Approved", "Pending", "Closed", "Active", "Deactivated"],
      labels: {
        style: {
          colors: "#000000",
          fontSize: "16px",
        },
      },
    },
    axisborder: {
      show: true,
      color: ["#000000"],
    },
    yaxis: {
      title: {
        text: "Ads %",
        style: {
          color: "#000000",
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      labels: {
        style: {
          colors: "#000000",
          fontSize: "16px",
        },
      },
      min: 0,
      max: 100,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      y: {
        formatter(val: number) {
          return ` ${val}%`;
        },
      },
    },
  };

  return (
    <div className="flex flex-col mx-auto px-3 md:w-full w-screen bg-slate-700 roundend-lg overflow-auto gap-10">
      <div className="flex gap-6 flex-wrap lg:flex-nowrap">
        <Card className="md:w-full w-screen lg:w-1/2 h-[520px] bg-slate-300">
          <Skeleton loading={isLoading} active>
            <div className="w-full h-full p-2">
              <div>
                <h1 className="text-3xl text-red-500 font-bold">
                  Welcome Back !
                </h1>
                <Box
                  p={2}
                  flex={1}
                  id="chart"
                  display={"flex"}
                  flexDirection="column"
                  borderRadius={"20px"}
                  bgcolor="dark-gray"
                >
                  <Typography
                    fontWeight={800}
                    color="green"
                    align="center"
                    fontSize="28px"
                  >
                    Ads overview
                  </Typography>
                  <Stack my={"20px"} direction="row" gap={2} flexWrap="wrap">
                    <Typography fontWeight={700} fontSize="32px" color="green">
                      {totalAdsCount}
                    </Typography>
                    <Stack direction={"row"} alignItems="center" gap={1}>
                      <ArrowCircleUpRounded
                        sx={{
                          fontSize: 25,
                          color: "green",
                        }}
                      />
                      <Stack></Stack>
                    </Stack>
                  </Stack>
                  <ReactApexChart
                    series={TotalRevenueSeries}
                    type="line"
                    height="300px"
                    options={TotalRevenueOptions}
                  />
                </Box>
              </div>
            </div>
          </Skeleton>
        </Card>
        <UsersDashboard />
      </div>

      <div className="flex gap-6 flex-wrap lg:flex-nowrap">
        <Card className="bg-slate-300 w-full lg:w-1/2 h-[500px] overflow-y-auto scrollbar">
          <h1 className="text-2xl mb-2 mt-2 text-green-700 capitalize font-semibold text-center">
            Recent ads
          </h1>
          <Skeleton loading={isLoading} active>
            <AdsTable Ads={Ads.slice(0, 3)} />
          </Skeleton>
        </Card>
        <Card className="w-full lg:w-1/2 h-[500px] overflow-y-auto bg-slate-300 scrollbar ">
          <h1 className="capitalize font-semibold text-2xl mb-2 text-green-700 text-center">
            Recent Premium Ads
          </h1>
          <Skeleton loading={isLoading} active>
            <div className="w-full flex flex-col gap-6 p-[2px]">
              {ads.map((ad: any) => (
                <div className="bg-slate-200  w-full h-[130px] rounded-[8px] flex items-center gap-8 ">
                  <img
                    src={ad?.mainimage}
                    alt=""
                    className="w-fit h-[100%] object-cover object-back  rounded-[8px] border border-blue-500"
                  />
                  <p className="md:text-md md:text-center text-sm font-semibold line-clamp-2 mr-2">
                    {ad?.productname}
                  </p>
                </div>
              ))}
            </div>
          </Skeleton>
        </Card>
      </div>
    </div>
  );
};

export default AdsDashboard;
