import { type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ButtonEditText from "../../components/ButtonEditText";
import ButtonDeleteText from "../../components/ButtonDeleteText";
import ButtonAddText from "../../components/ButtonAddText";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BannerService } from "../../services/banner.service";
import NoData from "../../components/NoData";
import useNotifSuccess from "../../hooks/useNotifSuccess";
import { handleActionDelete } from "../../utils/sweetalert/delete";

const BannerPage: FC = () => {
  // query client
  const queryClient = useQueryClient();
  // notification
  useNotifSuccess();

  // query
  const { data: dataBanner, isLoading } = useQuery({
    queryKey: ["bannerForDashboard"],
    queryFn: () => BannerService.read(),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    const result = await handleActionDelete(id, BannerService.delete);

    if (!result) return;

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["bannerForDashboard"],
    });
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 px-4 pb-12">
      {/* header */}
      <HeaderDashboard
        title="Data Banner"
        subTitle="Pusat pengelolaan banner untuk kebutuhan website"
        tanggal={true}
      />

      {/* button add */}
      <div className="w-full flex flex-row justify-start items-start mt-4">
        <ButtonAddText linkAdd="/dashboard/banner/tambah" />
      </div>

      {/* card */}
      <div className="w-full flex flex-col justify-start items-start gap-8 mt-12 ">
        {/* card banner */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-120 bg-gray-300 animate-pulse rounded-md"
            />
          ))
        ) : dataBanner?.success &&
          dataBanner.data &&
          dataBanner.data.length > 0 ? (
          dataBanner.data.map((item, index) => (
            <CardBanner
              key={index}
              img={item.img}
              handleDelete={() => handleDelete(item.id)}
              linkUpdate={`/dashboard/banner/edit/${item.id}`}
            />
          ))
        ) : (
          <NoData />
        )}
      </div>
    </main>
  );
};

// card banner

type CardBannerProps = {
  img: string;
  handleDelete: () => void;
  linkUpdate: string;
};
const CardBanner: FC<CardBannerProps> = ({ img, handleDelete, linkUpdate }) => {
  return (
    <div className="w-full h-50 flex flex-col justify-start items-start bg-primary-white shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded-md overflow-hidden lg:h-120 lg:items-end">
      {/* img */}
      <div className="flex-3 lg:flex-6 w-full overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMG_URL}/banner/${img}`}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 w-full flex flex-row justify-start items-center px-4 gap-4 lg:w-80">
        {/* button edit */}
        <ButtonEditText linkUpdate={linkUpdate} from="banner" />

        {/* button delete */}
        <ButtonDeleteText handleDelete={() => handleDelete()} />
      </div>
    </div>
  );
};

export default BannerPage;
