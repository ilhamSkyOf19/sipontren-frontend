import { useEffect, useRef, useState } from "react";
import SubJudulCenter from "../../../components/SubJudulCenter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// data img
import Img1 from "../../../assets/tujuanImgs/img_1.jpg";
import Img2 from "../../../assets/tujuanImgs/img_2.jpg";
import Img3 from "../../../assets/tujuanImgs/img_3.jpg";
import Img4 from "../../../assets/tujuanImgs/img_4.jpg";
import Img5 from "../../../assets/tujuanImgs/img_5.jpg";
import Img6 from "../../../assets/tujuanImgs/img_6.jpg";
import Img7 from "../../../assets/tujuanImgs/img_7.jpg";
import Img8 from "../../../assets/tujuanImgs/img_8.jpg";
import Img9 from "../../../assets/tujuanImgs/img_9.jpg";
import clsx from "clsx";
import { Link } from "react-router-dom";

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

const GallerySantri = () => {
  // state active index
  const [activeIndexRight, setActiveIndexRight] = useState<number>(0);
  const [activeIndexLeft, setActiveIndexLeft] = useState<number>(0);

  // state ready
  const [isReady, setIsReady] = useState<boolean>(false);

  // mount ready
  useEffect(() => {
    setIsReady(true);
  }, []);

  // swiper ref
  const swiperRefRight = useRef<any>(null);
  const swiperRefLeft = useRef<any>(null);

  return (
    <div className="w-full min-h-[60vh] bg-primary-blue flex flex-col justify-start items-center px-6 gap-10 pt-12 pb-14 md:px-10 lg:h-full">
      <SubJudulCenter title={"Gallery Santri"} color={"#fff"} />
      <div className="w-full min-h-[30vh] flex flex-col justify-start items-center gap-12 lg:flex-row">
        <div className="w-full h-[30vh] flex flex-col justify-between items-center gap-2 overflow-hidden lg:h-[60vh] lg:w-[85%]">
          {/* left to right */}
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (swiperRefLeft.current = swiper)}
            onSlideChange={(swiper) => setActiveIndexLeft(swiper.realIndex)}
            className="w-full h-full"
          >
            {dataGallery.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center relative overflow-hidden"
              >
                <img
                  src={item}
                  alt="slide"
                  className={clsx(
                    "object-cover w-full h-full transition-transform duration-16000 origin-center",
                    isReady && index === activeIndexLeft
                      ? "scale-125"
                      : "scale-100"
                  )}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full h-[30vh] flex flex-col justify-between items-center gap-2 overflow-hidden lg:h-[60vh] lg:w-[85%]">
          {/* right to left */}
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            onSwiper={(swiper) => (swiperRefRight.current = swiper)}
            onSlideChange={(swiper) => setActiveIndexRight(swiper.realIndex)}
            className="w-full h-full"
          >
            {dataGallery.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center relative overflow-hidden"
              >
                <img
                  src={item}
                  alt="slide"
                  className={clsx(
                    "object-cover w-full h-full transition-transform duration-16000 origin-center",
                    isReady && index === activeIndexRight
                      ? "scale-125"
                      : "scale-100"
                  )}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <Link
        to={"/kemahadan/gallery"}
        className="text-md font-semibold text-primary-blue w-full text-center py-2 bg-white cursor-pointer rounded-md border relative before:content-[''] before:inset-0 before:absolute before:bg-black/20 before:opacity-0 before:transition-all before:duration-200 before:ease-in-out hover:before:opacity-100 md:text-2xl md:py-4 lg:w-[85%] lg:text-xl lg:py-2.5"
      >
        Selengkapnya
      </Link>
    </div>
  );
};

export default GallerySantri;
