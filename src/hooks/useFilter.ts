import { useSearchParams } from "react-router-dom";

interface UseFilterReturn {
  page: number;
  from: string;
  to: string;
  handleFilter: (
    newValues: Partial<{ page: number; from: string; to: string }>
  ) => void;
}

export const UseFilter = (): UseFilterReturn => {
  // search params
  const [searchParams, setSearchParams] = useSearchParams();

  // get value from url
  const page = Number(searchParams.get("page") ?? 1);
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";

  // handle change
  const handleFilter = (
    newValues: Partial<{ page: number; from: string; to: string }>
  ) => {
    setSearchParams((prev) => {
      // page
      if (newValues.page !== undefined) {
        prev.set("page", newValues.page.toString());
      } else {
        prev.set("page", prev.get("page") ?? "1");
      }

      // from
      if (newValues.from !== undefined) {
        if (newValues.from === "") {
          prev.delete("from"); // reset
        } else {
          prev.set("from", newValues.from);
        }
      }

      // to
      if (newValues.to !== undefined) {
        if (newValues.to === "") {
          prev.delete("to"); // reset
        } else {
          prev.set("to", newValues.to);
        }
      }

      return prev;
    });
  };

  return { page, from, to, handleFilter };
};
