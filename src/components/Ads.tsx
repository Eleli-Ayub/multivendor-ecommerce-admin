import { Cancel, CheckOutlined, LibraryAdd, Pending } from '@mui/icons-material';
import AdsTable from './AdsTable';
import { useSelector, useDispatch } from 'react-redux';
import { FetchProductsAsync } from '../Redux/slices/AdsSlice';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../Redux/store';
import Loader from './constants/loader';

const Ads = () => {
    const Ads = useSelector((state: any) => state.AllAds.Ads);
    const isLoading = useSelector((state: any) => state.AllAds.isLoading);
    const ads = Ads;
    const totalAdsCount = ads;
    const approvedAdsCount = ads?.filter((ad: any) => ad.isapproved);
    const pendingAdsCount = ads?.filter((ad: any) => !ad.isapproved);
    const declinedAdsCount = ads?.filter((ad: any) => !ad.isActive);
    const closedAdsCount = ads?.filter((ad: any) => !ad.isactive);

    const [filteredAds, setfilteredAds] = useState(Ads);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(FetchProductsAsync());
    }, []);

    // console.log(totalAdsCount, approvedAdsCount, declinedAdsCount, closedAdsCount, pendingAdsCount);

    return (
        <div className="flex flex-col mx-auto">
            {isLoading && <Loader />}
            <div className="bg-white shadow-card p-5">
                {/* <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Ads Overview</h1>
                    <button className="bg-primary-orange text-white px-2 rounded p-1">
                        Create Ad
                    </button>
                </div> */}
                <div className="flex gap-5 flex-wrap">
                    {/* Total Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-primary-orange text-white cursor-pointer"
                        onClick={() => {
                            setfilteredAds(totalAdsCount);
                        }}
                    >
                        <LibraryAdd className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {totalAdsCount?.length}
                            </h1>
                            <p className="text-sm">Total Ads</p>
                        </div>
                    </div>

                    {/* Approved Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-500 cursor-pointer"
                        onClick={() => {
                            setfilteredAds(approvedAdsCount);
                        }}
                    >
                        <CheckOutlined className="text-whites" />
                        <div>
                            <h1 className="text-2xl font-semibold ">{approvedAdsCount?.length}</h1>
                            <p className="text-sm">Approved Ads</p>
                        </div>
                    </div>

                    {/* Pending Ads */}
                    <div
                        className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-orange-400 cursor-pointer"
                        onClick={() => {
                            setfilteredAds(pendingAdsCount);
                        }}
                    >
                        <Pending />
                        <div>
                            {' '}
                            <h1 className="text-2xl font-semibold ">{pendingAdsCount?.length}</h1>
                            <p className="text-sm">Pending Ads</p>
                        </div>
                    </div>

                    {/* Declined Ads */}
                    <div
                        className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-red-600 cursor-pointer"
                        onClick={() => {
                            setfilteredAds(declinedAdsCount);
                        }}
                    >
                        <Cancel />
                        <div>
                            <h1 className="text-2xl font-semibold ">{declinedAdsCount?.length}</h1>
                            <p className="text-sm">Declined Ads</p>
                        </div>
                    </div>

                    {/* Closed Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-800 cursor-pointer"
                        onClick={() => {
                            setfilteredAds(closedAdsCount);
                        }}
                    >
                        <h1 className="text-2xl font-semibold ">{closedAdsCount?.length}</h1>
                        <p className="text-sm">Closed Ads</p>
                    </div>
                </div>
            </div>

            {/* second placeholder */}
            <div>
                <div>
                    {/* <h1>filters</h1> */}
                    {/* List of ads goes here */}
                </div>
                <div>
                    <AdsTable Ads={filteredAds} />
                </div>
            </div>
            {/* end of second placeholder */}
        </div>
    );
};

export default Ads;
