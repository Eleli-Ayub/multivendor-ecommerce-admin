import React, { useState } from 'react';

type AppProps = { settoggle: (value: boolean) => void };

const AdvertsModal: React.FC<AppProps> = ({ settoggle }) => {
    const [formData, setFormData] = useState({
        package_name: '',
        price: 0.0,
        duration: 1,
    });

    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        if (type === 'file') {
            const selectedImage = e.target.files?.[0];
            if (selectedImage) {
                setImage(selectedImage);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(selectedImage);
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataWithImage = {
            ...formData,
            image,
        };

        // Your code for handling the form submission, including image upload
        console.log(formDataWithImage);

        // Reset form data and close modal if needed
        setFormData({
            package_name: '',
            price: 0.0,
            duration: 1,
        });
        setImage(null);
        setImagePreview(null);
    };

    return (
        <div>
            <div className="fixed inset-0 px-[10px] lg:px-5 min-h-full w-full bg-black-200/50 z-50 flex items-center  justify-center py-2 overflow-y-auto ">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white  rounded px-8 pt-6 pb-8 mb-4 w-[600px] h-[400px] "
                >
                    {/* ...other form inputs */}
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="image"
                        >
                            Image
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                        {imagePreview && (
                            <img src={imagePreview} alt="Image Preview" className="mt-2 max-h-32" />
                        )}
                    </div>
                    {/* ...other form inputs */}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-primary-orange hover:bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Create Ad
                        </button>
                        <button
                            className="hover:bg-primary-orange bg-secondary-orange text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => {
                                settoggle(false);
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

export default AdvertsModal;
