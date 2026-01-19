import type { FC, RefObject } from "react";
import IconArab from "../../components/IconArab";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import IconNavbar from "../../components/IconNavbar";

const navbar: { label: string; url: string }[] = [
  {
    label: "Home",
    url: "",
  },
  {
    label: "Profile",
    url: "profile",
  },
  {
    label: `Kema'hadan`,
    url: "kemahadan",
  },
  {
    label: "PSB",
    url: "psb",
  },
  {
    label: "Formulir",
    url: "formulir",
  },
];

type Props = {
  showNavbar: boolean;
  handleClick: () => void;
  ref: RefObject<HTMLDivElement | null>;
  toggleButtonRef: RefObject<HTMLButtonElement | null>;
  showNavbarList: boolean;
  widthDevice: number;
};

const NavbarUser: FC<Props> = ({
  showNavbar,
  handleClick,
  ref,
  toggleButtonRef,
  showNavbarList,
  widthDevice,
}) => {
  // ==================
  // Use Location
  // ==================
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      ref={ref}
      className={`flex flex-row justify-between items-center z-50 bg-secondary-blue w-full h-18 fixed transition duration-350 ease-in-out ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } px-4 md:h-18 md:px-8 lg:h-16`}
    >
      {widthDevice < 400 && <IconArab width={90} />}
      {widthDevice > 400 && widthDevice <= 700 && <IconArab width={90} />}
      {widthDevice < 700 && (
        <button
          ref={toggleButtonRef}
          onClick={handleClick}
          className="flex flex-row justify-end items-center "
        >
          <div className="relative w-8 h-8 p-2">
            <Menu
              className={`absolute inset-0 text-2xl transform transition-all duration-300 text-white cursor-pointer -scale-x-100 ${
                showNavbarList
                  ? "opacity-0 rotate-40 scale-75"
                  : "opacity-100 rotate-0 scale-100"
              } md:md:text-4xl`}
            />
            <X
              className={`absolute inset-0 text-2xl transform transition-all duration-300 text-white cursor-pointer ${
                showNavbarList ? "opacity-100 scale-100" : "opacity-0 scale-50"
              } md:text-4xl`}
            />
          </div>
        </button>
      )}

      {widthDevice > 700 && widthDevice <= 1024 && <IconArab width={100} />}
      {widthDevice > 700 && widthDevice <= 1024 && (
        <div className="flex flex-row justify-end items-center gap-9">
          {navbar.map((item, index) => (
            <NavbarLinkTab
              key={index}
              link={item.url}
              text={item.label}
              active={currentPath === `/${item.url}`}
            />
          ))}
        </div>
      )}

      {widthDevice > 1024 && <IconNavbar />}
      {widthDevice > 1024 && (
        <div className="flex flex-row justify-end items-center gap-6">
          {navbar.map((item, index) => (
            <NavbarLinkTabDesktop
              key={index}
              link={item.url}
              text={item.label}
              active={currentPath === `/${item.url}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ====================
// Navbar Link tab
// ====================

// Props
type NavbarLinkTabProps = {
  link: string;
  text: string;
  active: boolean;
};

const NavbarLinkTab: FC<NavbarLinkTabProps> = ({ link, text, active }) => {
  return (
    <Link
      to={`/${link}`}
      className={clsx(
        `text-lg text-white relative before:w-full before:h-1 before:bg-yellow-300 before:absolute before:bottom-0 before:left-0 before:origin-left before:scale-x-0 before:transition-all before:duration-300 hover:before:scale-x-100 `,
        active ? "before:scale-x-100" : "before:scale-x-0",
      )}
    >
      {text}
    </Link>
  );
};

// ====================
// Navbar Link tab Desktop
// ====================

// Props
type NavbarLinkTabDesktopProps = {
  link: string;
  text: string;
  active: boolean;
};

const NavbarLinkTabDesktop: FC<NavbarLinkTabDesktopProps> = ({
  link,
  text,
  active,
}) => {
  return (
    <Link
      to={`/${link}`}
      className={`text-lg text-white relative transition-all duration-500 ease-in-out hover:bg-primary-yellow lg:text-xs lg:py-2.5 lg:px-4 lg:rounded-full lg:font-semibold ${
        active ? "bg-primary-yellow" : "bg-transparent"
      }`}
    >
      {text}
    </Link>
  );
};

export default NavbarUser;
