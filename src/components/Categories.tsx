import CategoriesTable from "../components/CategoriesTable";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col mx-auto">
      <div className="bg-gray-300 p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Overview</h1>
          <button
            className="bg-primary-orange text-white px-2 rounded p-1"
            onClick={() => navigate("/new-category")}
          >
            Add category
          </button>
        </div>
        <div className="flex gap-5 flex-wrap">
          {/* Total Ads */}
          <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-primary-orange">100</h1>
            <p className="text-sm">Total Categories</p>
          </div>

          {/* Approved Ads */}
          <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-green-500">500</h1>
            <p className="text-sm">Sub-categories</p>
          </div>

          {/* Pending Ads */}
          <div className="bg-gray-light p-4 rounded-xl h-32 w-44 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold text-orange-300">300</h1>
            <p className="text-sm">Brands</p>
          </div>

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
          <CategoriesTable />
        </div>
      </div>
      {/* end of second placeholder */}
    </div>
  );
};

export default Categories;
