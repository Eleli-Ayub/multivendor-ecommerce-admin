import { Money, MoneyOff, MoneySharp, Pending, People } from '@mui/icons-material';
import UsersTable from '../components/usersTable';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../Redux/store';
import { getAllUsers } from '../Redux/slices/AuthSlice';

const Users = () => {
    const users = useSelector((state: any) => state.auth.users);
    const siteUsers = users;
    const [filterdUsers, setfilterdUsers] = useState(users);
    console.log(users);

    const allUsers = siteUsers;
    const approvedUsers = siteUsers?.filter((user: any) => user.isApproved);
    const pendingUsers = siteUsers?.filter((user: any) => user.isApproved);
    const freemiumPlanUsers = siteUsers?.filter((user: any) => user.packagetype === 'freemium');
    const basicPlanUsers = siteUsers?.filter((user: any) => user.packagetype === 'basic');
    const standardPlanUsers = siteUsers?.filter((user: any) => user.packagetype === 'standard');
    const premiumPlanUsers = siteUsers?.filter((user: any) => user.packagetype === 'premium');

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    return (
        <div className="flex flex-col mx-auto">
            <div className="bg-white shadow-card p-5">
                <div className="flex cusrsor-pointer justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Users Overview</h1>
                    <button className="bg-primary-orange text-white px-2 rounded p-1">
                        Add User
                    </button>
                </div>
                <div className="flex gap-5 flex-wrap">
                    {/* Total Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-200 text-white  "
                        onClick={() => setfilterdUsers(allUsers)}
                    >
                        <People className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {allUsers?.length}
                            </h1>
                            <p className="text-sm">All users</p>
                        </div>
                    </div>

                    {/* Approved Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-300 text-white "
                        onClick={() => setfilterdUsers(approvedUsers)}
                    >
                        <TbActivityHeartbeat size="32" className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {approvedUsers?.length}
                            </h1>
                            <p className="text-sm">Approved Users</p>
                        </div>
                    </div>
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-400 text-white "
                        onClick={() => setfilterdUsers(pendingUsers)}
                    >
                        <Pending className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {pendingUsers?.length}
                            </h1>
                            <p className="text-sm">Pending users</p>
                        </div>
                    </div>
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-500 text-white "
                        onClick={() => setfilterdUsers(freemiumPlanUsers)}
                    >
                        <MoneyOff className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {freemiumPlanUsers?.length}
                            </h1>
                            <p className="text-sm">Freemium plan</p>
                        </div>
                    </div>

                    {/* Pending Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-600 text-white "
                        onClick={() => setfilterdUsers(basicPlanUsers)}
                    >
                        <Money className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {basicPlanUsers?.length}
                            </h1>
                            <p className="text-sm">Basic Plan</p>
                        </div>
                    </div>

                    {/* Declined Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-700 text-white "
                        onClick={() => setfilterdUsers(standardPlanUsers)}
                    >
                        <Money className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {standardPlanUsers?.length}
                            </h1>
                            <p className="text-sm">Standard Plan</p>
                        </div>
                    </div>

                    {/* Closed Ads */}
                    <div
                        className="p-4 rounded h-[100px] w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-800 text-white "
                        onClick={() => setfilterdUsers(premiumPlanUsers)}
                    >
                        <MoneySharp className="text-white" />
                        <div>
                            <h1 className="text-2xl font-semibold text-white">
                                {premiumPlanUsers?.length}
                            </h1>
                            <p className="text-sm">premium Plan</p>
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
                    <UsersTable users={filterdUsers} />
                </div>
            </div>
            {/* end of second placeholder */}
        </div>
    );
};

export default Users;
