import { useState, type FC } from "react";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import SideBarDashboard from "../../fragments/SideBarDashboard";
import NavbarDashboardMobile from "../../fragments/NavbarDashboardMobile";

const LayoutDashboard: FC = () => {
  // state sidebar
  const [isSideBarSmal, setIsSideBarSmal] = useState<boolean>(false);

  // handle side bar smal
  const handelSideBarSmall = () => {
    setIsSideBarSmal((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen relative">
      {/* side bar for desktop */}
      <SideBarDashboard handleSideBarSmall={handelSideBarSmall} />

      {/* navbar for mobile */}
      <NavbarDashboardMobile />

      <div
        className={clsx(
          "w-full h-full flex flex-col justify-start items-center transition-all duration-300 ease-in-out pt-16 relative overflow-y-scroll scrollbar-hidden scroll-smooth",
          isSideBarSmal ? "md:pl-26 md:pt-4" : "md:pl-76 md:pt-4"
        )}
      >
        <div className="w-full h-full px-4">
          <Outlet />
        </div>

        {/* copyright */}
        <footer
          className={clsx(
            "fixed w-full h-8 border-t bg-primary-white border-primary-black/15 bottom-0 transition-all duration-300 ease-in-out px-3 flex flex-row justify-start items-center",
            isSideBarSmal ? "md:left-20" : "md:left-70"
          )}
        >
          <p className="text-xs">
            Copyright &copy; 2026 Sipontren. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LayoutDashboard;
