import { Table } from "antd";
// import { categories } from "../Data/categories";
import { useEffect, useState } from "react";
import {
  FetchCategories,
  deleteCategory,
} from "../Redux/Apis/category.actions";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../Redux/slices/Loaderslice";
import { toast } from "react-toastify";
import { setCategories } from "../Redux/slices/CategoriesSlice";
import { axiosService } from "../Redux/helpers/axios";
import { useNavigate } from "react-router-dom";

const CategoryTable = () => {
  // const [myCategories, setMyCategories] = useState();
  const navigate = useNavigate();
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
      title: "Name",
      dataIndex: "categoryname",
    },
    {
      title: "Subcategory Count",
      dataIndex: "categoryname", // Use the category name as the key
      render: (categoryName: string | number) =>
        subcategoryCounts[categoryName] || 0, // Display the subcategory count from the state or 0 if not available
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text: any, record: any) => {
        console.log(record, text);
        return (
          <div className="flex mr-2 gap-3">
            <Visibility
              className="text-primary-orange  "
              onClick={() => {
                navigate("/new-subcategory");
              }}
            />
            <Edit
              className="text-green-500 "
              onClick={() => {
                navigate("/new-subcategory");
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
      <Table
        columns={columns}
        dataSource={categories}
        className="border rounded-sm"
      />
    </div>
  );
};

export default CategoryTable;
