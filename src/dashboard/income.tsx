import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { getAllUsers } from "../Redux/slices/AuthSlice";
import { Card, Skeleton, Table, TableColumnsType } from "antd";
import { Bar } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

interface User {
  packagetype: "basic" | "standard" | "premium";
  createdAt: string; // Assuming createdAt is a valid date string
  isapproved: boolean;
  // Add other properties as needed
}

interface SubscriptionCost {
  basic: number;
  standard: number;
  premium: number;
  [key: string]: number; // Index signature allowing any string key
}

const UsersDashboard: React.FC = () => {
  const users = useSelector((state: any) => state.auth.users);
  const siteUsers = users;
  const [filterdUsers, setfilterdUsers] = useState(users);

  const allUsers = siteUsers;
  const approvedUsers = siteUsers?.filter((user: any) => user.isapproved);
  const pendingUsers = siteUsers?.filter((user: any) => !user.isapproved);
  const basicPlanUsers = siteUsers?.filter(
    (user: any) => user.packagetype === "basic"
  );
  const standardPlanUsers = siteUsers?.filter(
    (user: any) => user.packagetype === "standard"
  );
  const premiumPlanUsers = siteUsers?.filter(
    (user: any) => user.packagetype === "premium"
  );

  const dispatch = useDispatch<AppDispatch>();

  const totalPercentage = (allUsers?.length / users?.length) * 100;
  const approvedPercentage = (approvedUsers?.length / users?.length) * 100;
  const pendingPercentage = (pendingUsers?.length / users?.length) * 100;
  const basicPercentage = (basicPlanUsers?.length / users?.length) * 100;
  const standardPercentage = (standardPlanUsers?.length / users?.length) * 100;
  const premiumPercentage = (premiumPlanUsers?.length / users?.length) * 100;

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    setfilterdUsers(allUsers);
  }, [allUsers]);

  // Extracting income data based on subscription type and registration month
  const incomeData = siteUsers.map((user: User) => {
    const subscriptionCost: SubscriptionCost = {
      basic: 0,
      standard: 3000,
      premium: 7000,
    };

    const month = new Date(user.createdAt).getMonth(); // Assuming createdAt is a valid date field

    return {
      subscriptionType: user.packagetype,
      month,
      income: subscriptionCost[user.packagetype],
    };
  });

  const incomeGraphData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: Object.keys(incomeData[0]).map((subscriptionType) => ({
      label:
        subscriptionType.charAt(0).toUpperCase() + subscriptionType.slice(1),
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)}, 1)`,
      borderWidth: 1,
      data: incomeData
        .filter((data) => data.subscriptionType === subscriptionType)
        .map((data) => data.income),
    })),
  };

  return (
    <div>
      <Card>
        <Skeleton loading={false} active>
          {/* Your existing user statistics */}
        </Skeleton>
      </Card>

      <Card>
        <Skeleton loading={false} active>
          {/* Your existing user table */}
        </Skeleton>
      </Card>

      <Card>
        <Skeleton loading={false} active>
          <Bar data={incomeGraphData} />
        </Skeleton>
      </Card>
    </div>
  );
};

export default UsersDashboard;
