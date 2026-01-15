import fileThumb from "../../assets/icons/file_thumb.png";
import { Typewriter } from "react-simple-typewriter";
import type { FC } from "react";
import useWindowSize from "../../hooks/useWindowSize";

// Props
type Props = {
  whiteText1: string;
  whiteText2: string;
  YellowText: string;
  deskripsi: string;
};
const HeaderPage: FC<Props> = ({
  whiteText1,
  whiteText2,
  YellowText,
  deskripsi,
}) => {
  const window = useWindowSize().width;
  return (
    <div className="w-full min-h-[45vh] bg-primary-blue flex flex-col justify-center items-start px-4 pt-[30%] pb-[10%] relative overflow-hidden md:flex-row md:items-center md:pt-[20%] lg:pt-[10%] lg:min-h-full lg:px-8">
      <div className="flex flex-col justify-center items-start gap-3 z-10 lg:pr-32 lg:gap-6">
        <div className="w-full flex flex-col justify-start items-start lg:gap-1">
          <p
            className={`text-xl text-white font-semibold md:text-3xl lg:text-5xl`}
          >
            {window > 1024 ? (
              <Typewriter
                words={[whiteText1]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1000}
              />
            ) : (
              whiteText1
            )}
          </p>
          <p className="text-xl text-white font-semibold md:text-3xl lg:text-5xl">
            {whiteText2}
          </p>
          <p className="w-[80%] text-xl text-primary-yellow font-semibold md:text-2xl lg:text-3xl">
            {YellowText}
          </p>
        </div>
        <p className="w-[70%] text-xs text-white font-light md:text-lg">
          {deskripsi}
        </p>
      </div>
      <div className="absolute z-0 -right-20 top-[35%] md:inline-block md:right-8 lg:top-[20%] lg:right-16 lg:flex lg:h-full lg:flex-row lg:justify-center lg:pt-20">
        <div className="lg:w-[20rem] lg:h-80">
          <img
            src={fileThumb}
            alt="logo sipontren"
            className="w-48 opacity-60 md:w-56 md:opacity-100 lg:w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderPage;
