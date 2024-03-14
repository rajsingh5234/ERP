import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./routeGuard/PublicRoute";
import PrivateRoute from "./routeGuard/PrivateRoute";
import MainLayout from "./layout/MainLayout";
import Loader from "./components/Loader";

const DashBoard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/login"));
const Products = lazy(() => import("./pages/products"));
const Orders = lazy(() => import("./pages/orders"));
const Calendar = lazy(() => import("./pages/calendar"));

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader className="w-screen h-screen" />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/calendar" element={<Calendar />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </>
  )
};


export default App;