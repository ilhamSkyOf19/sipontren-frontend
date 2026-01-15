import logo from "../../assets/icons/logo.png";
import arab from "../../assets/icons/arab.png";
import type { FC } from "react";

// Props
type Props = {
  width?: number;
  position?: string;
};

const IconArab: FC<Props> = ({ width, position = "around" }) => {
  return (
    <div
      className={`flex flex-row justify-${position} items-end`}
      style={{ width: width }}
    >
      <img
        className="w-[50%] lg:w-[35%]"
        src={logo}
        alt="icon arab"
        loading="lazy"
      />
      <img className="w-full" src={arab} alt="icon arab" loading="lazy" />
    </div>
  );
};

export default IconArab;
