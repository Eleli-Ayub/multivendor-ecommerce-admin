import Adverts from '../components/adverts';

import Sidebar from '../components/constants/Sidebar';

const MainAds = () => {
    return (
        <div className="flex pt-20">
            <div>
                <Sidebar />
            </div>
            <div className="flex-1 p-5 mx-auto">
                <Adverts />
            </div>
        </div>
    );
};

export default MainAds;
