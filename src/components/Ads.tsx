import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Skeleton } from 'antd';
import { LibraryAdd, CheckOutlined, Pending, Cancel } from '@mui/icons-material';
import AdsTable from './AdsTable';
import { FetchProductsAsync } from '../Redux/slices/AdsSlice';
import { AppDispatch } from '../Redux/store';

const Ads = () => {
    const { Ads, isLoading } = useSelector((state: any) => state.AllAds);
    const ads = Ads;
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
        { name: 'Total', data: ads, color: 'primary-orange' },
        {
            name: 'Approved',
            data: ads?.filter((ad: any) => ad.isapproved),
            color: 'green-500',
        },
        {
            name: 'Pending',
            data: ads?.filter((ad: any) => !ad.isapproved),
            color: 'orange-400',
        },
        {
            name: 'Declined',
            data: ads?.filter((ad: any) => !ad.isActive),
            color: 'red-600',
        },
        {
            name: 'Closed',
            data: ads?.filter((ad: any) => !ad.isactive),
            color: 'green-800',
        },
    ];

    return (
        <div className="flex flex-col mx-auto p-3 w-full overflow-x-auto">
            <div className="flex flex-wrap gap-2 lg:flex-nowrap">
                <div className="w-full lg:w-1/2 h-auto">
                    <Card className="rounded-[20px] shadow-sm bg-white mb-4 h-full">
                        <Skeleton loading={isLoading} active>
                            <h1 className="text-2xl font-semibold text-center">Ad's Stats</h1>
                            <div className="flex flex-col flex-wrap justify-center gap-6 p-5">
                                {stats.map(({ name, data, color }) => (
                                    <div key={name} className="w-full ">
                                        <span className="text-black">{name}</span>
                                        <div className="relative">
                                            <div className="w-full bg-gray-200 rounded-sm h-[10px]">
                                                <div
                                                    className={`bg-${color} h-full rounded-sm`}
                                                    style={{
                                                        width: `${calculatePercentage(data)}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Skeleton>
                    </Card>
                </div>

                <div className="w-full lg:w-1/2">
                    <Card className="rounded-[20px] shadow-sm bg-white h-full">
                        <Skeleton loading={isLoading} active>
                            <div className="flex flex-wrap gap-4 p-4">
                                {stats.map(({ name, data, color }) => (
                                    <div
                                        key={name}
                                        className={`p-4 rounded shadow-custom flex items-center justify-between bg-${color} text-white cursor-pointer`}
                                        style={{ minWidth: '220px', height: '100px' }}
                                        onClick={() => setFilteredAds(data)}
                                    >
                                        {name === 'Total' && <LibraryAdd />}
                                        {name === 'Approved' && <CheckOutlined />}
                                        {name === 'Pending' && <Pending />}
                                        {name === 'Declined' && <Cancel />}
                                        <div>
                                            <h1 className="text-2xl font-semibold">
                                                {data.length}
                                            </h1>
                                            <p className="text-sm">{name} Ads</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Skeleton>
                    </Card>
                </div>
            </div>

            <div className="mt-4">
                <Card>
                    <Skeleton loading={isLoading} active>
                        <AdsTable Ads={filteredAds} />
                    </Skeleton>
                </Card>
            </div>
        </div>
    );
};

export default Ads;
