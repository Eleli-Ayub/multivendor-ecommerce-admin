import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers } from '../Redux/slices/AuthSlice';
import { AppDispatch } from '../Redux/store';
import { Card, Skeleton } from 'antd';
import { Box, Stack, Typography } from '@mui/material';
import { ArrowCircleUpRounded } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import PieChart from '../components/Global/pie';
import { ApexOptions } from 'apexcharts';

const UsersDashboard: React.FC = () => {
    const users = useSelector((state: any) => state.auth.users);
    const isLoading = useSelector((state: any) => state.auth.isLoading);

    const siteUsers = users || [];
    const totalUsersCount = siteUsers.length;
    const approvedUsersCount = siteUsers.filter((user: any) => user.isapproved).length;
    const pendingUsersCount = siteUsers.filter((user: any) => !user.isapproved).length;
    const basicPlanUsersCount = siteUsers.filter(
        (user: any) => user.packagetype === 'basic'
    ).length;
    const standardPlanUsersCount = siteUsers.filter(
        (user: any) => user.packagetype === 'standard'
    ).length;
    const premiumPlanUsersCount = siteUsers.filter(
        (user: any) => user.packagetype === 'premium'
    ).length;

    const percentageTotalUsers = Math.round((totalUsersCount / totalUsersCount) * 100);
    const percentageApprovedUsers = Math.round((approvedUsersCount / totalUsersCount) * 100);
    const percentagePendingUsers = Math.round((pendingUsersCount / totalUsersCount) * 100);
    const percentageBasicPlanUsers = Math.round((basicPlanUsersCount / totalUsersCount) * 100);
    const percentageStandardPlanUsers = Math.round(
        (standardPlanUsersCount / totalUsersCount) * 100
    );
    const percentagePremiumPlanUsers = Math.round((premiumPlanUsersCount / totalUsersCount) * 100);

    const [, setFilteredUsers] = useState(siteUsers);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        setFilteredUsers(siteUsers);
    }, [siteUsers]);

    const TotalUsersSeries = [
        {
            data: [
                percentageTotalUsers,
                percentageApprovedUsers,
                percentagePendingUsers,
                percentageBasicPlanUsers,
                percentageStandardPlanUsers,
                percentagePremiumPlanUsers,
            ],
        },
    ];

    const TotalUsersOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        colors: ['#475BE8', '#CFC8FF'],
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
                columnWidth: '55%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        stroke: {
            colors: ['transparent'],
            width: 4,
        },
        xaxis: {
            categories: [
                'Total',
                'Approved',
                'Pending',
                'Basic Plan',
                'Standard Plan',
                'Premium Plan',
            ],
        },
        yaxis: {
            title: {
                text: 'Users Percentage',
            },
            max: 100,
        },
        fill: {
            opacity: 1,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
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
        <div className="flex flex-col mx-auto px-3 w-full overflow-auto gap-10  mt-10">
            <div className="flex gap-2">
                <Card className="w-full lg:w-1/2">
                    <Skeleton loading={isLoading} active>
                        <div className="w-full">
                            <div>
                                <Box
                                    p={2}
                                    flex={1}
                                    id="chart"
                                    display={'flex'}
                                    flexDirection="column"
                                    borderRadius={'15px'}
                                    bgcolor="#fcfcfc"
                                >
                                    <Typography fontWeight={400} color="#11142">
                                        Total Users
                                    </Typography>
                                    <Stack my={'20px'} direction="row" gap={4} flexWrap="wrap">
                                        <Typography fontWeight={700} fontSize="28px" color="#222">
                                            {totalUsersCount}
                                        </Typography>
                                        <Stack direction={'row'} alignItems="center" gap={1}>
                                            <ArrowCircleUpRounded
                                                sx={{
                                                    fontSize: 25,
                                                    color: '#4754be8',
                                                }}
                                            />
                                            <Stack></Stack>
                                        </Stack>
                                    </Stack>
                                    <ReactApexChart
                                        series={TotalUsersSeries}
                                        type="bar"
                                        height="200px"
                                        options={TotalUsersOptions}
                                    />
                                </Box>
                            </div>
                        </div>
                    </Skeleton>
                </Card>

                <Card className="w-full lg:w-1/2 h-[400px] overflow-y-auto no-scrollbar ">
                    <h1 className="capitalize font-semibold text-center">Recent Premium Ads</h1>
                    <Skeleton loading={isLoading} active>
                        <div className="w-full flex flex-col gap-2">
                            {users?.map((user: any) => (
                                <div className=" bg-white gap-2 w-full h-[100px] rounded-[8px] shadow-lg flex items-center">
                                    <img
                                        src={user?.userimage}
                                        alt=""
                                        className="w-[100px] h-[100px] rounded-full border border-primary-orange object-cover object-top "
                                    />
                                    <p className="text-base font-semibold line-clamp-1">
                                        {user?.firstname} {user?.lastname}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Skeleton>
                </Card>
            </div>

            {/* Include additional sections as needed */}
        </div>
    );
};

export default UsersDashboard;
