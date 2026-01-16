import { useState } from "react";

const useSearch = (): {
  isSearch: string;
  handleSearch: (search: string) => void;
} => {
  // state search
  const [isSearch, setIsSearch] = useState<string>("");

  // handle search
  const handleSearch = (search: string) => {
    setIsSearch(search);
  };

  return { isSearch, handleSearch };
};

// export
export default useSearch;
