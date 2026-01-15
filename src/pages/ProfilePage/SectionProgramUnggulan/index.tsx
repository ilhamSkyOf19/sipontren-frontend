import type { FC } from "react";
import thumbnailProfile from "../../../assets/thumbnails/thumbnail_profile.png";
import SubJudulLeft from "../../../components/SubJudulLeft";

const SectionProgramUnggulan: FC = () => {
  return (
    <div className="w-full min-h-[40vh] bg-transparent flex flex-col justify-start items-start py-12 px-4 lg:px-12 gap-10 lg:py-0 lg:h-[65vh]">
      <div className="w-full bg-transparent flex flex-row justify-start items-start lg:justify-between lg:items-center lg:h-full">
        <div className="w-full flex flex-col justify-start items-start gap-8 lg:w-[50%]">
          <SubJudulLeft title={"Program Unggulan"} />
          <p className="text-sm text-primary-blue md:text-lg leading-6 md:leading-8 lg:mt-4 lg:leading-9">
            Ada beberapa program unggulan di Pontren Mu seperti{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              Tahfidz Al-Quran
            </span>
            ,{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              Bahasa Inggris
            </span>
            ,{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              Bahasa Arab
            </span>
            ,{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              Desain Grafis
            </span>
            ,{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              Movie Maker
            </span>
            , dan{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              Bidang Pelajaran Pilihan
            </span>
            . Namun yang paling mendominasi ialah{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              Tahfidz Al-Quran
            </span>
            . Proses pembelajaran Tahfidz Al-Quran ada beberapa cara, salah
            satunya kami membuka{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              kelas khusus Tahfidz
            </span>
            , sehingga santri-santri yang memiliki keinginan lebih untuk
            menambah hafalan bisa mengikuti{" "}
            <span className="bg-primary-blue text-white px-2 rounded">
              kelas khusus Tahfidz Quran
            </span>
            .
          </p>
        </div>
        <div className="w-full h-[30vh] hidden flex-col justify-end items-center rounded-4xl overflow-hidden md:h-[65vh] lg:h-full lg:w-[36%] lg:flex ">
          <div
            className={`w-[90%] h-52 flex flex-col justify-center items-center  rounded-3xl relative bg-primary-yellow md:w-[80%] md:h-112 lg:w-full lg:h-[65%] group`}
          >
            <img
              src={thumbnailProfile}
              alt="logo sipontren"
              className="w-full absolute -bottom-1 group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionProgramUnggulan;
