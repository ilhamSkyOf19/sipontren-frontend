import { memo, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { BannerService } from "../../../services/banner.service";

const SectionBanner = memo(() => {
  // state active index
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // state ready
  const [isReady, setIsReady] = useState<boolean>(false);

  // mount ready
  useEffect(() => {
    setIsReady(true);
  }, []);

  // swiper ref
  const swiperRef = useRef<any>(null);

  // use query
  const { data: banners, isLoading } = useQuery({
    queryKey: ["bennerHomePage"],
    queryFn: () => BannerService.read(),
    refetchOnWindowFocus: false,
  });

  return (
    <section className="flex flex-col justify-start items-center w-screen h-auto pt-7  md:pt-4 gap-2 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-[40vw]"
      >
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => (
              <SwiperSlide>
                <div
                  key={i}
                  className="w-full h-full bg-gray-400 animate-pulse"
                />
              </SwiperSlide>
            ))
          : banners?.success &&
            banners?.data &&
            banners?.data.length > 0 &&
            banners.data.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`${import.meta.env.VITE_API_BASE_IMG_URL}/banner/${
                    item.img
                  }`}
                  alt="slide"
                  className={clsx(
                    "object-cover w-full h-full transition-transform duration-16000 origin-center",
                    isReady && index === activeIndex ? "scale-125" : "scale-100"
                  )}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </section>
  );
});

export default SectionBanner;
