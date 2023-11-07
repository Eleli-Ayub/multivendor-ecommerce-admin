import React, { useState } from "react";
import { createCategory } from "../Redux/Apis/category.actions";

// type CategoryFormProps = {
//   onSubmit: (formData: { categoryname: string; categoryimage: string }) => void;
// };

const CategoryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    categoryname: "",
    categoryimage: "",
  });

  const resetForm = () => {
    setFormData({
      categoryname: "",
      categoryimage: "",
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createCategory(formData);
      console.log(response);
      console.log("Success");
    } catch (error) {
      console.log(error);
    }

    resetForm();
  };

  return (
    <div className="flex justify-center h-screen bg-white py-10">
      <div className="bg-white h-96 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
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
          <div className="mb-4">
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
              placeholder="Enter Category Image URL"
              required
            />
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-primary-orange px-4 py-2 text-white rounded-xl w-full hover:bg-secondary-orange focus:outline-none"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
