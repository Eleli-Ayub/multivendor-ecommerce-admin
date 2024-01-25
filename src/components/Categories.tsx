import { useDispatch, useSelector } from "react-redux";
import CategoriesTable from "../components/CategoriesTable";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FetchCategories } from "../Redux/Apis/category.actions";
import { setCategories } from "../Redux/slices/CategoriesSlice";
import { setLoader } from "../Redux/slices/Loaderslice";
import { axiosService } from "../Redux/helpers/axios";

const Categories = () => {
  const categories = useSelector((state: any) => state.categories.categories);
  const [subcategoryCounts, setSubcategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  const dispatch = useDispatch();

  const getcategories = async () => {
    try {
      dispatch(setLoader(true));
      const response = await FetchCategories();
      dispatch(setLoader(false));
      // toast.success("Categories loaded successfully");
      console.log(response);
      dispatch(setCategories(response.data.Data));
      // setMyCategories(response.data.Data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getcategories();
    console.log("Hello world");
  }, []);

  // Function to fetch subcategory counts based on category name
  const fetchSubcategoryCounts = async (categoryName: any) => {
    try {
      dispatch(setLoader(true));
      const response = await axiosService.get(
        `subcategories/getsubcategories/${categoryName}`
      );
      dispatch(setLoader(false));
      setSubcategoryCounts((prevCounts) => ({
        ...prevCounts,
        [categoryName]: response.data.Data.length,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch subcategory counts for each category
    categories.forEach((category: any) => {
      fetchSubcategoryCounts(category.categoryname);
    });
  }, [categories]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col mx-auto">
      <div className="bg-gray-300 p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <div className="flex gap-3 px-5">
            <button
              className="bg-primary-orange text-white px-2 rounded p-1"
              onClick={() => navigate("/new-category")}
            >
              Add category
            </button>
            <button
              className="bg-primary-orange text-white px-2 rounded p-1"
              onClick={() => navigate("/new-subcategory")}
            >
              Add Sub-category
            </button>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          {/* Total Ads */}
          <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-primary-orange">
              {categories.length}
            </h1>
            <p className="text-sm">Total Categories</p>
          </div>

          {/* Approved Ads
                    <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-semibold text-green-500">500</h1>
                        <p className="text-sm">Sub-categories</p>
                    </div> */}

          {/* Pending Ads */}
          {/* <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-semibold text-orange-300">300</h1>
                        <p className="text-sm">Brands</p>
                    </div> */}

          {/* Declined Ads */}
          {/* <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-red-600">5000</h1>
            <p className="text-sm">Mega Users</p>
          </div> */}

          {/* Closed Ads */}
          {/* <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-green-800">5000</h1>
            <p className="text-sm">Inactive users</p>
          </div> */}
        </div>
      </div>

      {/* second placeholder */}
      <div>
        <div>
          <h1>filters</h1>
          {/* List of ads goes here */}
        </div>
        <div>
          <CategoriesTable
            categories={categories}
            subcategoryCounts={subcategoryCounts}
            getcategories={getcategories}
          />
        </div>
      </div>
      {/* end of second placeholder */}
    </div>
  );
};

export default Categories;
