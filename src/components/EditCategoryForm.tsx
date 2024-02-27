import React, { useState } from 'react';
import { EditCategory } from '../Redux/Apis/category.actions';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCategoryForm: React.FC = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        categoryname: '',
        categoryimage: '',
        categoryid: id,
    });

    const resetForm = () => {
        setFormData({
            categoryname: '',
            categoryimage: '',
            categoryid: id,
        });
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await EditCategory(formData);
            if (response.data.Success) {
                toast.success('Category updated Successfuly');
            } else {
                toast.error(response.data.Error);
            }
            console.log(response);
            console.log('Success');
        } catch (error) {
            console.log(error);
        }

        resetForm();
    };

    return (
        <div className="flex justify-center h-screen bg-white py-10">
            <div className="bg-white h-96 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
                <form onSubmit={handleSubmit} className="h-72">
                    <div className="mb-4">
                        <label
                            htmlFor="categoryname"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Category Name:
                        </label>
                        <input
                            type="text"
                            id="categoryname"
                            name="categoryname"
                            value={formData.categoryname}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
                            placeholder="Enter Category Name"
                            required
                        />
                    </div>
                    <div className="mb-4 hidden">
                        <label
                            htmlFor="categoryimage"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Category Image URL:
                        </label>
                        <input
                            type="text"
                            id="categoryimage"
                            name="categoryimage"
                            value={formData.categoryimage}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange hidden"
                            placeholder="Enter Category Image URL"
                            // required
                        />
                    </div>
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="bg-primary-orange px-4 py-2 text-white rounded-xl w-full hover:bg-secondary-orange focus:outline-none"
                        >
                            Submit
                        </button>
                    </div>
                    <Link to="/categories" className="mt-10 text-center text-blue-200 underline">
                        Back to cartegories
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default EditCategoryForm;
