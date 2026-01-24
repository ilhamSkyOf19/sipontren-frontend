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
import AlumniPage from "../pages/AlumniPage";
import InputAlumniPage from "../pages/InputAlumniPage";
import UstadPage from "../pages/UstadPage";
import InputUstadPage from "../pages/InputUstadPage";
import FasilitasPage from "../pages/FasilitasPage";
import InputFasilitasPage from "../pages/InputFasilitasPage";
import BeritaPage from "../pages/BeritaPage";
import InputBeritaPage from "../pages/InputBeritaPage";
import BannerPage from "../pages/BannerPage";
import InputBannerPage from "../pages/InputBannerPage";
import PamfletPage from "../pages/PamfletPage";
import InputPamfletPage from "../pages/InputPamfletPage";
import FormulirPendaftaranPage from "../pages/FormulirPendaftaranPage";
import SuccessPage from "../pages/SuccessPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ErrorNetwork from "../pages/ErrorNetworkPage";
import PrestasiPage from "../pages/PrestasiPage";
import PrestasiDashboardPage from "../pages/PrestasiDashboardPage";
import InputPrestasiPage from "../pages/InputPrestasiPage";

const route = createBrowserRouter([
  {
    path: "/error-network",
    element: <ErrorNetwork />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
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
        path: "/prestasi/:categoryPrestasi",
        element: <PrestasiPage />,
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
      {
        path: "/formulir",
        element: <FormulirPendaftaranPage />,
      },
      {
        path: "/success",
        element: <SuccessPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    // loader: async () => {
    //   return await AuthService.cekAuth();
    // },
    element: <LayoutDashboard />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },

      // calon santri
      {
        path: "calon-santri",
        element: <CalonSantriPage />,
      },
      {
        path: "calon-santri/edit/:id",
        element: <FormulirPendaftaranPage />,
      },

      // alumni
      {
        path: "alumni",
        element: <AlumniPage />,
      },
      {
        path: "alumni/tambah",
        element: <InputAlumniPage />,
      },
      {
        path: "alumni/edit/:id",
        element: <InputAlumniPage />,
      },

      // ustad
      {
        path: "ustad",
        element: <UstadPage />,
      },
      {
        path: "ustad/tambah",
        element: <InputUstadPage />,
      },
      {
        path: "ustad/edit/:id",
        element: <InputUstadPage />,
      },

      // fasilitas
      {
        path: "fasilitas",
        element: <FasilitasPage />,
      },
      {
        path: "fasilitas/tambah",
        element: <InputFasilitasPage />,
      },
      {
        path: "fasilitas/edit/:id",
        element: <InputFasilitasPage />,
      },

      // berita artikel
      {
        path: "berita-artikel",
        element: <BeritaPage />,
      },
      {
        path: "berita-artikel/tambah",
        element: <InputBeritaPage />,
      },
      {
        path: "berita-artikel/edit/:id",
        element: <InputBeritaPage />,
      },

      // banner
      {
        path: "banner",
        element: <BannerPage />,
      },
      {
        path: "banner/tambah",
        element: <InputBannerPage />,
      },
      {
        path: "banner/edit/:id",
        element: <InputBannerPage />,
      },

      // banner
      {
        path: "pamflet",
        element: <PamfletPage />,
      },
      {
        path: "pamflet/tambah",
        element: <InputPamfletPage />,
      },
      {
        path: "pamflet/edit/:id",
        element: <InputPamfletPage />,
      },

      // prestasi
      {
        path: "prestasi",
        element: <PrestasiDashboardPage />,
      },
      {
        path: "prestasi/tambah",
        element: <InputPrestasiPage />,
      },
      {
        path: "prestasi/edit/:id",
        element: <InputPrestasiPage />,
      },
    ],
  },
]);

export default route;
