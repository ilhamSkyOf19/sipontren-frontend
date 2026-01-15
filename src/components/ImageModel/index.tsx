import type { FC } from "react";
import thumbnailProfile from "../../assets/thumbnails/thumbnail_profile.png";

// Props
type Props = {
  bg: string;
  pages?: boolean;
};
const ImageModel: FC<Props> = ({ bg, pages }) => {
  return (
    <div
      className={`w-full h-[40vh] flex flex-col justify-end items-center rounded-4xl overflow-hidden md:h-[65vh] lg:h-[70vh] lg:w-[50%] ${
        pages && "lg:w-[90%] "
      }`}
    >
      <div
        className={`w-[90%] h-52 flex flex-col justify-center items-center  rounded-3xl relative bg-${bg} md:w-[80%] md:h-112 lg:h-80 group`}
      >
        <img
          src={thumbnailProfile}
          alt="logo sipontren"
          className="w-full absolute -bottom-1 group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default ImageModel;
