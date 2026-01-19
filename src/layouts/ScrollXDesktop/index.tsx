import type { FC, ReactNode } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// Props
type Props = {
  children: ReactNode;
};
const ScrollXDesktop: FC<Props> = ({ children }) => {
  return (
    <SimpleBar
      autoHide={true}
      style={{
        width: "100%",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <div className="flex flex-row py-12 pl-4  cursor-pointer gap-6">
        {/* space */}
        <div className="w-4 shrink-0 h-ful" />

        {children || ""}

        {/* space */}
        <div className="w-4 shrink-0 h-ful" />
      </div>
    </SimpleBar>
  );
};

export default ScrollXDesktop;
