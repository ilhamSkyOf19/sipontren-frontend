import { memo, useState, type FC } from "react";
import HeaderSection from "../../../components/HeaderSection";
import clsx from "clsx";
import ScrollXDesktop from "../../../layouts/ScrollXDesktop";
import ScrollXNonDesktop from "../../../layouts/ScrollXNonDesktop";
import { useQuery } from "@tanstack/react-query";
import type { NewsFilterType } from "../../../models/news-model";
import { NewsService } from "../../../services/news.service";
import CardBeritaSmall from "../../../components/CardBeritaSmall";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const filterNews: ("today" | "week" | "month")[] = ["today", "week", "month"];

// Props
type Props = {
  width: number;
};

const SectionBerita: FC<Props> = memo(({ width }) => {
  // choose filter
  const [filter, setFilter] = useState<NewsFilterType>("today");

  // use query
  const { data, isLoading } = useQuery({
    queryKey: ["news", filter],
    queryFn: () => NewsService.readByFilter(filter),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-screen flex flex-col justify-start items-center overflow-hidden py-20">
      <HeaderSection
        judul={"Berita Terkini"}
        ket={
          "Informasi Terkait Pondok Persantren Muhammadiyah Al-Amin Seputih Banyak"
        }
      />

      <div className="w-full flex flex-col justify-start items-center min-h-[50vh]">
        {/* filter */}
        <div className="w-full flex flex-row justify-center items-start gap-4 px-5 mb-4">
          {/* choose */}
          {filterNews.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setFilter(item)}
              className={clsx(
                "text-sm font-semibold capitalize py-2.5 px-5 rounded-lg",
                item === filter
                  ? "bg-secondary-blue text-white"
                  : "bg-white text-secondary-blue shadow-[0_0px_4px_rgba(0,0,0,0.25)] hover:bg-black/5 transition-all ease-in-out duration-200"
              )}
            >
              {item === "today"
                ? "Hari Ini"
                : item === "week"
                ? "Minggu Ini"
                : "Bulan Ini"}
            </button>
          ))}
        </div>

        {width > 700 && (
          <div className="w-[90%] h-px bg-secondary-blue mb-12 opacity-55"></div>
        )}
        {width > 0 && width < 1024 ? (
          isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <span>loading</span>
            </div>
          ) : data?.success && data?.data && data?.data.length > 0 ? (
            <ScrollXNonDesktop>
              {data.data.map((item, index) => (
                <CardBeritaSmall
                  key={index}
                  id={item.id}
                  img={item.thumbnail}
                  jenis={item.category}
                  judul={item.title}
                  deskripsi={item.content}
                />
              ))}
            </ScrollXNonDesktop>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center py-32">
              <p className="text-base text-primary-blue font-medium">
                Tidak ada berita
              </p>
            </div>
          )
        ) : isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span>loading</span>
          </div>
        ) : data?.success && data?.data && data?.data.length > 0 ? (
          <ScrollXDesktop>
            {data.data.map((item, _index) => (
              <CardBeritaSmall
                key={item.id}
                id={item.id}
                img={item.thumbnail}
                jenis={item.category}
                judul={item.title}
                deskripsi={item.content}
              />
            ))}
          </ScrollXDesktop>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center py-32">
            <p className="text-base text-primary-blue font-medium">
              Tidak ada berita
            </p>
          </div>
        )}
      </div>
      <div className="w-full flex  justify-end items-center lg:pt-12 px-4 lg:px-12">
        <Link
          to={"/berita-more"}
          className="py-3 px-6 bg-secondary-blue rounded-lg text-white flex flex-row justify-start items-center gap-3 hover:bg-primary-blue transition-all ease-in-out duration-200"
        >
          <span>Selengkapnya</span>

          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
});

export default SectionBerita;
