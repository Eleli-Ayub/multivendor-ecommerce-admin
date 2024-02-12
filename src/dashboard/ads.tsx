import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FetchProductsAsync } from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';
import { Card, Skeleton } from 'antd';
import 'tailwindcss/tailwind.css';
import AdsTable from '../components/AdsTable';
import { ApexOptions } from 'apexcharts';
import { Box, Stack, Typography } from '@mui/material';
import { ArrowCircleUpRounded } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import PieChart from '../components/Global/pie';

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
    const percentageApprovedAds = Math.round((approvedAdsCount / totalAdsCount) * 100);
    const percentagePendingAds = Math.round((pendingAdsCount / totalAdsCount) * 100);
    const percentageActiveAds = Math.round((activeAdsCount / totalAdsCount) * 100);
    const percentageDeactivatedAds = Math.round((deactivatedAdsCount / totalAdsCount) * 100);
    const percentageClosedAds = Math.round((closedAdsCount / totalAdsCount) * 100);

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
            categories: ['total', 'Approved', 'Pending', 'closed', 'active', 'deactivated'],
        },
        yaxis: {
            title: {
                text: 'Ads Percentage',
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
        <div className="flex flex-col mx-auto px-3 w-full overflow-auto gap-10">
            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                <Card className="w-full lg:w-1/2 ">
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
                                        Total Ads
                                    </Typography>
                                    <Stack my={'20px'} direction="row" gap={4} flexWrap="wrap">
                                        <Typography fontWeight={700} fontSize="28px" color="#222">
                                            {totalAdsCount}
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

                <Card className="w-full lg:w-1/2 ">
                    <Skeleton loading={isLoading} active>
                        <Box>
                            <Typography fontSize={'25'} fontWeight={700} color="#11142d">
                                Ads Overview
                            </Typography>
                            <Box mt="20px" display={'flex'} flexWrap="wrap" gap={4}>
                                <PieChart
                                    title="Approved Ads"
                                    value={approvedAdsCount}
                                    series={[percentageApprovedAds, 100 - percentageApprovedAds]}
                                    colors={['#475be8', '#e4e8ef']}
                                />

                                <PieChart
                                    title="Pending Ads"
                                    value={pendingAdsCount}
                                    series={[percentagePendingAds, 100 - percentagePendingAds]}
                                    colors={['#475be8', '#e4e8ef']}
                                />
                                <PieChart
                                    title="Declined Ads"
                                    value={closedAdsCount}
                                    series={[percentageClosedAds, 100 - percentageClosedAds]}
                                    colors={['#276be8', '#e7e6ef']}
                                />
                                <PieChart
                                    title="Active Ads"
                                    value={activeAdsCount}
                                    series={[percentageActiveAds, 100 - percentageActiveAds]}
                                    colors={['#475be8', '#e4e8ef']}
                                />
                            </Box>
                        </Box>
                    </Skeleton>
                </Card>
            </div>

            <div className="flex gap-2 flex-wrap lg:flex-nowrap">
                <Card className="w-full lg:w-1/2 h-[300px] overflow-y-auto no-scrollbar">
                    <h1 className="capitalize font-semibold text-center">Recent ads</h1>
                    <Skeleton loading={isLoading} active>
                        <AdsTable Ads={Ads.slice(0, 3)} />
                    </Skeleton>
                </Card>
                <Card className="w-full lg:w-1/2 h-[300px] overflow-y-auto no-scrollbar ">
                    <h1 className="capitalize font-semibold text-center">Recent Premium Ads</h1>
                    <Skeleton loading={isLoading} active>
                        <div className="w-full flex flex-col gap-2 p-[5px]">
                            {ads.map((ad: any) => (
                                <div className=" bg-white gap-2 w-full h-[100px] rounded-[8px] price flex items-center">
                                    <img
                                        src={ad?.mainimage}
                                        alt=""
                                        className="w-1/3 h-[98%] object-cover object-top  rounded-[8px]"
                                    />
                                    <p className="text-base font-semibold line-clamp-1">
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
