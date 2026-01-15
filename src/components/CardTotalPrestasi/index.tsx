import CountUp from "react-countup";

// img
import reward from "../../assets/prestasi/reward.webp";
import { useInView } from "react-intersection-observer";
import type { FC } from "react";
import { Link } from "react-router-dom";

// Props
type Props = {
  jumlah: number;
  tingkat: string;
};
const CardTotalPrestasi: FC<Props> = ({ jumlah = 0, tingkat }) => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  return (
    <div
      ref={ref}
      className="w-[40%] h-[29vh] flex flex-col justify-center items-center shrink-0 gap-2 lg:flex-1 lg:h-[42vh]"
    >
      <div
        className="w-full h-[22vh] flex justify-center items-center lg:w-[130%] lg:h-full"
        style={{
          backgroundImage: `url(${reward})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <p className="text-3xl font-semibold text-primary-blue md:text-5xl lg:text-4xl">
          {inView && <CountUp start={0} end={jumlah} duration={5} />}
        </p>
      </div>
      <p className="text-sm font-semibold text-primary-blue text-center md:text-2xl lg:text-lg">
        Prestasi <br />
        {tingkat}
      </p>

      {/* button view */}
      <Link
        to="/profile"
        className="py-1.5 px-8 bg-secondary-blue hover:bg-primary-blue transition-all duration-200 ease-in-out rounded-lg text-white font-medium text-sm lg:py-2 lg:text-base"
      >
        Lihat
      </Link>
    </div>
  );
};

export default CardTotalPrestasi;
