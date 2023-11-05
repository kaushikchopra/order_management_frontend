import DashboardLayout from "./components/Dashboard/layout/DashboardLayout";
import { Routes, Route } from "react-router-dom"
import ProductPage from "./components/Customer/pages/ProductPage"
import CartPage from "./components/Customer/pages/CartPage"
import Dashboard from "./components/Dashboard/pages/Dashboard";
import Orders from "./components/Dashboard/pages/Orders";
import Products from "./components/Dashboard/pages/Products";
import AddProduct from "./components/Dashboard/forms/AddProduct";
import NotFound from "./components/NotFound";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ActivationSuccess from "./components/Auth/ActivationSuccess";
import ResendActivation from "./components/Auth/ResendActivation";
import ResetPassword from "./components/Auth/ResetPassword";
import Layout from "./components/Auth/Layout";
import RequireAuth from "./components/Auth/RequireAuth";
import PersistLogin from "./components/Auth/PersistLogin";
import CustomerLayout from "./components/Customer/layout/CustomerLayout";
import { ROLES } from "./config/roles"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="activation/:token" element={<ActivationSuccess />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="resend-activation" element={<ResendActivation />} />

        <Route path="/" element={<CustomerLayout />}>
          {/* Public Route */}
          <Route index element={<ProductPage />} />

          {/* Protected Routes */}
          {/* Customer / Common access routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Route>
        </Route>

        {/* Admin access routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route path="add_product" element={<AddProduct />} />
            </Route>
          </Route>

        </Route>
      </Route>
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
