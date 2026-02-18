import { Close, Delete, Edit } from '@mui/icons-material';
import { Table } from 'antd';
import { useState } from 'react';
import EditSubcategoryForm from './EditSubcategories';
import { useDispatch } from 'react-redux';
import { deleteSubCategory } from '../Redux/Apis/category.actions';
import { setLoader } from '../Redux/slices/Loaderslice';
import { toast } from 'react-toastify';

type AppProps = { subcategories: any; setMySubCategories: any; categoryName: any };

const ListSubcategories: React.FC<AppProps> = ({
    subcategories,
    setMySubCategories,
    categoryName,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState();
    const [subcategoryName, setSubcategoryName] = useState();
    const dispatch = useDispatch();

    const deleteThisSubCategory = async (subcategoryId: string, subcategoryName: string) => {
        try {
            dispatch(setLoader(true));
            await deleteSubCategory(subcategoryId);
            dispatch(setLoader(false));
            toast.success(` "${subcategoryName}" deleted successfully`);
        } catch (error) {
            dispatch(setLoader(false));
            console.log(error);
        }
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'subcategoryname',
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            render: (_text: any, record: any) => {
                return (
                    <div className="flex mr-2 gap-3">
                        {/* <Visibility
                            className="text-primary-orange  "
                            onClick={() => {
                                console.log('clicked categoriers');
                            }}
                        /> */}
                        <Edit
                            className="text-green-500 "
                            onClick={() => {
                                setIsEditing(true);
                                setSelectedId(record?.subcategoryid);
                                setSubcategoryName(record?.subcategoryname);
                                console.log(record);
                            }}
                        />
                        <Delete
                            className="text-red-600"
                            onClick={() => {
                                deleteThisSubCategory(
                                    record?.subcategoryid,
                                    record?.subcategoryname
                                );
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div className="fixed inset-0 px-[10px] lg:px-5 min-h-full w-full bg-black-200/50 z-50 flex items-center  justify-center py-2 overflow-y-auto ">
            <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-[700px] min-h-[400px] ">
                <div className="flex  justify-end" onClick={() => setMySubCategories(false)}>
                    <Close className="bg-gray-200 p-[4px] text-[40px] rounded-full font-bold" />
                </div>
                {categoryName}
                <div className="mt-4">
                    <Table
                        columns={columns}
                        dataSource={subcategories}
                        className="border rounded-sm"
                    />
                </div>
                {isEditing && (
                    <EditSubcategoryForm
                        setIsEditing={setIsEditing}
                        id={selectedId}
                        subCategoryName={subcategoryName}
                        categoryName={categoryName}
                    />
                )}
            </div>
        </div>
    );
};

export default ListSubcategories;
