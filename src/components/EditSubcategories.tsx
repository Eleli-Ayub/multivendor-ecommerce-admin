import React, { useEffect, useState } from 'react';
import { EditSubCategory, FetchCategories } from '../Redux/Apis/category.actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCategories } from '../Redux/slices/CategoriesSlice';
import { setLoader } from '../Redux/slices/Loaderslice';
// import { createSubcategory } from '../Redux/Apis/subcategories.actions';
// import { useParams } from 'react-router-dom';
import { Close } from '@mui/icons-material';

type AppProps = { id: any; setIsEditing: any; subCategoryName: any; categoryName: any };

const EditSubcategoryForm: React.FC<AppProps> = ({
    id,
    setIsEditing,
    subCategoryName,
    categoryName,
}) => {
    const dispatch = useDispatch();
    const categories = useSelector((state: any) => state.categories.categories);
    // console.log(id);

    const [formData, setFormData] = useState({
        parentcategory: categoryName,
        subcategoryname: subCategoryName,
        subcategoryimage: 'myimage',
        subcategoryid: id,
    });

    const resetForm = () => {
        setFormData({
            parentcategory: '',
            subcategoryname: '',
            subcategoryimage: 'my image',
            subcategoryid: '',
        });
    };

    const getCategories = async () => {
        try {
            dispatch(setLoader(true));
            const response = await FetchCategories();
            dispatch(setLoader(false));
            // toast.success("Categories loaded successfully");
            dispatch(setCategories(response.data.Data));
        } catch (error: any) {
            console.log(error);
            toast.error('Error loading categories');
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await EditSubCategory(formData);

            if (response.data.Success) {
                toast.success('Subcategory created successfully');
            } else {
                toast.error(response.data.Message);
            }
        } catch (error) {
            console.log(error);
        }

        console.log(formData);

        resetForm();
    };

    return (
        <div className="fixed inset-0 px-[10px] lg:px-5 min-h-full w-full bg-black-200/50 z-50 flex items-center  justify-center py-2 overflow-y-auto ">
            <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-[700px] min-h-[400px]">
                <div className="">
                    <div className="flex  justify-end" onClick={() => setIsEditing(false)}>
                        <Close className="bg-gray-200 p-[4px] text-[40px] rounded-full font-bold" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4">Edit Subcategory</h2>
                    <form onSubmit={handleSubmit} className="h-72">
                        <div className="mb-4">
                            <label
                                htmlFor="parentcategory"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Category Name:
                            </label>
                            <select
                                id="parentcategory"
                                name="parentcategory"
                                value={formData.parentcategory}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((category: any) => (
                                    <option
                                        key={category.categoryname}
                                        value={category.categoryname}
                                    >
                                        {category.categoryname}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="subcategoryname"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Subcategory Name:
                            </label>
                            <input
                                type="text"
                                id="subcategoryname"
                                name="subcategoryname"
                                value={formData.subcategoryname}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                                placeholder="Enter Subcategory Name"
                                required
                            />
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="bg-primary-orange px-4 py-2 text-white rounded-xl w-full hover:bg-secondary-orange focus:outline-none"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditSubcategoryForm;
