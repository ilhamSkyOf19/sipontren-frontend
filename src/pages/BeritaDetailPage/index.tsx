import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { NewsService } from "../../services/news.service";
import { convertDate } from "../../utils/utils";
import { copyLink } from "../../utils/sweetalert/copyLink";

const BeritaDetail = () => {
  // navigate
  const navigate = useNavigate();

  //   get id from parasm
  const { id } = useParams() as { id: string };

  // use query
  const { data: news, isLoading } = useQuery({
    queryKey: ["newsDetailForUser", id],
    queryFn: () => NewsService.detail(+id),
    refetchOnWindowFocus: false,
  });

  //   cek
  if (!news?.success) return;

  // word
  const words: string[] = news?.data.content?.split(".");

  // cek
  const combinedParagraphs = words
    .map((s) => s.trim())
    .filter((s) => s.length)
    .reduce<string[][]>((acc, curr, idx) => {
      const paragraphIndex = Math.floor(idx / 3);
      if (!acc[paragraphIndex]) acc[paragraphIndex] = [];
      acc[paragraphIndex].push(curr);
      return acc;
    }, [])
    .map((group) =>
      group.map((s) => (s.endsWith(".") ? s : s + ".")).join(" "),
    );

  return (
    <main className="flex flex-col justify-start items-center overflow-hidden">
      <div className="w-full flex flex-col justify-start items-start py-10">
        {/* button back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex flex-row justify-strt items-center px-4 gap-3"
        >
          {/* icon arrow long */}
          <FaArrowLeftLong className="text-3xl cursor-pointer text-blue-400" />

          {/* label */}
          <p className="text-base underline font-semibold text-blue-400">
            Kembali
          </p>
        </button>

        {/* content */}
        <div className="w-full flex flex-col justify-start items-center mt-12 gap-4">
          {/* thumbnail */}
          <div className="w-[90%] h-60 rounded-2xl overflow-hidden lg:w-[60%] lg:h-[60vh]">
            <img
              src={`${import.meta.env.VITE_API_BASE_IMG_URL}/news/${
                news.data.thumbnail
              }`}
              alt="thumbnail"
              className="w-full h-full object-contain"
            />
          </div>

          {/* category */}
          <div className="w-[90%] flex flex-row justify-between items-center gap-3">
            <h3 className="px-5 py-1.5 text-sm lg:text-base lg:py-2 border border-blue-400 rounded-md capitalize">
              {news?.data.category ?? ""}
            </h3>

            {/* share button */}
            <button
              type="button"
              className="text-xs lg:text-sm text-secondary-blue underline lg:hidden"
              onClick={() => copyLink()}
            >
              Copy Link Berita
            </button>
          </div>

          {/* title */}
          <div className="w-[90%] flex flex-col gap-3 justify-start items-start">
            {/* author */}
            <div className="w-full flex flex-row justify-start items-center gap-4">
              <p className="text-xs text-primary-blue font-medium lg:text-sm">
                By Admin - {convertDate(news?.data.createdAt)}
              </p>

              {<span className="text-base">|</span>}

              {/* share button */}
              <button
                type="button"
                className="text-xs lg:text-sm text-secondary-blue underline hidden lg:block"
                onClick={() => copyLink()}
              >
                Copy Link Berita
              </button>
            </div>

            <h3 className="font-semibold text-xl">{news?.data.title ?? ""}</h3>
          </div>

          {/* content */}
          <div className="w-[90%] flex flex-col justify-start items-start gap-4">
            {combinedParagraphs.map((item, index) => (
              <p key={index} className="text-base text-black font-normal">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BeritaDetail;
