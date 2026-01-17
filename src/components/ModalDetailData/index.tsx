import { type FC } from "react";
import { Download, Pencil, Trash, X } from "lucide-react";
import clsx from "clsx";
import ButtonAction from "../ButtonAction";
import { useNavigate } from "react-router-dom";

type Props = {
  data: {
    label: string;
    value: string;
  }[];
  handleClose: () => void;
  handleDelete: () => void;
  size?: "sm" | "lg";
  linkUpdate: string;
  img?: string;
  pathImg?: string;
  download?: boolean;
};

const ModalDetailData: FC<Props> = ({
  data,
  handleClose,
  handleDelete,
  size,
  linkUpdate,
  img,
  pathImg,
  download,
}) => {
  //   // call hoks
  //   const { deleteSuratMasukWithRefresh } = useDeleteSuratMasuk();
  //   const { deleteSuratKeluarWithRefresh } = useDeleteSuratKeluar();

  //   // handle delete
  //   const handleDelete = async (id: number) => {
  //     // delete
  //     const response =
  //       type === "suratMasuk"
  //         ? await deleteSuratMasukWithRefresh(id)
  //         : await deleteSuratKeluarWithRefresh(id);

  //     // cek
  //     if (!response) return;

  //     // close
  //     return handleClose();
  //   };

  //   // use mutation
  //   const { mutateAsync } = useMutation({
  //     mutationFn: (data: string[]) => {
  //       if (type === "suratKeluar") {
  //         return SuratKeluarService.downloadFile(data);
  //       } else {
  //         return SuratMasukService.downloadFile(data);
  //       }
  //     },
  //     onSuccess: () => {
  //       console.log("success download");
  //     },
  //     onError: () => {
  //       console.log("error");
  //     },
  //   });

  //   // handle download
  //   const handleDownload = async (data: string[]) => {
  //     try {
  //       await mutateAsync(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  // navigate
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "w-[90vw] flex flex-col justify-start items-center py-8 px-8 overflow-y-scroll overflow-hidden scrollbar-hidden relative lg:w-[40vw]",
        size === "sm" ? "h-[50]" : "h-[90vh]",
      )}
    >
      {/* button close */}
      <button
        type="button"
        className="absolute right-4 top-4"
        onClick={() => handleClose()}
      >
        <X size={24} />
      </button>

      {/* data */}
      <div className="w-full flex flex-col justify-start items-center">
        {/* header */}
        <h2 className="w-full text-center text-xl font-semibold">
          Data Detail
        </h2>

        {/* line */}
        <div className="w-full h-px bg-primary-black/50 mt-3" />

        {/* content */}
        <div className="w-full flex flex-col justify-start items-start mt-6 gap-3">
          {data.map((item, index) => (
            <ComponentData key={index} label={item.label} value={item.value} />
          ))}

          {/* img */}
          {pathImg && img && (
            <div className="w-full flex flex-row justify-start items-start gap-2">
              <div className="flex-1 flex flex-row justify-between items-start">
                <p className="text-sm lg:text-base font-medium capitalize">
                  Foto
                </p>
                <p className="text-sm lg:text-base font-medium">:</p>
              </div>

              <div className="flex-1 w-full overflow-hidden">
                <div className="w-35 h-45 overflow-hidden rounded-xl">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_IMG_URL}/${pathImg}/${img}`}
                    alt="foto"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* action */}
        <div className="w-full flex flex-row justify-evenly items-center mt-8 lg:gap-4">
          {/* button update */}
          <ButtonAction
            label="update"
            handleClick={() => navigate(linkUpdate)}
            color="bg-primary-blue"
            icon={<Pencil size={20} className="text-primary-white" />}
          />

          {/* download */}
          {download && (
            <ButtonAction
              label="download"
              handleClick={() => {}}
              color="bg-gray-400"
              icon={<Download size={20} className="text-primary-white" />}
            />
          )}

          {/* button delete */}
          <ButtonAction
            label="delete"
            handleClick={() => handleDelete()}
            color="bg-primary-red"
            icon={<Trash size={20} className="text-primary-white" />}
          />
        </div>
      </div>
    </div>
  );
};

// data
type ComponentDataProps = {
  label: string;
  value: string;
};
const ComponentData: FC<ComponentDataProps> = ({ label, value }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start gap-2">
      <div className="flex-1 flex flex-row justify-between items-start">
        <p className="text-sm lg:text-base font-medium capitalize">{label}</p>
        <p className="text-sm lg:text-base font-medium">:</p>
      </div>
      <p className="flex-1 text-sm lg:text-base">{value}</p>
    </div>
  );
};

export default ModalDetailData;
