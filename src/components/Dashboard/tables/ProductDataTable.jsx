import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../../redux/slices/authSlice";
import axios from "../../../api/axios";

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 3)}</pre>
);

const ProductDataTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [deletingRowId, setDeletingRowId] = useState(null);

  const accessToken = useSelector(selectAccessToken);
  useEffect(() => {
    // Retrieve the data from localStorage and parse it
    const storedData = localStorage.getItem("Products");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFilteredData(parsedData);
    } else {
      // If the data is not in localStorage, set it from the props
      setFilteredData(data);
    }
  }, [data]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
      width: "300px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      width: "140px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Manufacturer",
      selector: (row) => row.manufacturer,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(row._id)} // Pass the row id to the delete function
            disabled={deletingRowId === row._id} // Disable the button while deleting
          >
            {deletingRowId === row._id ? "Deleting..." : "Delete"}
          </button>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>
      ),
    },
  ];

  const handleDelete = (rowId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setDeletingRowId(rowId);

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      };
      // Use Axios to send a DELETE request to your API endpoint
      axios
        .delete(`/api/products/${rowId}`, config)
        .then((response) => {
          if (response.status === 204) {
            toast("Product deleted successfully");
            // If the deletion was successful, update the table and the data in localStorage
            const updatedData = filteredData.filter(
              (item) => item.id !== rowId
            );
            setFilteredData(updatedData);
            localStorage.setItem("Products", JSON.stringify(updatedData));
            setTimeout(
              () => (window.location.href = "/dashboard/products"),
              2000
            );
          } else {
            toast("Failed to delete the product.");
          }
        })
        .catch((error) => {
          toast("Error deleting the product: " + error.message);
        })
        .finally(() => {
          setDeletingRowId(null);
        });
    }
  };

  const handleFilter = (text) => {
    setFilterText(text);

    const filtered = data.filter((item) => {
      return (
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        String(item.price).toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(text.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  const handleClear = () => {
    if (filterText) {
      setFilterText("");
      setFilteredData(data);
    }
  };

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
      <div className="input-group ms-auto m-2 w-25">
        <input
          className="form-control border-dark"
          type="text"
          name="filterBox"
          placeholder="Search..."
          value={filterText}
          onChange={(e) => handleFilter(e.target.value)}
        />
        <button
          className="btn btn-dark fw-semibold"
          type="button"
          id="button-addon2"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        highlightOnHover
        pointerOnHover
        pagination
        customStyles={customStyles}
        theme="customTheme"
        fixedHeader={true}
        fixedHeaderScrollHeight="475px"
        persistTableHead
        selectableRows
        expandableRows
        expandableRowsComponent={ExpandedComponent}
      />
    </div>
  );
};

export default ProductDataTable;
