import type { FC } from "react";

type Props = {
  pamflet?: {
    img: string;
  }[];
};
const SectionPamflet: FC<Props> = ({ pamflet }) => {
  return (
    <div className="w-full flex flex-col justify-start items-center pt-4 pb-4 overflow-hidden">
      <div className="w-full py-12 flex flex-col justify-center items-center gap-4 px-4 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:w-[70%]">
        {pamflet
          ? pamflet.map((item, index) => (
              <div key={index} className="w-full h-[45vh]  overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_BASE_IMG_URL}/pamflet/${
                    item.img
                  }`}
                  alt="pamflet"
                  className="w-full h-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SectionPamflet;
