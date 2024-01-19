import Sidebar from '../components/constants/Sidebar';
import Inquiries from '../components/Inquiries/Inquiry';

const InquiriesPage = () => {
    return (
        <div className="flex pt-20">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1 p-5 mx-auto">
                <Inquiries />
            </div>
        </div>
    );
};

export default InquiriesPage;
