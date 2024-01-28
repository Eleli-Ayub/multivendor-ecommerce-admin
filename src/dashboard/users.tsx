import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/store";
import { getAllUsers } from "../Redux/slices/AuthSlice";
import { Card, Skeleton, Table, TableColumnsType } from "antd";
import { Bar } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

const UsersDashboard: React.FC = () => {
  const users = useSelector((state: any) => state.auth.users);
  const isLoading = useSelector((state: any) => state.auth.isLoading);

  const siteUsers = users || [];
  const [filteredUsers, setFilteredUsers] = useState(siteUsers);

  const approvedUsers = siteUsers.filter((user: any) => user.isapproved);
  const pendingUsers = siteUsers.filter((user: any) => !user.isapproved);
  const basicPlanUsers = siteUsers.filter(
    (user: any) => user.packagetype === "basic"
  );
  const standardPlanUsers = siteUsers.filter(
    (user: any) => user.packagetype === "standard"
  );
  const premiumPlanUsers = siteUsers.filter(
    (user: any) => user.packagetype === "premium"
  );

  const dispatch = useDispatch<AppDispatch>();

  const totalPercentage = (siteUsers?.length / users?.length) * 100;
  const approvedPercentage = (approvedUsers?.length / users?.length) * 100;
  const pendingPercentage = (pendingUsers?.length / users?.length) * 100;
  const basicPercentage = (basicPlanUsers?.length / users?.length) * 100;
  const standardPercentage = (standardPlanUsers?.length / users?.length) * 100;
  const premiumPercentage = (premiumPlanUsers?.length / users?.length) * 100;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setFilteredUsers(siteUsers);
  }, [siteUsers]);

  const chartData = {
    labels: [
      "Total",
      "Approved",
      "Pending",
      "Basic Plan",
      "Standard Plan",
      "Premium Plan",
    ],
    datasets: [
      {
        label: "Users Overview",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        data: [
          totalPercentage,
          approvedPercentage,
          pendingPercentage,
          basicPercentage,
          standardPercentage,
          premiumPercentage,
        ],
      },
    ],
  };

  const tableColumns: TableColumnsType<any> = [
    // Define your table columns here
    // Example: { title: 'Column Name', dataIndex: 'columnName', key: 'columnName' }
  ];

  const tableData = [...filteredUsers]; // Assuming you have properties in users similar to the column names

  return (
    <div>
      <Card>
        <Skeleton loading={isLoading} active>
          <div className="flex justify-between">
            <div>
              <h2>Total Users: {siteUsers.length}</h2>
              <h2>Approved Users: {approvedUsers.length}</h2>
              <h2>Pending Users: {pendingUsers.length}</h2>
              <h2>Basic Plan Users: {basicPlanUsers.length}</h2>
              <h2>Standard Plan Users: {standardPlanUsers.length}</h2>
              <h2>Premium Plan Users: {premiumPlanUsers.length}</h2>
            </div>
            <div>
              <Bar data={chartData} />
            </div>
          </div>
        </Skeleton>
      </Card>

      <Card>
        <Skeleton loading={isLoading} active>
          <Table
            dataSource={tableData}
            columns={tableColumns}
            pagination={{ pageSize: 5 }}
            // Add any other properties or customization you need
          />
        </Skeleton>
      </Card>
    </div>
  );
};

export default UsersDashboard;
