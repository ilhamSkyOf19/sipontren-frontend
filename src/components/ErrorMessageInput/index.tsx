import clsx from "clsx";
import { type FC } from "react";

type Props = {
  errorMessage?: string;
};
const ErrorMessageInput: FC<Props> = ({ errorMessage }) => {
  return (
    <span
      className={clsx(
        "text-primary-red text-xs h-5 transition-opacity duration-200 ease-in-out mt-0.5",
        errorMessage ? "opacity-100" : "opacity-0"
      )}
    >
      {errorMessage}
    </span>
  );
};

export default ErrorMessageInput;
