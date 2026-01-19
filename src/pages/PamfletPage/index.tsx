import { type FC } from "react";
import HeaderDashboard from "../../components/HeaderDashboard";
import ButtonEditText from "../../components/ButtonEditText";
import ButtonDeleteText from "../../components/ButtonDeleteText";
import ButtonAddText from "../../components/ButtonAddText";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NoData from "../../components/NoData";
import useNotifSuccess from "../../hooks/useNotifSuccess";
import { handleActionDelete } from "../../utils/sweetalert/delete";
import { PamfletService } from "../../services/pamflet.service";

const PamfletPage: FC = () => {
  // query client
  const queryClient = useQueryClient();
  // notification
  useNotifSuccess();

  // query
  const { data: dataPamflet, isLoading } = useQuery({
    queryKey: ["pamfletForDashboard"],
    queryFn: () => PamfletService.read(),
    refetchOnWindowFocus: false,
  });

  // handle delete
  const handleDelete = async (id: number) => {
    // handle delete
    const result = await handleActionDelete(id, PamfletService.delete);

    if (!result) return;

    // refresh
    queryClient.invalidateQueries({
      queryKey: ["pamfletForDashboard"],
    });
  };

  return (
    <main className="w-full flex flex-col justify-start items-center relative overflow-hidden lg:pt-4 px-4 pb-12">
      {/* header */}
      <HeaderDashboard
        title="Data Pamflet"
        subTitle="Pusat pengelolaan pamflet untuk kebutuhan website"
        tanggal={true}
      />

      {/* button add */}
      <div className="w-full flex flex-row justify-start items-start mt-4">
        <ButtonAddText linkAdd="/dashboard/pamflet/tambah" />
      </div>

      {/* card */}
      <div className="w-full flex flex-col justify-start items-start gap-8 mt-12 lg:flex-row">
        {/* card banner */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-120 bg-gray-300 animate-pulse rounded-md"
            />
          ))
        ) : dataPamflet?.success &&
          dataPamflet.data &&
          dataPamflet.data.length > 0 ? (
          dataPamflet.data.map((item, index) => (
            <CardPamflet
              key={index}
              img={item.pamflet}
              handleDelete={() => handleDelete(item.id)}
              linkUpdate={`/dashboard/pamflet/edit/${item.id}`}
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

type CardPamfletProps = {
  img: string;
  handleDelete: () => void;
  linkUpdate: string;
};
const CardPamflet: FC<CardPamfletProps> = ({
  img,
  handleDelete,
  linkUpdate,
}) => {
  return (
    <div className="w-full h-110 flex flex-col justify-start items-start bg-primary-white shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded-md overflow-hidden lg:h-130 lg:w-140 lg:items-end">
      {/* img */}
      <div className="flex-6 lg:flex-8 w-full overflow-hidden">
        <img
          src={`${import.meta.env.VITE_API_BASE_IMG_URL}/pamflet/${img}`}
          alt="banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 w-full flex flex-row justify-start items-center px-4 gap-4 lg:w-80">
        {/* button edit */}
        <ButtonEditText linkUpdate={linkUpdate} from="pamflet" />

        {/* button delete */}
        <ButtonDeleteText handleDelete={() => handleDelete()} />
      </div>
    </div>
  );
};

export default PamfletPage;
