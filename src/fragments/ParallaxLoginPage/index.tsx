import { type FC } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

// Props
type Props = {
  children: React.ReactNode;
  customClass?: string;
  left?: boolean;
  right?: boolean;
  fadeIn?: boolean;
};

const ParallaxLoginPage: FC<Props> = ({
  children,
  customClass,
  left,
  right,
  fadeIn,
}) => {
  // parallax
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div
      ref={ref}
      className={clsx(
        inView
          ? "translate-0 opacity-100"
          : left && !inView
            ? "lg:-translate-x-16 lg:-translate-y-12 opacity-0"
            : fadeIn && !inView
              ? "opacity-0"
              : right &&
                !inView &&
                "translate-y-16 lg:translate-x-16 lg:-translate-y-12 opacity-0",
        "delay-200 transition-all duration-1000 ease-in-out w-full",
        customClass ? customClass : "w-full",
      )}
    >
      {children}
    </div>
  );
};

export default ParallaxLoginPage;
