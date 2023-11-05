import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";

const Sidebar = () => {
  return (
    <div
      className="offcanvas offcanvas-start sidebar-nav bg-dark text-white"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-body p-0 mt-3">
        <nav className="navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="text-white small fw-bold text-uppercase px-3 mb-3">
                Core
              </div>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-3 d-flex align-items-center"
                to="/dashboard"
              >
                <MdDashboard size={20} />{" "}
                <span className="mx-2">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-3 d-flex align-items-center"
                to="/dashboard/orders"
              >
                <BsFillCartCheckFill size={20} />
                <span className="mx-2">Orders</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link px-3 d-flex align-items-center"
                to="/dashboard/products"
              >
                <MdProductionQuantityLimits size={20} />
                <span className="mx-2">Products</span>
              </Link>
            </li>
            <hr />
            <li>
              <Link
                className="nav-link px-3 sidebar-link d-flex align-items-center"
                data-bs-toggle="collapse"
                to="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <FaUsers size={20} /> <span className="mx-2">Users</span>{" "}
                <span className="right-icon ms-auto">
                  <BiChevronDown />
                </span>
              </Link>
              <div className="collapse" id="collapseExample">
                <div>
                  <ul className="navbar-nav ps-3">
                    <li className="nav-item px-4">
                      <Link className="nav-link" to="/dashboard/employees">
                        Employees
                      </Link>
                    </li>
                    <li className="nav-item px-4">
                      <Link className="nav-link" to="/dashboard/customers">
                        Customers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
