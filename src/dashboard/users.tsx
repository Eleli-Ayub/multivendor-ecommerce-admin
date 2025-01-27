import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../Redux/slices/AuthSlice";
import { AppDispatch } from "../Redux/store";
import { Card, Skeleton } from "antd";
import { Box, Stack, Typography } from "@mui/material";
import { ArrowCircleUpRounded } from "@mui/icons-material";

import { Chart } from "react-google-charts";

const UsersDashboard: React.FC = () => {
  const users = useSelector((state: any) => state.auth.users);
  const isLoading = useSelector((state: any) => state.auth.isLoading);

  const siteUsers = users || [];
  const totalUsersCount = siteUsers?.length;
  const approvedUsersCount = siteUsers.filter(
    (user: any) => user.isapproved,
  )?.length;
  const pendingUsersCount = siteUsers.filter(
    (user: any) => !user.isapproved,
  )?.length;
  const basicPlanUsersCount = siteUsers.filter(
    (user: any) => user.packagetype === "basic",
  )?.length;
  const standardPlanUsersCount = siteUsers.filter(
    (user: any) => user.packagetype === "standard",
  )?.length;
  const premiumPlanUsersCount = siteUsers.filter(
    (user: any) => user.packagetype === "premium",
  )?.length;

  const percentageTotalUsers = Math.round(
    (totalUsersCount / totalUsersCount) * 100,
  );
  const percentageApprovedUsers = Math.round(
    (approvedUsersCount / totalUsersCount) * 100,
  );
  const percentagePendingUsers = Math.round(
    (pendingUsersCount / totalUsersCount) * 100,
  );
  const percentageBasicPlanUsers = Math.round(
    (basicPlanUsersCount / totalUsersCount) * 100,
  );
  const percentageStandardPlanUsers = Math.round(
    (standardPlanUsersCount / totalUsersCount) * 100,
  );
  const percentagePremiumPlanUsers = Math.round(
    (premiumPlanUsersCount / totalUsersCount) * 100,
  );

  const [, setFilteredUsers] = useState(siteUsers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(siteUsers);
  }, [siteUsers]);

  const data = [
    ["task", "Users Overview"],
    ["approved", percentageApprovedUsers],
    ["pending", percentagePendingUsers],
    ["basic plan", 15],
    ["standard plan", 20],
    ["premium plan", 10],
  ];
  const options = {
    legend: {
      position: "bottom",
      alignment: "center",
    },
    backgroundColor: "#e2e8f0",
    chartArea: {
      backgroundColor: "93A3B2",
    },
    colors: [
      "#FF5733",
      "#FF8D1A",
      "#FFD700",
      "#34B7F1",
      "#9B59B6",
      "#2ECC71",
      "#E74C3C",
      "#F39C12",
      "#16A085",
      "#F1C40F",
    ],
  };

  return (
    <Card className="bg-slate-300 w-full h-[520px] shadow lg:w-1/2 ">
      <Skeleton loading={isLoading} active>
        <h1 className="text-2xl text-center font-bold text-green-800">
          Users Overview
        </h1>
        <Stack my={"20px"} direction="row" gap={2} flexWrap="wrap">
          <Typography fontWeight={700} fontSize="32px" color="green">
            {totalUsersCount}
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

        <Box mt="20px">
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width="100%"
            height="340px"
          />
        </Box>
      </Skeleton>
    </Card>
  );
};

export default UsersDashboard;
