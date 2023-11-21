import { Cancel, CheckOutlined, LibraryAdd, Pending } from '@mui/icons-material';
import AdsTable from './AdsTable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../Redux/Apis/ads.actions';
import { setLoader } from '../Redux/slices/Loaderslice';

const Ads = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getProducts();
            dispatch(setLoader(false));
            setProducts(response.data.Data);
            console.log(products);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="flex flex-col mx-auto">
            <div className="bg-white shadow-card p-5">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Ads Overview</h1>
                    <button className="bg-primary-orange text-white px-2 rounded p-1">
                        Create Ad
                    </button>
                </div>
                <div className="flex gap-5 flex-wrap">
                    {/* Total Ads */}
                    <div className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-primary-orange text-white ">
                        <LibraryAdd className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">5000</h1>
                            <p className="text-sm">Total Ads</p>
                        </div>
                    </div>

                    {/* Approved Ads */}
                    <div className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-500">
                        <CheckOutlined className="text-whites" />
                        <div>
                            <h1 className="text-2xl font-semibold ">5000</h1>
                            <p className="text-sm">Approved Ads</p>
                        </div>
                    </div>

                    {/* Pending Ads */}
                    <div className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-orange-400">
                        <Pending />
                        <div>
                            {' '}
                            <h1 className="text-2xl font-semibold ">5000</h1>
                            <p className="text-sm">Pending Ads</p>
                        </div>
                    </div>

                    {/* Declined Ads */}
                    <div className=" p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-red-600">
                        <Cancel />
                        <div>
                            <h1 className="text-2xl font-semibold ">5000</h1>
                            <p className="text-sm">Declined Ads</p>
                        </div>
                    </div>

                    {/* Closed Ads */}
                    <div className="p-4 rounded h-[100px] w-[220px] shadow-custom  flex items-center justify-between text-white bg-green-800">
                        <h1 className="text-2xl font-semibold ">5000</h1>
                        <p className="text-sm">Closed Ads</p>
                    </div>
                </div>
            </div>

            {/* second placeholder */}
            <div>
                <div>
                    <h1>filters</h1>
                    {/* List of ads goes here */}
                </div>
                <div>
                    <AdsTable />
                </div>
            </div>
            {/* end of second placeholder */}
        </div>
    );
};

export default Ads;
