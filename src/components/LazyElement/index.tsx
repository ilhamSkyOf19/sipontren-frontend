import { useState, type FC, type ReactNode } from "react";
import { useInView } from "react-intersection-observer";

// Props
type Props = {
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  children: ReactNode;
};
const LazyElement: FC<Props> = ({
  className,
  threshold = 0.5,
  triggerOnce = true,
  children,
}) => {
  const { ref, inView } = useInView({ threshold, triggerOnce });
  const [loaded, setLoaded] = useState(false);

  if (inView && !loaded) {
    setLoaded(true);
  }

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        transform
        ${loaded ? "opacity-100" : "opacity-0"}
        ${className || ""}
      `}
    >
      {children}
    </div>
  );
};

export default LazyElement;
