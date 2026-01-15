import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../layouts/LayoutUser";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default route;
