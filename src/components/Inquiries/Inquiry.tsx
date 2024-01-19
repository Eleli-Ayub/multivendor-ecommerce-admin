import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete, FiberManualRecord, Visibility } from '@mui/icons-material';
import InquiryModal from './InquiryModal';

import { AppDispatch } from '../../Redux/store';
import GlobalLoader from '../Global/GlobalLoader';
import Loader from '../constants/loader';
import { DeleteInquiry, GetInquiries, MarkAsRead } from '../../Redux/Apis/inquiries.actions';

const Inquiries = () => {
    const [inquiry, setInquiry] = useState([]);
    const { loader } = useSelector((state: any) => state.auth.isLoading);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, SetSelectedId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const userid = 'admin';

    const deleteEnquiry = async (id: any) => {
        await DeleteInquiry(id);
        fetchData();
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await GetInquiries();
            const data = response.data;
            const usersInquiries = await data.filter((item: any) => item.user === userid);
            setInquiry(usersInquiries);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dispatch, userid]);

    const markInquiryAsRead = async (inquiryId: any): Promise<void> => {
        try {
            setIsLoading(true);
            await MarkAsRead(inquiryId);
            setIsLoading(false);
            fetchData();
        } catch (error) {
            console.error('Error marking inquiry as read:', error);
        }
    };

    return (
        <div className=" px-[10px] py-[20px] md:px-8 md:py-20 max-w-6xl mx-auto bg-white h-[100vh] shadow-lg">
            {isLoading && <Loader />}
            {loader && <GlobalLoader />}
            {inquiry?.map((item: any) => (
                <ul
                    key={item?._id}
                    className={`max-w-2xl mb-2 bg-white text-black-main text-[16px] rounded-md shadow-lg  border-t border-t-gray-100  ${
                        item?.read
                            ? 'border-l-3  border-green-light '
                            : 'border-l-4 border-green-dark'
                    }`}
                >
                    <li className="flex justify-between items-center py-3 px-[10px] rounded-[8px]">
                        <Link
                            to={'#'}
                            className="flex-1 pr-4"
                            onClick={() => {
                                setShowModal(true);
                                SetSelectedId(item?._id);
                                markInquiryAsRead(item?._id);
                            }}
                        >
                            <p className={` line-clamp-1 ${item.read ? '' : 'font-bold'}`}>
                                {item?.message}
                            </p>
                            <p className="text-gray-500">
                                {new Date(item?.createdAt).toLocaleDateString()}
                            </p>
                            {/* <p>status: {item?.read ? 'has been read' : 'has not been read'}</p> */}
                        </Link>
                        <div className="flex items-center space-x-2">
                            {item?.read ? (
                                <Visibility
                                    className="text-green-500"
                                    onClick={() => {
                                        setShowModal(true);
                                        SetSelectedId(item?._id);
                                        markInquiryAsRead(item?._id);
                                    }}
                                />
                            ) : (
                                <FiberManualRecord
                                    className="text-green-dark"
                                    onClick={() => {
                                        setShowModal(true);
                                        SetSelectedId(item?._id);
                                        markInquiryAsRead(item?._id);
                                    }}
                                />
                            )}
                            <Delete
                                className="text-red-600"
                                onClick={() => deleteEnquiry(item?._id)}
                            />
                        </div>
                    </li>
                </ul>
            ))}

            {showModal && <InquiryModal setShowModal={setShowModal} id={selectedId} />}
        </div>
    );
};
export default Inquiries;
