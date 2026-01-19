import { useState, type FC } from "react";
import logo from "../../assets/icons/logo.png";
import {
  Building2,
  GalleryThumbnails,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  UsersRound,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
// import { useMutation } from "@tanstack/react-query";

// navigation
const navigationList: { label: string; link: string }[] = [
  {
    label: "dashboard",
    link: "/dashboard",
  },
  {
    label: "calon santri",
    link: "/dashboard/calon-santri",
  },
  {
    label: "alumni",
    link: "/dashboard/alumni",
  },
  {
    label: "ustad",
    link: "/dashboard/ustad",
  },
  {
    label: "fasilitas",
    link: "/dashboard/fasilitas",
  },
  {
    label: "berita & artikel",
    link: "/dashboard/berita-artikel",
  },
  {
    label: "banner",
    link: "/dashboard/banner",
  },
  {
    label: "pamflet",
    link: "/dashboard/pamflet",
  },
];

type Props = {
  handleSideBarSmall: () => void;
};

const SideBarDashboard: FC<Props> = ({ handleSideBarSmall }) => {
  // state close side bar
  const [isCloseSideBar, setIsCloseSideBar] = useState<boolean>(false);
  const [isDisplayElement, setIsDisplayElement] = useState<boolean>(true);

  // handle close sidebar
  const handleCloseSideBar = () => {
    handleSideBarSmall();
    setIsCloseSideBar((prev) => {
      if (prev) {
        setTimeout(() => setIsDisplayElement(true), 300);
      } else {
        setIsDisplayElement(false);
      }

      return !prev; // toggle state
    });
  };

  // get pathname
  const pathname = useLocation().pathname;

  // use mutation
  //   const { mutateAsync } = useMutation({
  //     mutationFn: async () => UserService.logout(),
  //     onSuccess: () => {
  //       window.location.href = "/login";
  //     },
  //     onError: () => {
  //       window.location.href = "/login";
  //     },
  //   });

  return (
    <div
      className={clsx(
        "h-screen fixed left-0 bg-secondary-blue z-50 flex-col justify-start items-start pt-6 transition-all duration-300 ease-in-out hidden md:flex",
        isCloseSideBar ? "w-20" : "w-70",
      )}
    >
      {/* logo */}
      <div
        className={clsx(
          "w-full flex flex-row items-center px-4 relative pb-4 before:content-[''] before:absolute before:left-4 before:right-4 before:bottom-0 before:h-px before:bg-primary-white/10 h-12",
          isCloseSideBar ? "justify-center" : "justify-end",
        )}
      >
        <div
          className={clsx(
            "w-full flex flex-row justify-start items-center gap-2",
            isDisplayElement ? "animate-fade-in" : "hidden",
          )}
        >
          {/* logo */}
          <img src={logo} alt="logo polisi" className="w-10 mb-2" />

          {/* heading */}
          <h2 className="text-primary-white font-medium">SIPONTREN</h2>
        </div>

        {/* button bar */}
        <button
          type="button"
          onClick={() => handleCloseSideBar()}
          className="h-full px-1.5"
        >
          <Menu className="text-primary-white" />
        </button>
      </div>

      {/* navigation */}
      <div className="mt-8 w-full flex flex-col justify-start items-start">
        {/* button navigation */}
        {navigationList.map((item, index) => (
          <ButtonNavigation
            closeSideBar={isCloseSideBar}
            displayElement={isDisplayElement}
            key={index}
            label={item.label}
            link={item.link}
            line={index === navigationList.length - 1}
            active={
              item.link === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.link) && pathname !== "/dashboard"
            }
          />
        ))}

        {/* button logout */}
        <button
          type="button"
          //   onClick={() => mutateAsync()}
          className={clsx(
            "w-full flex flex-row items-center gap-4 py-6 px-7 transition-all duration-200 ease-in-out hover:bg-primary-brown",
            isCloseSideBar ? "justify-start" : " justify-start",
          )}
        >
          <LogOut size={24} className="text-primary-white" />

          {/* label */}
          <span
            className={clsx(
              "text-primary-white text-base uppercase",
              isCloseSideBar
                ? "hidden"
                : isDisplayElement
                  ? "animate-fade-in"
                  : "hidden",
            )}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

// button navigatin
type ButtonNavigationProps = {
  label: string;
  link: string;
  active: boolean;
  closeSideBar: boolean;
  displayElement: boolean;
  line: boolean;
};

const ButtonNavigation: FC<ButtonNavigationProps> = ({
  label,
  link,
  active,
  closeSideBar,
  displayElement,
  line,
}) => {
  return (
    <Link
      to={link}
      className={clsx(
        "w-full flex flex-row items-center gap-4 py-6 px-7 transition-all duration-200 ease-in-out",
        active ? "bg-primary-blue" : "hover:bg-primary-blue",
        closeSideBar ? "justify-start" : " justify-start",
        line && "border-b border-primary-white/20",
      )}
    >
      {/* icon */}
      {label === "dashboard" && (
        <LayoutDashboard size={24} className="text-primary-white" />
      )}
      {(label === "calon santri" ||
        label === "ustad" ||
        label === "calon santri" ||
        label === "alumni") && (
        <UsersRound size={24} className="text-primary-white" />
      )}
      {label === "fasilitas" && (
        <Building2 size={24} className="text-primary-white" />
      )}
      {label === "berita & artikel" && (
        <Newspaper size={24} className="text-primary-white" />
      )}
      {(label === "banner" || label === "pamflet") && (
        <GalleryThumbnails size={24} className="text-primary-white" />
      )}

      {/* label */}
      <span
        className={clsx(
          "text-primary-white text-base uppercase",
          closeSideBar
            ? "hidden"
            : displayElement
              ? "animate-fade-in"
              : "hidden",
        )}
      >
        {label}
      </span>
    </Link>
  );
};

export default SideBarDashboard;
