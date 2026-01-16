import { type FC } from "react";

type Props = {
  header: string[];
  headerSizeSmall: string;
};

const HeaderData: FC<Props> = ({ header, headerSizeSmall }) => {
  return (
    <div className="w-full flex flex-row justify-start items-center py-3 px-5 bg-primary-black/10 mt-4 rounded-lg gap-4 lg:gap-0">
      <h3 className="lg:basis-[5%] flex-1 text-base font-semibold">No</h3>

      {/* for dekstop */}
      <div className="basis-[90%] flex-row justify-evenly items-center hidden lg:flex">
        {header.map((item, index) => (
          <h3 key={index} className="text-base font-semibold w-full">
            {item}
          </h3>
        ))}
      </div>

      {/* for mobile */}
      <div className="flex-12 flex-row justify-evenly items-center lg:hidden ">
        <h3 className="text-base font-semibold w-full">{headerSizeSmall}</h3>
      </div>
      <h3 className="basis-[5%] text-base text-center font-semibold hidden lg:flex">
        Action
      </h3>
    </div>
  );
};

export default HeaderData;
