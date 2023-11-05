import Navbar from "../headers/Navbar";
import Sidebar from "../headers/Sidebar";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="mt-5 pt-3">
        <Outlet /> {/* context={orders} */}
      </main>
    </div>
  );
};

export default DashboardLayout;
