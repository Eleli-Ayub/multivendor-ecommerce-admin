// import React from "react";
import Sidebar from '../components/constants/Sidebar';
import Packages from '../components/packages';

const PackagesPage = () => {
    return (
        <div className="flex pt-20">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1 p-5 mx-auto">
                <Packages />
            </div>
        </div>
    );
};

export default PackagesPage;
