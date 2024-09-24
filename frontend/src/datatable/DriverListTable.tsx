import MUIDataTable from "mui-datatables";
import { Button } from "@/components/ui/button";

const DriverListTable = () => {
  const columns = [
    {
      name: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Employee Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Father's Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Mobile Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Aadhar Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "License Number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "License Expiry",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    {
      name: "Last Updated",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    {
      name: "Active",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return value ? "Yes" : "No";
        },
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (_value: any, tableMeta: { rowIndex: any; }, updateValue: any) => {
          const { rowIndex } = tableMeta;
          return (
            <div>
              <Button type="submit" className="bg-violet-400 text-white rounded-full px-3 py-1 w-full md:w-auto mx-auto">
                Edit
              </Button>
              <Button type="submit" className="bg-violet-400 text-white rounded-full px-3 py-1 w-full md:w-auto mx-auto">
                Delete
              </Button>
            </div>
          );
        },
      },
    },
  ];

  const data = [
    ["Joe James", "1234567890", "John Doe", "123 Main St", "1234567890", "123456789012", "1234567890", new Date().toISOString(), new Date().toISOString(), true],
    ["John Walsh", "9876543210", "Jane Doe", "456 Main St", "9876543210", "987654321012", "9876543210", new Date().toISOString(), new Date().toISOString(), true],
    ["Bob Herm", "8765432109", "Michael Johnson", "789 Main St", "8765432109", "876543210912", "8765432109", new Date().toISOString(), new Date().toISOString(), true],
    ["James Houston", "7654321098", "Emily Smith", "654 Main St", "7654321098", "765432109812", "7654321098", new Date().toISOString(), new Date().toISOString(), true],
    ["Alice Johnson", "6543210987", "David Lee", "543 Main St", "6543210987", "654321098712", "6543210987", new Date().toISOString(), new Date().toISOString(), true],
  ];

  const options = {
    
    filter: true,
    sort: true,
    pagination: true,
    rowsPerPage: 5,
    selectableRows: true,
    selectableRowsOnClick: true,
    onRowClick: (rowData: any, rowState: any) => {
      // Handle row click event
      console.log("Row clicked:", rowData, rowState);
    },
  };

  return (
    <div className="container mt-10 text-sm">
      <Button type="submit" className="bg-violet-400 text-white rounded-full px-8 py-5 w-full md:w-auto mx-auto" style={{ marginBottom : 32 }} onClick={() => {
                // Navigate to the home page
                window.location.href = '/inventory-driver';
              }}>
        Create New Driver
      </Button>
      <MUIDataTable
        title="Driver List"
        data={data}
        columns={columns}
        //options={{ ...options }}
      />
    </div>
  );
};

export default DriverListTable;