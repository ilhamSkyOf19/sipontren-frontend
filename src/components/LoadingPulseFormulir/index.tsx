import { type FC } from "react";

type Props = {
  length?: number;
};
const LoadingPulseFormulir: FC<Props> = ({ length = 4 }) => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-7">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="w-full flex flex-col justify-start items-stary gap-2"
        >
          <div className="w-32 h-6 bg-gray-300 animate-pulse" />
          <div
            key={index}
            className="w-full h-12 bg-gray-300 animate-pulse rounded-md"
          />
        </div>
      ))}

      <div className="w-full flex flex-row justify-between items-center gap-4">
        <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md" />
        <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md" />
      </div>
    </div>
  );
};

export default LoadingPulseFormulir;
