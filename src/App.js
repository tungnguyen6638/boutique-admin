import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import EditProduct from "./pages/EditProduct";
import { checkAuth } from "./ultilities/getUser";
import SigninForm from "./components/auth/SigninForm";
import SignupForm from "./components/auth/SignupForm";
import { action as logoutAction } from "./pages/Logout";
import ManageProducts from "./pages/ManageProducts";
import { action as singupAction } from "./components/auth/SignupForm";
import { action as signinAction } from "./components/auth/SigninForm";
import Role from "./pages/Role";
import Dashboard from "./pages/Dashboard";
import OrderDetail from "./components/order/OrderDetail";
import EditAmount from "./pages/EditAmount";
import Support from "./pages/Support";
import SupportFormChat from "./components/support/SupportFormChat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Dashboard />, loader: checkAuth },
        {
          path: "edit-product",
          element: <EditProduct />,
          loader: checkAuth,
        },
        {
          path: "role",
          element: <Role />,
          loader: checkAuth,
        },
        {
          path: "manage-products",
          element: <ManageProducts />,
          loader: checkAuth,
        },
        {
          path: "order/:orderId",
          element: <OrderDetail />,
          loader: checkAuth,
        },
        {
          path: "amount",
          element: <EditAmount />,
          loader: checkAuth,
        },
        {
          path: "support",
          element: <Support />,
          loader: checkAuth,
        },
        {
          path: "room/:roomId",
          element: <SupportFormChat />,
          loader: checkAuth,
        },
      ],
    },
    { path: "/login", element: <SigninForm />, action: signinAction },
    { path: "/register", element: <SignupForm />, action: singupAction },
    { path: "/logout", action: logoutAction },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
