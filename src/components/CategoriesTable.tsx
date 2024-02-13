import { Table } from 'antd';
import { deleteCategory } from '../Redux/Apis/category.actions';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setLoader } from '../Redux/slices/Loaderslice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type AdFormProps = {
    categories: any;
    subcategoryCounts: any;
    getcategories: any;
};

const CategoryTable: React.FC<AdFormProps> = ({ categories, subcategoryCounts, getcategories }) => {
    // const [myCategories, setMyCategories] = useState();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    //delete single category function

    const deleteThisCategory = async (categoryName: string) => {
        try {
            dispatch(setLoader(true));
            await deleteCategory(categoryName);
            dispatch(setLoader(false));
            toast.success(`Category "${categoryName}" deleted successfully`);
            getcategories();
        } catch (error) {
            dispatch(setLoader(false));
            console.log(error);
        }
    };

    useEffect(() => {}, [subcategoryCounts]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'categoryname',
        },
        {
            title: 'Subcategory Count',
            dataIndex: 'categoryname', // Use the category name as the key
            render: (categoryName: string | number) => subcategoryCounts[categoryName] || 0, // Display the subcategory count from the state or 0 if not available
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            render: (_text: any, record: any) => {
                // console.log(record, text);
                return (
                    <div className="flex mr-2 gap-3">
                        <Visibility
                            className="text-primary-orange  "
                            onClick={() => {
                                navigate('/new-subcategory');
                            }}
                        />
                        <Edit
                            className="text-green-500 "
                            onClick={() => {
                                navigate('/new-subcategory');
                            }}
                        />
                        <Delete
                            className="text-red-600"
                            onClick={() => {
                                deleteThisCategory(record.categoryname);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div className="mt-4">
            <Table columns={columns} dataSource={categories} className="border rounded-sm" />
        </div>
    );
};

export default CategoryTable;
