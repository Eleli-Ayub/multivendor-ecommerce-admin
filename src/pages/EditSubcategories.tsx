// import React from "react";
import Sidebar from '../components/constants/Sidebar';
import EditSubcategoryForm from '../components/EditSubcategories';

const EditSubcategoryPage = () => {
    return (
        <div className="flex pt-20">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1 p-5 mx-auto">
                <EditSubcategoryForm />
            </div>
        </div>
    );
};

export default EditSubcategoryPage;
