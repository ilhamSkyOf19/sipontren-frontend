import { useEffect, useState } from "react";

export const useShowingRange = (
  currentPage?: number,
  pageSize?: number,
  totalData?: number
): { start: number; end: number } => {
  const [range, setRange] = useState({ start: 0, end: 0 });

  useEffect(() => {
    if (!currentPage || !pageSize || !totalData) {
      setRange({ start: 0, end: 0 });
      return;
    }

    const start = (currentPage - 1) * pageSize + 1;
    const end = start + totalData - 1;

    setRange({ start, end });
  }, [currentPage, pageSize, totalData]);

  return range;
};
