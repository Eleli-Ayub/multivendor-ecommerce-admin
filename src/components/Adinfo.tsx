import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { ProductData } from '../interface/common';
import { getSingleProduct } from '../Redux/Apis/ads.actions';
import { Facebook, Favorite, Phone, Reviews, WhatsApp, YouTube } from '@mui/icons-material';
import { Avatar } from 'antd';
import { Rating } from '@mui/material';
import { setLoader } from '../Redux/slices/Loaderslice';

function toggleIsActive() {}

function toggleIsApproved() {}

function toggleIsDeleted() {}

function toggleIsSuspended() {}

const ProductInfo = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [product, setProduct] = useState<ProductData | null>(null);
    const [productImages, setProductImages] = useState<any[]>([]);

    const dispatch = useDispatch();
    const { id } = useParams();

    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getSingleProduct(id);
            dispatch(setLoader(false));
            toast.success(response.message);
            setProduct(response.productdata);
            setProductImages(response.images);
        } catch (error: any) {
            toast.error(error);
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <section className=" bg-gray-light h-auto">
            <div className="flex flex-col md:flex-row gap-5 p-5 mb-10 h-auto">
                <div className="md:flex-1">
                    <div>
                        <h2 className="text-center text-2xl capitalize font-bold">
                            {product?.productname}
                        </h2>
                        <div className="flex flex-col gap-2 md:flex-row md:gap-5">
                            <span>Posted on: {product?.dateadded}</span>
                            <span>
                                Category: <i className="text-primary-orange">{product?.category}</i>
                            </span>
                            <span>
                                Brand: <i className="text-primary-orange">{product?.brand}</i>{' '}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-5">
                        <div className="md:flex-1">
                            <div className="flex flex-col gap-4">
                                <div style={{ height: '400px' }} className="">
                                    <img
                                        src={` ${productImages[selectedImageIndex]}`}
                                        className=" rounded-xl w-full max-h-full  object-cover object-center"
                                        alt=""
                                        style={{ height: '100%' }}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    {productImages?.map((image: any, index: number) => (
                                        <img
                                            key={index}
                                            src={`${image}`}
                                            className={
                                                'h-16 w-16 object-cover rounded-md bg-gray-100 cursor-pointer' +
                                                (index === selectedImageIndex
                                                    ? ' border-2 border-secondary-orange'
                                                    : '')
                                            }
                                            alt=""
                                            onClick={() => setSelectedImageIndex(index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex flex-col">
                        <div>
                            {' '}
                            <p className="text-2xl font-bold text-secondary-orange">
                                {' '}
                                Price: Ksh :{product?.productprice}
                            </p>
                        </div>
                        <div className=" border-gray-300 p-2 m-2 rounded">
                            <h1> Description:</h1>
                            <p className="text-gray-600">{product?.productdescription}</p>
                        </div>
                    </div>
                    <div className=" border-gray-300 p-2 m-2 rounded">
                        <h1> Location:</h1>
                        <p className="text-gray-600">Nairobi Area</p>
                    </div>

                    <div className="flex gap-5 items-center">
                        <div>
                            <Favorite className="text-secondary-orange font-bold  animate-pulse" />
                            <span className="text-gray-500">20</span>
                        </div>

                        <div>
                            <Reviews className="text-primary-orange font-bold " />
                            <span className="text-gray-500">20</span>
                        </div>
                        <div>
                            <Rating className="text-secondary-orange font-bold  " />
                            <span></span>
                        </div>
                    </div>
                </div>

                <div className="md-flex-1 p-4 ">
                    <div className="mt-2 rounded" style={{ height: 'auto' }}>
                        <div className="">
                            <div className="bg-neutral-200 p-6 rounded shadow-custom w-full">
                                <h1 className="center">Posted by:</h1>
                                <div className="flex gap-4">
                                    <div>
                                        <Avatar className="h-24 w-24" />
                                    </div>
                                    <div>
                                        <div>
                                            <p>Name: Jane Doe</p>
                                            <p>Phone: 0791088884</p>
                                            <p>Email: janedoe@gmail.com</p>
                                            <button className="bg-black-200 text-white px-10 py-2 mt-4 rounded hover:text-black-200 hover-bg-white transition-colors delay-300">
                                                View Shop
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <button className="p-2 rounded-full bg-gray-200">
                                        <WhatsApp className="text-green-500" />
                                    </button>
                                    <button className="p-2 rounded-full bg-gray-200">
                                        <Facebook className="text-blue-500" />
                                    </button>
                                    <button className="p-2 rounded-full bg-gray-200">
                                        <YouTube className="text-red-500" />
                                    </button>
                                    <button className="p-2 rounded-full bg-gray-200">
                                        <Phone />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row w-[100%] p-10 flex-wrap justify-around">
                {/* <div className="image-container">
                    <h2>Main image</h2>
                    <img
                        src={`${product?.mainimage}`}
                        alt="Main Image"
                        className="h-full w-full object-cover rounded"
                    />
                </div> */}
                <div className="w-full lg:w-[30%] rounded-[8px] no-scrollbar table-auto overflow-x-auto bg-white  shadow-md p-2">
                    <h2>Product Data</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Brand:</td>
                                <td>{product?.brand}</td>
                            </tr>
                            <tr>
                                <td>Category:</td>
                                <td>{product?.category}</td>
                            </tr>

                            <tr>
                                <td>Product Type:</td>
                                <td>{product?.producttype}</td>
                            </tr>
                            <tr>
                                <td>Quantity:</td>
                                <td>{product?.quantity}</td>
                            </tr>
                            <tr>
                                <td>Subcategory:</td>
                                <td>{product?.subcategory}</td>
                            </tr>
                            <tr>
                                <td>Total Bookmarks:</td>
                                <td>{product?.totalbookmarks}</td>
                            </tr>
                            <tr>
                                <td>Total Comments:</td>
                                <td>{product?.totalcomments}</td>
                            </tr>
                            <tr>
                                <td>Total Interactions:</td>
                                <td>{product?.totalinteractions}</td>
                            </tr>
                            <tr>
                                <td>Total Likes:</td>
                                <td>{product?.totallikes}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="w-full lg:w-[30%] rounded-[8px] no-scrollbar table-auto overflow-x-auto bg-white  shadow-md p-2">
                    <h2>Product Actions</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>IsActive:</td>
                                <td className="flex gap-6 ">
                                    {product?.isactive ? 'Active' : 'Deactivate'}
                                    <button className="ml-3px " onClick={toggleIsActive}>
                                        {product?.isactive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Is Active:</td>
                                <td className="flex gap-6 ">
                                    {product?.isactive ? 'Active' : 'Deactivate'}
                                    <button className="ml-3px " onClick={toggleIsActive}>
                                        {product?.isactive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Is Approved:</td>
                                <td className="flex gap-6 ">
                                    {product?.isapproved ? 'Yes' : 'No'}
                                    <button className="ml-3px " onClick={toggleIsApproved}>
                                        {product?.isapproved ? 'Revoke ' : 'Approve'}
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Is Deleted:</td>
                                <td className="flex gap-6 ">
                                    {product?.isdeleted ? 'Yes' : 'No'}
                                    <button className="ml-3px " onClick={toggleIsDeleted}>
                                        {product?.isdeleted ? 'Restore' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Is Suspended:</td>
                                <td className="flex gap-6 ">
                                    {product?.issuspended ? 'Yes' : 'No'}
                                    <button onClick={toggleIsSuspended}>
                                        {product?.issuspended ? 'Unsuspend' : 'Suspend'}
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>{' '}
                <div className="w-full lg:w-[30%] rounded-[8px] no-scrollbar table-auto overflow-x-auto bg-white  shadow-md p-2">
                    <h2>Product dates</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Date Added:</td>
                                <td>{product?.dateadded}</td>
                            </tr>
                            <tr>
                                <td>CreatedAt:</td>
                                <td>{product?.CreatedAt}</td>
                            </tr>
                            <tr>
                                <td>DeletedAt:</td>
                                <td>{product?.DeletedAt || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>UpdatedAt:</td>
                                <td>{product?.UpdatedAt}</td>
                            </tr>
                            <tr>
                                <td>Active Until:</td>
                                <td>{product?.activeuntil}</td>
                            </tr>
                            <tr>
                                <td>Last Updated:</td>
                                <td>{product?.lastupdated}</td>
                            </tr>
                            <tr>
                                <td>Latest Interactions:</td>
                                <td>{product?.latestinteractions}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ProductInfo;
