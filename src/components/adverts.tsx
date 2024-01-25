import { useEffect, useState } from "react";
import AdvertModal from "../components/Modals/AdvertsModal";
import {
  ActivateMainAd,
  DeactivateMainad,
  fetchMainAds,
} from "../Redux/slices/action.ads";
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

  function toggleProductStatus(advertid: any, isActive: Boolean): void {
    throw new Error("Function not implemented.");
  }
  async function deactivateProduct(advertid: any): Promise<void> {
    await DeactivateMainad(advertid);
    getMainAds();
  }

  async function activateProduct(advertid: any): Promise<void> {
    await ActivateMainAd(advertid);
    getMainAds();
  }

  function restoreProduct(advertid: any): void {
    throw new Error("Function not implemented.");
  }

  function deleteProduct(advertid: any): void {
    throw new Error("Function not implemented.");
  }

  function setAdID(advertid: any) {
    throw new Error("Function not implemented.");
  }

  function setIsEditing(arg0: boolean) {
    throw new Error("Function not implemented.");
  }

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
              onClick={() => toggleProductStatus(record.advertid, isActive)}
              className="underline"
            >
              {isActive ? (
                <span onClick={() => deactivateProduct(record.advertid)}>
                  Deactivate
                </span>
              ) : (
                <span onClick={() => activateProduct(record.advertid)}>
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
              <span onClick={() => restoreProduct(record.advertid)}>
                Restore
              </span>
            ) : (
              <span onClick={() => deleteProduct(record.advertid)}>Delete</span>
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
            onClick={() => toggleProductStatus(record?.advertid, isSuspended)}
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
              setAdID(record.advertid);
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
