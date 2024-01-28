import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchProductsAsync } from "../Redux/slices/AdsSlice";
import { AppDispatch } from "../Redux/store";
import { Card, Skeleton } from "antd";
import "tailwindcss/tailwind.css";
import Chart from "chart.js/auto";
import AdsTable from "../components/AdsTable";

const AdsDashboard: React.FC = () => {
  const Ads = useSelector((state: any) => state.AllAds.Ads);
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);

  const ads = Ads || [];
  const totalAdsCount = ads.length;
  const approvedAdsCount = ads.filter((ad: any) => ad.isapproved).length;
  const pendingAdsCount = ads.filter((ad: any) => !ad.isapproved).length;
  const declinedAdsCount = ads.filter((ad: any) => !ad.isActive).length;
  const closedAdsCount = ads.filter((ad: any) => !ad.isactive).length;

  const [, setfilteredAds] = useState(ads);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(FetchProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    setfilteredAds(ads);
  }, [ads]);

  const totalPercentage = (totalAdsCount / ads?.length) * 100;
  const approvedPercentage = (approvedAdsCount / ads?.length) * 100;
  const pendingPercentage = (pendingAdsCount / ads?.length) * 100;
  const closedPercentage = (closedAdsCount / ads?.length) * 100;
  const declinedPercentage = (declinedAdsCount / ads?.length) * 100;

  useEffect(() => {
    const ctx = document.getElementById("barChart") as HTMLCanvasElement;

    if (ctx) {
      // Clear the existing canvas
      const context = ctx.getContext("2d");

      if (context) {
        context.clearRect(0, 0, ctx.width, ctx.height);
      }

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Total", "Approved", "Pending", "Closed", "Declined"],
          datasets: [
            {
              label: "Ads Overview",
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(255, 205, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
              data: [
                totalPercentage,
                approvedPercentage,
                pendingPercentage,
                closedPercentage,
                declinedPercentage,
              ],
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
              position: "bottom",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [
    totalPercentage,
    approvedPercentage,
    pendingPercentage,
    closedPercentage,
    declinedPercentage,
  ]);

  return (
    <div className=" flex flex-col gap-10">
      <div className=" ">
        <Card className="w-full lg:w-1/3">
          <Skeleton loading={isLoading} active>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-sm text-gray-500 line-clamp-1">
                  Total Ads: {totalAdsCount}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  Approved Ads: {approvedAdsCount}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  Pending Ads: {pendingAdsCount}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  Closed Ads: {closedAdsCount}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  Declined Ads: {declinedAdsCount}
                </p>
              </div>
              <div
                style={{ position: "relative", width: "100%", height: "400px" }}
              >
                {isLoading ? (
                  <p>Loading...</p>
                ) : ads.length > 0 ? (
                  <canvas
                    id="barChart"
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                    }}
                  ></canvas>
                ) : (
                  <p>No data available for the chart.</p>
                )}
              </div>
            </div>
          </Skeleton>
        </Card>
      </div>

      <Card>
        <Skeleton loading={isLoading} active>
          <AdsTable Ads={Ads.slice(0, 5)} />
        </Skeleton>
      </Card>
    </div>
  );
};

export default AdsDashboard;
