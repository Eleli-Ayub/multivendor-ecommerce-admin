import { Money, MoneySharp, Pending, People } from '@mui/icons-material';
import UsersTable from '../components/usersTable';
import { TbActivityHeartbeat } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../Redux/store';
import { getAllUsers } from '../Redux/slices/AuthSlice';
import { Card, Skeleton } from 'antd';

const Users = () => {
    const users = useSelector((state: any) => state.auth.users);
    const isLoading = useSelector((state: any) => state.auth.isLoading);
    const siteUsers = users;
    const [filterdUsers, setfilterdUsers] = useState(users);
    // console.log(users);

    const allUsers = siteUsers;
    const approvedUsers = siteUsers?.filter((user: any) => user.isapproved);
    const pendingUsers = siteUsers?.filter((user: any) => !user.isapproved);
    //   const freemiumPlanUsers = siteUsers?.filter(
    //     (user: any) => user.packagetype === "freemium"
    //   );
    const basicPlanUsers = siteUsers?.filter((user: any) => user.packagetype === 'basic');
    const standardPlanUsers = siteUsers?.filter((user: any) => user.packagetype === 'standard');
    const premiumPlanUsers = siteUsers?.filter((user: any) => user.packagetype === 'premium');

    const dispatch = useDispatch<AppDispatch>();

    const totalPercentage = (allUsers?.length / users?.length) * 100;
    const approvedPercentage = (approvedUsers?.length / users?.length) * 100;
    const pendingPercentage = (pendingUsers?.length / users?.length) * 100;
    //   const freemiumPercentage = (freemiumPlanUsers?.length / users?.length) * 100;
    const basicPercentage = (basicPlanUsers?.length / users?.length) * 100;
    const standardPercentage = (standardPlanUsers?.length / users?.length) * 100;
    const preemiumPercentage = (premiumPlanUsers?.length / users?.length) * 100;
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);
    useEffect(() => {
        setfilterdUsers(allUsers);
    }, [allUsers]);

    return (
        <div className="flex flex-col mx-auto p-3 w-full overflow-x-auto ">
            <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                {/* with half */}

                <Card className="w-full lg:w-[40%] h-auto rounded-[20px] shadow-sm">
                    <Skeleton loading={isLoading}>
                        <h1 className="text-2xl font-semibold text-center">User's Stats</h1>

                        <div className="flex flex-col mx-auto gap-6 max-w-2xl px-5 pb-5 mt-5">
                            <div>
                                <span className="text-black">Total</span>
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                        <div
                                            className="bg-primary-orange h-full rounded-sm"
                                            style={{ width: `${totalPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="text-black">Approved</span>
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                        <div
                                            className="bg-green-500 h-full rounded-sm"
                                            style={{ width: `${approvedPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="text-black">Pending</span>
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                        <div
                                            className="bg-orange-400  h-full rounded-sm"
                                            style={{ width: `${pendingPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="text-black">Basic</span>
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                        <div
                                            className=" bg-green-800 h-full rounded-sm"
                                            style={{ width: `${basicPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="text-black">Standard</span>
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                        <div
                                            className=" bg-green-800 h-full rounded-sm"
                                            style={{ width: `${standardPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <span className="text-black">Premium</span>
                                <div className="relative">
                                    <div className="w-full bg-gray-200 rounded-sm   h-[10px]">
                                        <div
                                            className=" bg-green-800 h-full rounded-sm"
                                            style={{ width: `${preemiumPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Skeleton>
                </Card>

                <Card className=" w-full lg:w-[60%] h-auto rounded-[20px] shadow-sm ">
                    <Skeleton loading={isLoading}>
                        <div className="flex cusrsor-pointer justify-center gap-5 lg:justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold">Users Overview</h1>
                            {/* <button className="bg-primary-orange text-white px-2 rounded p-1">
              Add User
            </button> */}
                        </div>
                        <div className="flex gap-5 flex-wrap items-center justify-center lg:justify-normal">
                            {/* Total Ads */}
                            <div
                                className="p-4 rounded h-[100px]  w-[30vw] lg:w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-200 text-white  "
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
                                className="p-4 rounded h-[100px]  w-[30vw] lg:w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-300 text-white "
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
                                className="p-4 rounded h-[100px]  w-[30vw] lg:w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-400 text-white "
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

                            {/* Pending Ads */}
                            <div
                                className="p-4 rounded h-[100px]  w-[30vw] lg:w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-600 text-white "
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
                                className="p-4 rounded h-[100px]  w-[30vw] lg:w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-700 text-white "
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
                                className="p-4 rounded h-[100px]  w-[30vw] lg:w-[220px] shadow-custom flex items-center cusrsor-pointer justify-between bg-orange-800 text-white "
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
                    </Skeleton>
                </Card>
            </div>

            {/* second placeholder */}
            <div>
                <div>
                    {/* <h1>filters</h1> */}
                    {/* List of ads goes here */}
                </div>
                <div className="mt-4">
                    <Card>
                        <Skeleton loading={isLoading}>
                            <UsersTable users={filterdUsers} />
                        </Skeleton>
                    </Card>
                </div>
            </div>
            {/* end of second placeholder */}
        </div>
    );
};

export default Users;
