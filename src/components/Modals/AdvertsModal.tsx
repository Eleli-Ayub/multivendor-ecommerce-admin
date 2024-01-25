import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FetchCategories } from "../../Redux/Apis/category.actions";
import { setCategories } from "../../Redux/slices/CategoriesSlice";
import { setLoader } from "../../Redux/slices/Loaderslice";
import { createMainAd } from "../../Redux/slices/action.ads";

type AppProps = { settoggle: (value: boolean) => void };

const AdvertsModal: React.FC<AppProps> = ({ settoggle }) => {
  const categories = useSelector((state: any) => state.categories.categories);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    adname: "",
    adimage: "null",
    adcategory: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        dispatch(setLoader(true));
        const response = await FetchCategories();
        dispatch(setLoader(false));
        dispatch(setCategories(response.data.Data));
      } catch (error: any) {
        console.error(error);
        toast.error("Error loading categories");
      }
    };

    getCategories();
  }, [dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleimageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          const base64String = event.target.result as string;

          // Trim the base64 string to remove the data URL prefix
          const trimmedBase64 = base64String.split(",")[1];

          setFormData((prevData) => ({
            ...prevData,
            adimage: trimmedBase64, // Set adimage to the File object
          }));
        }
      };

      reader.readAsDataURL(file); // Convert the file to a base64 data URL
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(setLoader(true));

      await dispatch(await createMainAd(formData));

      toast.success("Ad created successfully");

      // Reset form data and close modal
      setFormData({
        adname: "",
        adimage: "",
        adcategory: "",
      });
      setImagePreview(null);
    } catch (error: any) {
      console.error(error);
      //   toast.error(error.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <div className="fixed inset-0 px-[10px] lg:px-5 min-h-full w-full bg-black-200/50 z-50 flex items-center  justify-center py-2 overflow-y-auto ">
      <form
        onSubmit={handleSubmit}
        className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-[600px] min-h-[400px] "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Image
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleimageChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mt-2 max-h-32"
            />
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="adname"
          >
            Ad name
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="adname"
            name="adname"
            type="text"
            value={formData.adname}
            onChange={handleInputChange}
            placeholder="Enter your ad name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="adcategory"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category Name:
          </label>
          <select
            id="adcategory"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-primary-orange"
            value={formData.adcategory}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                adcategory: e.target.value,
              }))
            }
            required
          >
            <option value="">Select Category</option>
            {categories?.map((category: any) => (
              <option key={category.categoryname} value={category.categoryname}>
                {category.categoryname}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Ad
          </button>
          <button
            className="hover:bg-primary-orange bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              settoggle(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdvertsModal;
