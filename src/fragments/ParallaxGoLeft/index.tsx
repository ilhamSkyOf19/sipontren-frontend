import { type FC } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

// Props
type Props = {
  children: React.ReactNode;
  customClass?: string;
};

const ParallaxGoLeft: FC<Props> = ({ children, customClass }) => {
  // parallax
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div
      ref={ref}
      className={clsx(
        inView ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0",
        "delay-200 transition-all duration-1000 ease-in-out w-full",
        customClass ? customClass : "w-full",
      )}
    >
      {children}
    </div>
  );
};

export default ParallaxGoLeft;
