import { useEffect, useState } from "react";
import AdvertModal from "../components/Modals/AdvertsModal";
import { fetchMainAds } from "../Redux/slices/action.ads";
import { Visibility, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
const Adverts = () => {
  const [toggle, settoggle] = useState(false);
  const [adimages, setAdimages] = useState();
  const navigate = useNavigate();

  const getMainAds = async () => {
    const response = await fetchMainAds();
    const data = response.data.Data;
    setAdimages(data);
  };

  useEffect(() => {
    getMainAds();
  }, []);

  const TableData = [
    {
      title: "Name",
      dataIndex: "adname",
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
    // {
    //   title: "Brand",
    //   dataIndex: "brand",
    // },
    // {
    //   title: "Category",
    //   dataIndex: "category",
    // },
    {
      title: "DateAdded",
      dataIndex: "datecreated",
      render: (datecreated: string) => {
        <p>{new Date(datecreated).toLocaleDateString()}</p>;
      },
    },
    {
      title: "IsApproved",
      dataIndex: "isapproved",

      render: (isApproved: Boolean) => (
        <span className="flex gap-2">
          <span style={{ color: isApproved ? "green" : "red" }}>
            {isApproved ? "Approved" : "Pending"}
          </span>
        </span>
      ),
      // filters: [
      //   { text: "Approved", value: "true" },
      //   { text: "Pending", value: "false" },
      // ],
      // onFilter: (value: any, record: any) => {
      //   console.log(value);
      //   return record.isapproved === value;
      // },
    },

    {
      title: "IsDeleted",
      dataIndex: "isdeleted",
      render: (isDeleted: Boolean, record: any) => (
        <span className="flex gap-2">
          {isDeleted ? "Deleted" : "No"}
          <span
            onClick={() => toggleProductStatus(record.productid, isDeleted)}
            className="underline cursor-pointer"
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
      render: (isSuspended: Boolean, _record: any) => (
        <span className="flex gap-2">
          {isSuspended ? "Suspended" : "No"}
          {/* <span
        onClick={() => toggleProductStatus(record.productid, isSuspended)}
        className="underline"
      >
        {isSuspended ? "Unsuspend" : "Suspend"}
      </span> */}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text: any, record: any) => (
        <div className="flex mr-2 gap-3">
          <Visibility
            className="text-primary-orange"
            onClick={() => {
              navigate(`/main/${record.advertid}`), console.log(text);
            }}
          />
          <Edit
            className="text-green-500"
            onClick={() => {
              setAdID(record.producttid);
              setIsEditing(true);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      Adverts
      <div className="flex flex-col">
        <button
          className="bg-primary-orange  hover:bg-secondary-orange px-4 py-3 rounded  text-white"
          onClick={() => settoggle(!toggle)}
        >
          Create Main Ad
        </button>

        {toggle && <AdvertModal settoggle={settoggle} />}
        <div className=" mt-4 table-responsive px-[10px] lg:px-0">
          <Table
            columns={TableData}
            dataSource={adimages}
            className="border rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Adverts;
function toggleProductStatus(productid: any, isActive: Boolean): void {
  throw new Error("Function not implemented.");
}

function deactivateProduct(producttid: any): void {
  throw new Error("Function not implemented.");
}

function activateProduct(producttid: any): void {
  throw new Error("Function not implemented.");
}

function restoreProduct(producttid: any): void {
  throw new Error("Function not implemented.");
}

function deleteProduct(producttid: any): void {
  throw new Error("Function not implemented.");
}

function setAdID(producttid: any) {
  throw new Error("Function not implemented.");
}

function setIsEditing(arg0: boolean) {
  throw new Error("Function not implemented.");
}
