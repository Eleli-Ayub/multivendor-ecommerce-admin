import { Table } from "antd";
import { Delete, Edit } from "@mui/icons-material";
import { userData } from "../Data/users"; // Import the user data from your JSON file

const UsersTable = () => {
  const TableData = [
    {
      title: "First Name",
      dataIndex: "firstname",
    },
    {
      title: "Email",
      dataIndex: "Email",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text: any, record: any) => {
        console.log(record, text);
        return (
          <div className="flex mr-2 gap-3">
            <Edit className="text-green-500" />
            <Delete className="text-red-600" />
          </div>
        );
      },
    },
  ];

  return (
    <div className="mt-4">
      <Table
        columns={TableData}
        dataSource={userData} // Use the imported user data as the data source
        className="border rounded-sm"
      ></Table>
    </div>
  );
};

export default UsersTable;
