import React, { useEffect, useCallback, useMemo, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";

import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../redux/slices/authSlice";
import axios from "../../../api/axios";

// Product data display on row expansion
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 3)}</pre>
);

// Custom Status Dropdown
const StatusDropdown = ({ status, onStatusChange, orderId, accessToken }) => {
  const statusOptions = [
    "Pending",
    "Accepted",
    "Rejected",
    "Packed",
    "Dispatched",
    "Delivered",
    "Returned",
  ];

  // Update the Order Status - API
  const handleStatusChange = async (newStatus) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };
      // Make an Axios PUT request to update the order status
      await axios.put(`/api/orders`, { orderId, newStatus }, config);

      onStatusChange(newStatus);
    } catch (error) {
      console.error(`Error updating order status: ${error}`);
    }
  };

  return (
    <select
      className="form-select bg-dark text-light"
      value={status}
      onChange={(e) => handleStatusChange(e.target.value)}
      style={{ fontSize: "0.75rem" }}
    >
      {statusOptions.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

// Date formatting (YYYY-MM-DD)
const formatDate = (date) => {
  if (!date) return "";

  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const day = String(formattedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Order Data Table starts here
const OrderDataTable = ({ data }) => {
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const accessToken = useSelector(selectAccessToken);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  useEffect(() => {
    // Update filtered data when data changes
    setFilteredData(data);
  }, [data]);

  const handleDeleteOrder = async (orderId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };
      // Send a request to delete the order by ID
      await axios.delete(`/api/orders/${orderId}`, config);
      // Remove the deleted order from the table
      const updatedData = data.filter((row) => row._id !== orderId);
      setFilteredData(updatedData);
    } catch (error) {
      console.error(`Error deleting order: ${error.message}`);
    }
  };

  const handleFilter = (text) => {
    setFilterText(text);
    const filtered = data.filter((item) => {
      return (
        item.user.fullName.toLowerCase().includes(text.toLowerCase()) ||
        item.totalAmount
          .toString()
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        formatDate(item.orderDate).toLowerCase().includes(text.toLowerCase()) ||
        item.billingInformation.toLowerCase().includes(text.toLowerCase()) ||
        item.status.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
        setFilteredData(data);
      }
    };

    return (
      <div className="input-group ms-auto my-2 w-25">
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => handleFilter(e.target.value)}
        />
        <button
          className="btn btn-outline-light fw-semibold"
          type="button"
          id="button-addon2"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    );
    // eslint-disable-next-line
  }, [filterText, data]);

  // Column data
  const columns = [
    {
      name: "User Name",
      selector: (row) => row.user.fullName,
      sortable: true,
    },
    {
      name: "Product (Quant)",
      cell: (row) => (
        <ul className="p-0">
          {row.products.map((product, index) => (
            <li key={index}>
              {product.name} ({product.quantity})
            </li>
          ))}
        </ul>
      ),
      sortable: false,
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => formatDate(row.orderDate),
      sortable: true,
    },
    {
      name: "Billing Info",
      selector: (row) => row.billingInformation,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <StatusDropdown
          status={row.status}
          onStatusChange={(newStatus) => {
            const updatedData = data.map((item) =>
              item.user === row.user ? { ...item, status: newStatus } : item
            );
            setFilteredData(updatedData);
          }}
          orderId={row._id}
          accessToken={accessToken}
        />
      ),
      sortable: true,
      sortFunction: (rowA, rowB, desc) => {
        const statusA = rowA.status;
        const statusB = rowB.status;
        const order = desc ? -1 : 1; // Adjust the order based on ascending or descending

        return statusA.localeCompare(statusB) * order;
      },
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          onClick={() => handleDeleteOrder(row._id)}
          className="btn btn-danger"
          style={{ fontSize: "0.75rem" }}
        >
          Delete
        </button>
      ),
    },
  ];

  // Define custom styles
  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
        background: "#fff",
        color: "#000",
      },
    },
    headCells: {
      style: {
        fontSize: "1.1rem",
      },
    },
    cells: {
      style: {
        fontSize: ".75rem",
      },
    },
  };

  // Create a custom theme
  createTheme(
    "customTheme",
    {
      text: {
        primary: "#fff",
        secondary: "#2aa198",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#212529",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
      },
    },
    "dark"
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={filteredData}
        highlightOnHover
        pagination
        fixedHeader={true}
        fixedHeaderScrollHeight="475px"
        pointerOnHover
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        customStyles={customStyles}
        theme="customTheme"
        selectableRows
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        persistTableHead
        contextActions={
          <button
            onClick={() => {
              if (
                window.confirm(
                  `Are you sure you want to delete the selected row(s)?`
                )
              ) {
                const updatedData = data.filter(
                  (row) => !selectedRows.includes(row)
                );
                setToggleCleared(!toggleCleared);
                setSelectedRows([]);
                setFilteredData(updatedData);
              }
            }}
          >
            Delete
          </button>
        }
      />
    </div>
  );
};

export default OrderDataTable;
