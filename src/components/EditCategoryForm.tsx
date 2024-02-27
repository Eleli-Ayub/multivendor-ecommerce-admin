import React, { useState } from 'react';
import { EditCategory } from '../Redux/Apis/category.actions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';

type AppProps = { id: any; setIsEditing: any; categoryName: any };

const EditCategoryForm: React.FC<AppProps> = ({ id, setIsEditing, categoryName }) => {
    // const { id } = useParams();
    const [formData, setFormData] = useState({
        categoryname: categoryName,
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
        <div className="fixed inset-0 px-[10px] lg:px-5 min-h-full w-full bg-black-200/50 z-50 flex items-center  justify-center py-2 overflow-y-auto ">
            <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-[700px] min-h-[400px] ">
                <div className="flex  justify-end" onClick={() => setIsEditing(false)}>
                    <Close className="bg-gray-200 p-[4px] text-[40px] rounded-full font-bold" />
                </div>
                <div className="">
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
                        <div className="flex justify-center">
                            <Link
                                to="/categories"
                                className="mt-10 text-center text-blue-400 underline"
                            >
                                Back to categories
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCategoryForm;
