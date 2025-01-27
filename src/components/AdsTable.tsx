import { Table } from "antd";
import { Visibility } from "@mui/icons-material";
import {
  ActivateProduct,
  DeactivateProduct,
  DeleteProduct,
  RestoreProduct,
} from "../Redux/Apis/ads.actions";
import { ApproveProduct } from "../Redux/Apis/ads.actions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../Redux/slices/Loaderslice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../Redux/store";
import { FetchProductsAsync } from "../Redux/slices/AdsSlice";
import Loader from "./constants/loader";

type AdFormProps = {
  Ads: any;
};

const AdsTable: React.FC<AdFormProps> = ({ Ads }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: any) => state.AllAds.isLoading);
  const products = Ads;
  // console.log(products);

  const approveProduct = async (id: any) => {
    try {
      dispatch(setLoader(true));
      const response = await ApproveProduct(id);
      console.log(response);
      toast.success("product approved successfully...");
      dispatch(setLoader(false));
      dispatch(FetchProductsAsync());
    } catch (error) {
      toast.error("failed to approve, try again later");
    }
  };

  const deactivateProduct = async (id: any) => {
    try {
      dispatch(setLoader(true));
      const response = await DeactivateProduct(id);
      console.log(response);
      toast.success("product deactivated successfully...");
      dispatch(setLoader(false));
      dispatch(FetchProductsAsync());
    } catch (error) {
      toast.error("failed to deactivate, try again later");
    }
  };
  const activateProduct = async (id: any) => {
    try {
      dispatch(setLoader(true));
      const response = await ActivateProduct(id);
      console.log(response);
      toast.success("product activated successfully...");
      dispatch(setLoader(false));
      dispatch(FetchProductsAsync());
    } catch (error) {
      toast.error("failed to activate, try again later");
    }
  };

  const deleteProduct = async (id: any) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      console.log(response);
      toast.success("product deleted successfully...");
      dispatch(setLoader(false));
      dispatch(FetchProductsAsync());
    } catch (error) {
      toast.error("failed to delete, try again later");
    }
  };

  const restoreProduct = async (id: any) => {
    try {
      dispatch(setLoader(true));
      const response = await RestoreProduct(id);
      console.log(response);
      toast.success("product restored successfully...");
      dispatch(setLoader(false));
      dispatch(FetchProductsAsync());
    } catch (error) {
      toast.error("failed to restore, try again later");
    }
  };

  // const rejectProduct = async (id: any) => {
  //   try {
  //     dispatch(setLoader(true));
  //     const response = await RejectProduct(id);
  //     console.log(response);
  //     toast.success("product rejectedsuccessfully...");
  //     dispatch(setLoader(false));
  //     fetchProducts();
  //   } catch (error) {}
  // };

  const toggleProductStatus = async (_productId: any, _isActive: any) => {
    try {
      // Update product status here
      dispatch(FetchProductsAsync());
    } catch (error) {
      console.log(error);
    }
  };

  // const viewProduct = (productId: any) => {
  //     // Implement the action to view the product here
  //     console.log('Viewing product with ID:', productId);
  // };

  const TableData = [
    {
      title: "Name",
      dataIndex: "productname",
      render: (text: string) => (
        <div
          style={{
            maxHeight: "50px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isactive",
      render: (isActive: Boolean, record: any) => (
        <span>
          <span className="flex gap-2">
            <span style={{ color: isActive ? "green" : "red" }}>&bull;</span>
            <span style={{ color: isActive ? "green" : "red" }}>
              {isActive ? "Active" : "Inactive"}
            </span>
            <span
              onClick={() => toggleProductStatus(record.productid, isActive)}
              className="underline"
            >
              {isActive ? (
                <span onClick={() => deactivateProduct(record.producttid)}>
                  Deactivate
                </span>
              ) : (
                <span onClick={() => activateProduct(record.producttid)}>
                  Activate
                </span>
              )}
            </span>
          </span>
        </span>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "DateAdded",
      dataIndex: "dateadded",
    },
    {
      title: "IsApproved",
      dataIndex: "isapproved",
      render: (isApproved: Boolean, record: any) => (
        <span className="flex gap-2">
          <span style={{ color: isApproved ? "green" : "red" }}>
            {isApproved ? "Approved" : "Pending"}
          </span>
          <span
            onClick={() => toggleProductStatus(record.productid, isApproved)}
            className="underline"
          >
            {isApproved ? (
              <div className="flex gap-2">
                {/* <span>Deactivate</span>
                <span>Suspend</span> */}
              </div>
            ) : (
              <div className="flex gap-2">
                <span
                  onClick={() => approveProduct(record.producttid)}
                  className="cursor-pointer"
                >
                  Approve
                </span>
                <span>Reject</span>
              </div>
            )}
          </span>
        </span>
      ),
    },

    {
      title: "IsDeleted",
      dataIndex: "isdeleted",
      render: (isDeleted: Boolean, record: any) => (
        <span className="flex gap-2 cursor-pointer">
          {isDeleted ? "Deleted" : "No"}
          <span
            onClick={() => toggleProductStatus(record.productid, isDeleted)}
            className="underline"
          >
            {isDeleted ? (
              <span onClick={() => restoreProduct(record.producttid)}>
                Restore
              </span>
            ) : (
              <span onClick={() => deleteProduct(record.producttid)}>
                Delete
              </span>
            )}
          </span>
        </span>
      ),
    },
    {
      title: "IsSuspended",
      dataIndex: "issuspended",
      render: (isSuspended: Boolean, record: any) => (
        <span className="flex gap-2">
          {isSuspended ? "Suspended" : "No"}
          <span
            onClick={() => toggleProductStatus(record.productid, isSuspended)}
            className="underline"
          >
            {isSuspended ? "Unsuspend" : "Suspend"}
          </span>
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_text: any, record: any) => (
        <div className="flex mr-2 gap-3">
          <Visibility
            className="text-primary-orange"
            onClick={() => navigate(`/details/${record.producttid}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 table-responsive">
      {isLoading && <Loader />}
      <Table
        columns={TableData}
        dataSource={products}
        className="rounded-[10px] table-responsive"
      />
    </div>
  );
};

export default AdsTable;
