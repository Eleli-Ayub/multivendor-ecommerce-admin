import { Table } from 'antd';
import { deleteCategory } from '../Redux/Apis/category.actions';
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setLoader } from '../Redux/slices/Loaderslice';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ListSubcategories from './ListSubcategories';
import EditCategoryForm from './EditCategoryForm';

type AdFormProps = {
    categories: any;
    subcategoryCounts: any;
    getcategories: () => Promise<void>;
};

const CategoryTable: React.FC<AdFormProps> = ({ categories, subcategoryCounts, getcategories }) => {
    const [mySubCategories, setMySubCategories] = useState(false);
    const [subcategories, setSubCategories] = useState();
    const [categoryName, setCategoryName] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState();
    // const navigate = useNavigate();

    const dispatch = useDispatch();

    const deleteThisCategory = async (categoryId: string, categoryName: string) => {
        try {
            dispatch(setLoader(true));
            await deleteCategory(categoryId);
            dispatch(setLoader(false));
            toast.success(`Category "${categoryName}" deleted successfully`);
            getcategories();
        } catch (error) {
            dispatch(setLoader(false));
            console.log(error);
        }
    };

    useEffect(() => {}, []);

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
                                setMySubCategories(true);
                                setSubCategories(record?.subCategories);
                                setCategoryName(record?.categoryname);
                                // console.log('clicked categories', subcategories);
                            }}
                        />
                        <Edit
                            className="text-green-500 "
                            onClick={() => {
                                // navigate(`/categories/${record?.categoryid}`);
                                setIsEditing(true);
                                setSelectedId(record?.categoryid);
                                setCategoryName(record?.categoryname);
                            }}
                        />
                        <Delete
                            className="text-red-600"
                            onClick={() => {
                                deleteThisCategory(record.categoryid, record.categoryname);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="mt-4">
                <Table columns={columns} dataSource={categories} className="border rounded-sm" />
            </div>

            {mySubCategories && (
                <div>
                    <ListSubcategories
                        subcategories={subcategories}
                        setMySubCategories={setMySubCategories}
                        categoryName={categoryName}
                    />
                </div>
            )}

            {isEditing && (
                <div>
                    <EditCategoryForm
                        id={selectedId}
                        setIsEditing={setIsEditing}
                        categoryName={categoryName}
                    />
                </div>
            )}
        </div>
    );
};

export default CategoryTable;
