import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize";
import clsx from "clsx";

// Props
type Props = {
  id: number;
  img: string;
  judul: string;
  deskripsi: string;
  jenis: "berita" | "artikel";
  admin?: boolean;
  handleDelete?: () => void;
  linkUpdate?: string;
  handleModal?: () => void;
};
const CardBeritaSmall: FC<Props> = ({
  id,
  img,
  judul,
  deskripsi,
  jenis,
  admin,
  handleDelete,
  linkUpdate,
  handleModal,
}) => {
  // window size
  const window = useWindowSize().width;

  // navigate
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "w-[40vw] flex flex-col justify-start items-start overflow-hidden gap-4 shrink-0 md:w-68 md:mr-4 lg:w-76 lg:gap-2",
        admin ? "h-105 md:h-110" : "h-90 md:h-104 lg:h-104",
      )}
    >
      <div className="w-full h-32 bg-black rounded-2xl overflow-hidden shrink-0 md:h-52 lg:mb-2 lg:rounded-4xl lg:h-48 group">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMG_URL}/news/${img}`}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      <p className="px-4 py-1 bg-white rounded-lg border border-secondary-blue text-xs md:text-[1.1rem] lg:text-xs capitalize">
        {jenis || ""}
      </p>
      <div className="flex flex-col justify-start items-start gap-3">
        <p className="w-[90%] h-14 text-sm font-normal md:text-lg md:h-20 lg:text-sm lg:h-14">
          {(judul || "").slice(
            0,
            window > 0 && window < 760
              ? 35
              : window > 760 && window < 1024
                ? 60
                : window > 1024
                  ? 70
                  : 60,
          )}
          ...
        </p>
        <p className="w-full h-[2.7rem] text-xs text-slate-500 md:text-[1.1rem] md:h-24 lg:text-xs lg:h-14">
          {(deskripsi || "").slice(
            0,
            window > 0 && window < 760
              ? 50
              : window > 760 && window < 1024
                ? 90
                : window > 1024
                  ? 100
                  : 60,
          )}
          ...
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          if (admin && handleModal) {
            handleModal();
          } else {
            navigate(`/berita-detail/${id}`, {
              state: {
                from: "berita",
              },
            });
          }
        }}
        className="text-xs underline cursor-pointer active:text-slate-400 md:text-lg lg:text-xs"
      >
        Baca Selengkapnya
      </button>

      {/* action */}
      {admin && linkUpdate && handleDelete && (
        <div className="w-full flex flex-row justify-start items-center gap-2">
          {/* button edit */}
          <button
            onClick={() => {
              navigate(linkUpdate, {
                state: {
                  from: "berita & artikel",
                },
              });
            }}
            type="button"
            className="w-full flex flex-row justify-center items-center bg-secondary-blue hover:bg-primary-blue transition-all ease-in-out duration-200 py-2 px-4 rounded-lg"
          >
            <span className="text-sm font-medium text-white capitalize">
              edit
            </span>
          </button>

          {/* button delete */}
          <button
            onClick={() => handleDelete()}
            type="button"
            className="w-full bg-primary-red flex flex-row justify-center items-center relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-primary-black/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:ease-in-out before:duration-200 py-2 px-4 rounded-lg"
          >
            <span className="text-sm font-medium text-white capitalize">
              delete
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CardBeritaSmall;
