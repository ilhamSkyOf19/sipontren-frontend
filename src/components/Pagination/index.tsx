import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC } from "react";

type Props = {
  start: number;
  end: number;
  totalData: number;
  totalPage: number;
  handlePage: (
    newValues: Partial<{ page: number; from: string; to: string }>
  ) => void;
  currentPage: number;
  handlePageSingle?: (page: number) => void;
};
const Pagination: FC<Props> = ({
  end,
  start,
  totalData,
  totalPage,
  handlePage,
  currentPage,
  handlePageSingle,
}) => {
  return (
    <div className="w-full flex flex-row justify-between items-center absolute bottom-12">
      {/* showing */}
      {totalData !== 0 && (
        <>
          <div className="flex-1 flex flex-row justify-start items-center gap-1 text-sm">
            <span className="font-medium">showing</span>
            <span className="font-medium">
              {start.toString().padStart(2, "0")}
            </span>
            <span>-</span>
            <span className="font-medium">
              {end.toString().padStart(2, "0")}
            </span>
            <span className="font-medium">of {totalData}</span>
          </div>

          {/* pagination */}
          <div className="flex-1 flex flex-row justify-end items-center">
            {/* prev */}
            <button
              type="button"
              className="p-1"
              onClick={() => {
                handlePageSingle
                  ? handlePageSingle(currentPage === 1 ? 1 : currentPage - 1)
                  : handlePage({
                      page: currentPage === 1 ? 1 : currentPage - 1,
                    });
              }}
            >
              <ChevronLeft />
            </button>

            {Array.from({ length: totalPage }, (_, i) => (
              <button
                key={i}
                type="button"
                className="p-2"
                onClick={() => {
                  handlePageSingle
                    ? handlePageSingle(i + 1)
                    : handlePage({
                        page: i + 1,
                      });
                }}
              >
                <span className="text-sm font-semibold">{i + 1}</span>
              </button>
            ))}

            {/* next */}
            <button
              type="button"
              className="p-1"
              onClick={() =>
                handlePage({
                  page: currentPage === totalPage ? totalPage : currentPage + 1,
                })
              }
            >
              <ChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagination;
