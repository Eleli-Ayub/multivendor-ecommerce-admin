import { useState, useEffect } from 'react';
import { axiosService } from '../../Redux/helpers/axios';

type AppProps = {
    settoggle: (value: boolean) => void;
    selectedPackage: {
        package_name: string;
        price: number;
        duration: number;
        package_id: any;
    } | null;
    setselectedPackage: (
        value: { package_name: string; price: number; duration: number; package_id: any } | null
    ) => void;

    fetchData: any;
};

const Package: React.FC<AppProps> = ({
    settoggle,
    selectedPackage,
    setselectedPackage,
    fetchData,
}) => {
    const [formData, setFormData] = useState({
        package_name: '',
        price: 0.0,
        duration: 1,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (selectedPackage) {
            setFormData({
                package_name: selectedPackage.package_name,
                price: selectedPackage.price,
                duration: selectedPackage.duration,
            });
        }
    }, [selectedPackage]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedPackage) {
            const url = '/packages/update';
            const payload = {
                ...formData,
                package_id: selectedPackage.package_id,
            };
            const response = axiosService.post(url, payload);
            console.log(response);
            settoggle(false);
            setselectedPackage(null);
            console.log(url);
            fetchData();
        } else {
            const url = '/packages/create';
            const response = axiosService.post(url, formData);
            console.log(response);
            fetchData();
            settoggle(false);
        }
    };
    return (
        <div>
            <div className="fixed inset-0 px-[10px] lg:px-5 min-h-full w-full bg-black-200/50 z-50 flex items-center  justify-center py-2 overflow-y-auto ">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-[600px] h-[400px] "
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="package_name"
                        >
                            Package Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="package_name"
                            type="text"
                            placeholder="Enter package name"
                            name="package_name"
                            value={formData.package_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="price"
                        >
                            Price
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="number"
                            step="0.01"
                            placeholder="Enter price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="duration"
                        >
                            Duration
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="duration"
                            type="text"
                            placeholder="Enter duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {selectedPackage ? ' Edit Package' : ' Create Package'}
                        </button>
                        <button
                            className="hover:bg-primary-orange bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={async () => {
                                settoggle(false);
                                console.log('Before setting to null:', selectedPackage);
                                setselectedPackage(null);
                                console.log('After setting to null:', selectedPackage);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Package;
