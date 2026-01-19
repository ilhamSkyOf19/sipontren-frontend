import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useMemo } from "react";

type Props = {
  totalData: number;
  totalPage: number;
  handlePage: (
    newValues: Partial<{ page: number; from: string; to: string }>,
  ) => void;
  currentPage: number;
  handlePageSingle?: (page: number) => void;
};

const Pagination: FC<Props> = ({
  totalData,
  totalPage,
  handlePage,
  currentPage,
  handlePageSingle,
}) => {
  const pages = useMemo(() => {
    const groupSize = 3;

    // grup ke berapa user berada
    const currentGroup = Math.ceil(currentPage / groupSize);

    const startPage = (currentGroup - 1) * groupSize + 1;
    const endPage = Math.min(startPage + groupSize - 1, totalPage);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  }, [currentPage, totalPage]);

  const changePage = (page: number) => {
    handlePageSingle ? handlePageSingle(page) : handlePage({ page });
  };

  return (
    <div className="w-full flex h-32 flex-row justify-between items-center lg:absolute lg:bottom-14 lg:px-4 lg:h-0">
      {(totalData > 0 || pages.length >= 1) && (
        <div className="flex-1 flex flex-row justify-end items-center gap-1">
          {/* PREV GROUP */}
          <button
            type="button"
            className="p-1 disabled:opacity-40"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage === 1 ? 1 : currentPage - 1)}
          >
            <ChevronLeft />
          </button>

          {/* NOMOR HALAMAN (WINDOW 3) */}
          {pages.map((page) => (
            <button
              key={page}
              type="button"
              className="p-2"
              onClick={() => changePage(page)}
            >
              <span
                className={clsx(
                  "text-sm font-semibold text-gray-400",
                  currentPage === page && "text-primary-blue",
                )}
              >
                {page}
              </span>
            </button>
          ))}

          {/* NEXT GROUP */}
          <button
            type="button"
            className="p-1 disabled:opacity-40"
            disabled={currentPage === totalPage}
            onClick={() =>
              changePage(
                currentPage === totalPage ? totalPage : currentPage + 1,
              )
            }
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
