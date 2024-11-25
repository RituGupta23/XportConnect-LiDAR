import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ShipmentManagement from "./pages/ShipmentManagement";
import QueryManagement from "./pages/QueryManagement";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext"; // <-- Importing useAuth for role-based routes
import AddProduct from "./pages/AddProduct";
import SellerProducts from "./pages/SellerProducts";
import AllProducts from "./pages/AllProducts";
import CustomerOrders from "./pages/CustomerOrders";
import OrderProduct from "./pages/OrderProduct";
import Claim from "./pages/Claim";
import PackagingRecommendation from "./pages/Packaging";
import ClaimStatus from "./pages/ClaimStatus";
import TrackingTimeline from "./pages/TrackingTimeline";
import SellerOrders from "./pages/SellerOrders";
import Preshipment from "./pages/Preshipment";
import CustomerHome from "./pages/CustomerHome";

// Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const App = () => {
  const { isSeller, isCustomer } = useAuth(); // <-- Using useAuth hook to get the user's role

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Layout Route with Protected Child Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<ProtectedRoute element={ isSeller ? <Dashboard /> : <CustomerHome/>} />} />

        {/* Seller specific routes */}
        {isSeller && (
          <>
            <Route
              path="add-product"
              element={<ProtectedRoute element={<AddProduct />} />}
            />
            <Route
              path="my-products"
              element={<ProtectedRoute element={<SellerProducts />} />}
            />

            <Route
              path="packing"
              element={<ProtectedRoute element={<PackagingRecommendation />} />}
            />

            <Route
              path="orders"
              element={<ProtectedRoute element={<SellerOrders />} />}
            />

<Route
              path="preshipment"
              element={<ProtectedRoute element={<Preshipment />} />}
            />
            {/* Add any other seller-specific routes here */}
          </>
        )}

        {/* Customer specific routes */}
        {isCustomer && (
          <>
            <Route
              path="products"
              element={<ProtectedRoute element={<AllProducts />} />}
            />
            <Route
              path="orders"
              element={<ProtectedRoute element={<CustomerOrders />} />}
            />
            <Route
              path="/:productId/place"
              element={<ProtectedRoute element={<OrderProduct />} />}
            />
            <Route
              path="claims"
              element={<ProtectedRoute element={<Claim />} />}
            />

            <Route
              path="claim-status"
              element={<ProtectedRoute element={<ClaimStatus />} />}
            />

            {/* Add any other customer-specific routes here */}
          </>
        )}

        {/* Common routes for all users */}

        <Route
          path="tracking"
          element={<ProtectedRoute element={<TrackingTimeline />} />}
        />
        <Route
          path="shipments/*"
          element={<ProtectedRoute element={<ShipmentManagement />} />}
        />
      
        <Route
          path="querymanagement/*"
          element={<ProtectedRoute element={<QueryManagement />} />}
        />
        <Route
          path="settings/*"
          element={<ProtectedRoute element={<Settings />} />}
        />
      </Route>

      {/* Catch-All Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
