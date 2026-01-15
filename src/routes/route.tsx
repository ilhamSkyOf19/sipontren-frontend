import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../layouts/LayoutUser";
import HomePage from "../pages/HomePage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <LayoutUser />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

export default route;
