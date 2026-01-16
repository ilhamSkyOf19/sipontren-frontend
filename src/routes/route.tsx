import { createBrowserRouter } from "react-router-dom";
import LayoutUser from "../layouts/LayoutUser";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import KemahadanPage from "../pages/KemahadanPage";
import GalleryPage from "../pages/GalleryPage";
import BeritaDetail from "../pages/BeritaDetailPage";
import PsbPage from "../pages/PsbPage";
import LayoutDashboard from "../layouts/LayoutDashboard";
import CalonSantriPage from "../pages/CalonSantriPage";

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
      {
        path: "/kemahadan",
        element: <KemahadanPage />,
      },
      {
        path: "/kemahadan/gallery",
        element: <GalleryPage />,
      },
      {
        path: "/berita-detail/:id",
        element: <BeritaDetail />,
      },
      {
        path: "/psb",
        element: <PsbPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <p>dashboard</p>,
      },
      {
        path: "calon-santri",
        element: <CalonSantriPage />,
      },
    ],
  },
]);

export default route;
