import { Table } from 'antd';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../Redux/slices/AuthSlice';
import { AppDispatch } from '../Redux/store';
import Loader from './constants/loader';
import { ApproveUser, RevokeUser } from '../Redux/Apis/users.actions';
import { setLoader } from '../Redux/slices/Loaderslice';

const UsersTable = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { users, isLoading } = useSelector((state: any) => state.auth);
    // console.log(users);

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const approve = async (id: any) => {
        dispatch(setLoader(true));
        const response = await ApproveUser(id);
        dispatch(setLoader(false));
        dispatch(getAllUsers());
        return response;
    };

    const Revoke = async (id: any) => {
        dispatch(setLoader(true));
        const response = await RevokeUser(id);
        dispatch(setLoader(false));
        dispatch(getAllUsers());
        return response;
    };

    const TableData = [
        {
            title: 'First Name',
            dataIndex: 'firstname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Status',
            dataIndex: 'isapproved',
            render: (isapproved: Boolean, record: any) => (
                <span className="flex gap-2">
                    <span style={{ color: isapproved ? 'green' : 'red' }}>
                        {isapproved ? 'Approved' : 'Pending'}
                    </span>
                    <span className="underline">
                        {isapproved ? (
                            <div className="flex gap-2">
                                <span
                                    onClick={() => Revoke(record.userid)}
                                    className="cursor-pointer"
                                >
                                    Revoke
                                </span>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <span
                                    onClick={() => approve(record.userid)}
                                    className="cursor-pointer"
                                >
                                    Approve
                                </span>
                                <span>Revoke</span>
                            </div>
                        )}
                    </span>
                </span>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            render: (_text: any, _record: any) => {
                // console.log(record, text);
                return (
                    <div className="flex mr-2 gap-3">
                        <Visibility className="text-primary-orange" />
                        <Edit className="text-green-500" />
                        <Delete className="text-red-600" />
                    </div>
                );
            },
        },
    ];

    return (
        <div className="mt-4">
            {isLoading && <Loader />}
            <Table
                columns={TableData}
                dataSource={users} // Use the imported user data as the data source
                className="border rounded-sm"
            ></Table>
        </div>
    );
};

export default UsersTable;
