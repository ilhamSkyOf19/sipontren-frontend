import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  gap?: number;
};

const ScrollXNonDesktop: FC<Props> = ({ children, gap = 4 }: Props) => {
  return (
    <div className="w-full overflow-x-auto px-4 py-4 md:pl-8 scrollbar-hidden">
      <div className={`flex gap-${gap}`}>{children}</div>
    </div>
  );
};

export default ScrollXNonDesktop;
