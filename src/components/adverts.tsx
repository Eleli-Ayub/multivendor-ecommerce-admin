import { useState } from 'react';
import AdvertModal from '../components/Modals/AdvertsModal';
const Adverts = () => {
    const [toggle, settoggle] = useState(false);
    return (
        <div>
            Adverts
            <div className="flex">
                <button
                    className="bg-primary-orange  hover:bg-secondary-orange px-4 py-3 rounded  text-white"
                    onClick={() => settoggle(!toggle)}
                >
                    Create Ad
                </button>

                {toggle && <AdvertModal settoggle={settoggle} />}
            </div>
        </div>
    );
};

export default Adverts;
