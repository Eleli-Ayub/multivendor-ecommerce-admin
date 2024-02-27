// import React from "react";
import Sidebar from '../components/constants/Sidebar';
import EditCategoryForm from '../components/EditCategoryForm';

const EditCategoryPage = () => {
    return (
        <div className="flex pt-20">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1 p-5 mx-auto">
                <EditCategoryForm />
            </div>
        </div>
    );
};

export default EditCategoryPage;
