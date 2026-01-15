import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";

// data img
import Img1 from "../../assets/tujuanImgs/img_1.jpg";
import Img2 from "../../assets/tujuanImgs/img_2.jpg";
import Img3 from "../../assets/tujuanImgs/img_3.jpg";
import Img4 from "../../assets/tujuanImgs/img_4.jpg";
import Img5 from "../../assets/tujuanImgs/img_5.jpg";
import Img6 from "../../assets/tujuanImgs/img_6.jpg";
import Img7 from "../../assets/tujuanImgs/img_7.jpg";
import Img8 from "../../assets/tujuanImgs/img_8.jpg";
import Img9 from "../../assets/tujuanImgs/img_9.jpg";
import SubJudulCenter from "../../components/SubJudulCenter";

export const dataGallery = [
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
  Img9,
];

const GalleryPage: FC = () => {
  // navigate
  const navigate = useNavigate();
  return (
    <main className="w-full h-full flex flex-col justify-start items-center overflow-hidden">
      <div className="w-full flex flex-col justify-start items-start gap-10 pt-24 pb-20 px-6">
        {/* header */}
        <div className="w-full flex flex-row justify-center items-center relative">
          {/* back */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full flex flex-row justify-strt items-center gap-3 absolute top-0 left-0"
          >
            {/* icon arrow long */}
            <FaArrowLeftLong className="text-3xl cursor-pointer text-blue-400" />

            {/* label */}
            <p className="text-base underline font-semibold text-blue-400 hidden lg:flex">
              Kembali
            </p>
          </button>

          <SubJudulCenter title="Gallery" />
        </div>
        {/* content */}
        <div className="w-full flex flex-row justify-center items-start gap-3 flex-wrap">
          {dataGallery.map((item, index) => (
            <img
              key={index}
              src={item}
              loading="lazy"
              alt="gallery"
              className="w-[80%] h-full object-container"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
