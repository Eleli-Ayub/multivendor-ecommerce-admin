import React, { useEffect, useState } from 'react';
import { FetchCategories } from '../Redux/Apis/category.actions';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setCategories } from '../Redux/slices/CategoriesSlice';
import { setLoader } from '../Redux/slices/Loaderslice';
import { createSubcategory } from '../Redux/Apis/subcategories.actions';

const SubcategoryForm: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: any) => state.categories.categories);

    const [formData, setFormData] = useState({
        parentcategory: '',
        subcategoryname: '',
        subcategoryimage: 'myimage',
    });

    const resetForm = () => {
        setFormData({
            parentcategory: '',
            subcategoryname: '',
            subcategoryimage: 'my image',
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
            const response = await createSubcategory(formData);

            console.log(response);
            toast.success('Subcategory created successfully');
        } catch (error) {
            console.log(error);
        }

        console.log(formData);

        // resetForm();
    };

    return (
        <div className="flex justify-center h-screen bg-white py-10">
            <div className="bg-white h-96 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Create Subcategory</h2>
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
                                <option key={category.categoryname} value={category.categoryname}>
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
                            Create Subcategory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubcategoryForm;
