import { type FC } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  customClass?: string;
};
const ParallaxGoTop: FC<Props> = ({ children, customClass }) => {
  // parallax
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  return (
    <div
      ref={ref}
      className={clsx(
        inView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
        "delay-200 transition-all duration-1000 ease-in-out",
        customClass ? customClass : "w-full",
      )}
    >
      {children}
    </div>
  );
};

export default ParallaxGoTop;
