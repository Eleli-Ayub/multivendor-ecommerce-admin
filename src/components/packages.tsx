import { useEffect, useState } from 'react';
import Package from './Modals/Package';
import { Table } from 'antd';
import { axiosService } from '../Redux/helpers/axios';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
    const [toggle, settoggle] = useState(false);
    const [packages, setpackages] = useState<any[]>([]);

    const navigate = useNavigate();
    const [selectedpackage, setselectedpackage] = useState<any>();

    const fetchData = async () => {
        const url = '/packages/getallpackages';
        const response = await axiosService.get(url);
        const data = response.data.Data;
        setpackages(data);
        console.log(response.data.Data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const column = [
        {
            title: 'Name',
            dataIndex: 'package_name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
        },
        {
            title: 'Total Users',
            dataIndex: 'users_number',
        },

        {
            title: 'Actions',
            dataIndex: 'action',
            render: (_text: any, record: any) => (
                <div className="flex mr-2 gap-3">
                    <Visibility
                        className="text-primary-orange"
                        onClick={() => navigate(`/details/${record.package_id}`)}
                    />
                    <Edit
                        className="text-green-600"
                        onClick={() => {
                            setselectedpackage(record);
                            settoggle(true);
                        }}
                    />
                    <Delete
                        className="text-red-600"
                        onClick={() => navigate(`/details/${record.package_id}`)}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="mt-20">
            <button
                className="bg-primary-orange hover:secondary-orange px-2 py-3 rounded text-white"
                onClick={() => {
                    settoggle(!toggle);
                }}
            >
                create package
            </button>
            {toggle && (
                <Package
                    settoggle={settoggle}
                    selectedPackage={selectedpackage}
                    setselectedPackage={setselectedpackage}
                    fetchData={fetchData}
                />
            )}

            <Table dataSource={packages} columns={column} />
        </div>
    );
};

export default Packages;
