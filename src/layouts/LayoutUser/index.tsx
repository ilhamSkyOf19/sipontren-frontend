import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  type RefObject,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavbarUser from "../../fragments/NavbarUser";
import useWindowSize from "../../hooks/useWindowSize";
import ButtonNavigasi from "../../components/ButtonNavigasi";
import Footer from "../../fragments/Footer";

const LayoutUser: FC = () => {
  // state
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [showNavbarList, setShowNavbarList] = useState<boolean>(false);
  const [valueTop, setValueTop] = useState<number>(0);

  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // ref
  const elementTop = useRef<HTMLDivElement>(null);
  const navbarListRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);

  // ====================
  // Use Effect Handle Scroll
  // ====================

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setShowNavbarList(false);
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showNavbarList && elementTop.current) {
      const bottom = elementTop.current.getBoundingClientRect().bottom;
      setValueTop(bottom);
    }
  }, [showNavbarList]);

  // =============
  // Use Effect Handle Click Outside Navbar User
  // =============
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (
        target &&
        navbarListRef.current &&
        !navbarListRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setShowNavbarList(false);
      }
    };

    if (showNavbarList) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNavbarList]);

  // ====================
  // handle click Show Navbar
  // ====================

  const handleClick = useCallback(() => {
    setShowNavbarList((prev) => !prev);
  }, [showNavbarList]);

  return (
    <div className="w-screen flex flex-col justify-start items-start overflow-hidden">
      {/* header */}
      <NavbarUser
        ref={elementTop}
        handleClick={handleClick}
        showNavbarList={showNavbarList}
        widthDevice={useWindowSize().width}
        showNavbar={showNavbar}
        toggleButtonRef={toggleButtonRef}
      />

      {/* Navbar user */}
      <NavbarListComponent
        valueTop={valueTop}
        showNavbarList={showNavbarList}
        navbarListRef={navbarListRef}
      />

      {/* content */}
      <div className="w-full flex flex-col justify-start items-start pt-10">
        <Outlet />
      </div>

      {/* footer */}
      <Footer widthDevice={useWindowSize().width} />
    </div>
  );
};

// =================
// Navbar List
// =================

const navbarListUser = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Profile",
    url: "/profile",
  },
  {
    label: `Kema'hadan`,
    url: "/kemahadan",
  },
  {
    label: "PSB (Penerimaan Siswa Baru)",
    url: "/psb",
  },
  {
    label: "Formulir Pendaftaran",
    url: "/formulir",
  },
];

// Props
type NavbarListComponentProps = {
  valueTop: number;
  showNavbarList: boolean;
  navbarListRef: RefObject<HTMLDivElement | null>;
};

const NavbarListComponent: FC<NavbarListComponentProps> = ({
  valueTop,
  showNavbarList,
  navbarListRef,
}) => {
  // currentPage
  const currentPage = useLocation().pathname;

  return (
    <div
      ref={navbarListRef}
      className={`fixed w-full bg-[#1d4ed8] transition duration-700 shadow-xs shadow-slate-400 z-40  ${
        showNavbarList ? "translate-y-0 " : "-translate-y-112"
      } flex flex-col items-center justify-between`}
      style={{ top: valueTop }}
    >
      {navbarListUser.map((item, index) => {
        return (
          <ButtonNavigasi
            key={index}
            label={item.label}
            url={item.url}
            active={item.url === currentPage}
          />
        );
      })}
    </div>
  );
};

export default LayoutUser;
