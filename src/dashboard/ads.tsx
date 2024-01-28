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

const AdsDashboard: React.FC = () => {
  const Ads = useSelector((state: any) => state.AllAds.Ads);
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);

  const ads = Ads || [];
  const totalAdsCount = ads.length;
  const approvedAdsCount = ads.filter((ad: any) => ad.isapproved).length;
  const pendingAdsCount = ads.filter((ad: any) => !ad.isapproved).length;
  const activeAdsCount = ads.filter((ad: any) => ad.isactive).length;
  const deactivatedAdsCount = ads.filter((ad: any) => !ad.isactive).length;
  const closedAdsCount = ads.filter((ad: any) => !ad.isactive).length;

  const percentageTotalAds = Math.round((totalAdsCount / totalAdsCount) * 100);
  const percentageApprovedAds = Math.round(
    (approvedAdsCount / totalAdsCount) * 100
  );
  const percentagePendingAds = Math.round(
    (pendingAdsCount / totalAdsCount) * 100
  );
  const percentageActiveAds = Math.round(
    (activeAdsCount / totalAdsCount) * 100
  );
  const percentageDeactivatedAds = Math.round(
    (deactivatedAdsCount / totalAdsCount) * 100
  );
  const percentageClosedAds = Math.round(
    (closedAdsCount / totalAdsCount) * 100
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
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#475BE8", "#CFC8FF"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    stroke: {
      colors: ["transparent"],
      width: 4,
    },
    xaxis: {
      categories: [
        "total",
        "Approved",
        "Pending",
        "closed",
        "active",
        "deactivated",
      ],
    },
    yaxis: {
      title: {
        text: "Ads Percentage",
      },
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
    <div className="flex flex-col mx-auto px-3 w-full overflow-auto gap-10">
      <div className="">
        <Card className="w-full lg:w-1/2">
          <Skeleton loading={isLoading} active>
            <div className="w-full">
              <div>
                <Box
                  p={2}
                  flex={1}
                  id="chart"
                  display={"flex"}
                  flexDirection="column"
                  borderRadius={"15px"}
                  bgcolor="#fcfcfc"
                >
                  <Typography fontWeight={400} color="#11142">
                    Total Ads
                  </Typography>
                  <Stack my={"20px"} direction="row" gap={4} flexWrap="wrap">
                    <Typography fontWeight={700} fontSize="28px" color="#222">
                      {totalAdsCount}
                    </Typography>
                    <Stack direction={"row"} alignItems="center" gap={1}>
                      <ArrowCircleUpRounded
                        sx={{
                          fontSize: 25,
                          color: "#4754be8",
                        }}
                      />
                      <Stack></Stack>
                    </Stack>
                  </Stack>
                  <ReactApexChart
                    series={TotalRevenueSeries}
                    type="bar"
                    height="200px"
                    options={TotalRevenueOptions}
                  />
                </Box>
              </div>
            </div>
          </Skeleton>
        </Card>
      </div>

      <Card className="w-full lg:w-1/2">
        <h1 className="capitalize font-semibold text-center">Recent ads</h1>
        <Skeleton loading={isLoading} active>
          <AdsTable Ads={Ads.slice(0, 3)} />
        </Skeleton>
      </Card>
    </div>
  );
};

export default AdsDashboard;
