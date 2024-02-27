import { useDispatch, useSelector } from 'react-redux';
import CategoriesTable from '../components/CategoriesTable';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FetchCategories } from '../Redux/Apis/category.actions';
import { setCategories } from '../Redux/slices/CategoriesSlice';
import { setLoader } from '../Redux/slices/Loaderslice';

const Categories = () => {
    const categories = useSelector((state: any) => state.categories.categories);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCategories = async () => {
        try {
            dispatch(setLoader(true));
            const response = await FetchCategories();
            dispatch(setCategories(response.data.Data));
            dispatch(setLoader(false));
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    useEffect(() => {
        getCategories();
    }, [dispatch]);

    // Calculate subcategory counts directly from the categories data
    const subcategoryCounts = categories?.reduce((acc: any, category: any) => {
        acc[category.categoryname] = category.subCategories ? category.subCategories.length : 0;
        return acc;
    }, {});

    return (
        <div className="flex flex-col mx-auto">
            <div className="bg-gray-300 p-5">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Overview</h1>
                    <div className="flex gap-3 px-5">
                        <button
                            className="bg-primary-orange text-white px-2 rounded p-1"
                            onClick={() => navigate('/new-category')}
                        >
                            Add category
                        </button>
                        <button
                            className="bg-primary-orange text-white px-2 rounded p-1"
                            onClick={() => navigate('/new-subcategory')}
                        >
                            Add Sub-category
                        </button>
                    </div>
                </div>
                <div className="flex gap-5 flex-wrap">
                    <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-semibold text-primary-orange">
                            {categories.length}
                        </h1>
                        <p className="text-sm">Total Categories</p>
                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h1>filters</h1>
                    {/* List of ads goes here */}
                </div>
                <CategoriesTable
                    categories={categories}
                    subcategoryCounts={subcategoryCounts}
                    getcategories={getCategories}
                />
            </div>
        </div>
    );
};

export default Categories;
