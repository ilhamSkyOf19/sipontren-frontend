import { useSearchParams } from "react-router-dom";

interface UseHandlePageReturn {
  page: number;
  handleChangePage: (page: number) => void;
}

export const useHandlePage = (): UseHandlePageReturn => {
  // search params
  const [searchParams, setSearchParams] = useSearchParams();

  // get value from url
  const page = Number(searchParams.get("page") ?? 1);

  // handle change
  const handleChangePage = (page: number) => {
    setSearchParams((prev) => {
      // page
      if (page !== undefined) {
        prev.set("page", page.toString());
      } else {
        prev.set("page", prev.get("page") ?? "1");
      }

      return prev;
    });
  };

  return { page, handleChangePage };
};
