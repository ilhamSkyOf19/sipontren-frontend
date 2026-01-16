import { memo, type FC } from "react";
import Tanggal from "../Tanggal";

type Props = {
  title: string;
  subTitle: string;
  tanggal?: boolean;
};
const HeaderDashboard: FC<Props> = ({ title, subTitle, tanggal }) => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      {/* title */}
      <div className="flex-2 flex flex-col justify-start items-start">
        <h2 className="capitalize text-primary-black text-2xl font-semibold">
          {title}
        </h2>

        {/* count data */}
        <span className="text-primary-black/80 text-sm font-medium">
          {subTitle}
        </span>
      </div>

      {/* tanggal */}
      {tanggal && <Tanggal />}
    </div>
  );
};

export default memo(HeaderDashboard);
