import { Money, MoneyOff, MoneySharp, People } from "@mui/icons-material";
import UsersTable from "../components/usersTable";
import { TbActivityHeartbeat } from "react-icons/tb";

const Users = () => {
  return (
    <div className="flex flex-col mx-auto">
      <div className="bg-white shadow-card p-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Users Overview</h1>
          <button className="bg-primary-orange text-white px-2 rounded p-1">
            Add User
          </button>
        </div>
        <div className="flex gap-5 flex-wrap">
          {/* Total Ads */}
          <div className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-orange-200 text-white ">
            <People className="text-white" />
            <div>
              <h1 className="text-2xl font-semibold text-white">5000</h1>
              <p className="text-sm">Total Users</p>
            </div>
          </div>

          {/* Approved Ads */}
          <div className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-orange-300 text-white ">
            <TbActivityHeartbeat size="32" className="text-white" />
            <div>
              <h1 className="text-2xl font-semibold text-white">5000</h1>
              <p className="text-sm">Active Users</p>
            </div>
          </div>
          <div className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-orange-400 text-white ">
            <MoneyOff className="text-white" />
            <div>
              <h1 className="text-2xl font-semibold text-white">5000</h1>
              <p className="text-sm">Freemium plan</p>
            </div>
          </div>

          {/* Pending Ads */}
          <div className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-orange-500 text-white ">
            <Money className="text-white" />
            <div>
              <h1 className="text-2xl font-semibold text-white">5000</h1>
              <p className="text-sm">Basic Plan</p>
            </div>
          </div>

          {/* Declined Ads */}
          <div className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-orange-600 text-white ">
            <Money className="text-white" />
            <div>
              <h1 className="text-2xl font-semibold text-white">5000</h1>
              <p className="text-sm">Standard Plan</p>
            </div>
          </div>

          {/* Closed Ads */}
          <div className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center justify-between bg-orange-700 text-white ">
            <MoneySharp className="text-white" />
            <div>
              <h1 className="text-2xl font-semibold text-white">5000</h1>
              <p className="text-sm">Basic Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* second placeholder */}
      <div>
        <div>
          <h1>filters</h1>
          {/* List of ads goes here */}
        </div>
        <div>
          <UsersTable />
        </div>
      </div>
      {/* end of second placeholder */}
    </div>
  );
};

export default Users;
