import { useEffect, type FC } from "react";
import checkIcon from "../../assets/icons/check.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SuccessPage: FC = () => {
  // cek state
  const location = useLocation();
  const navigate = useNavigate();

  // //   cek parms
  useEffect(() => {
    if (!location.state?.name) navigate("/");
  }, [location.state?.name]);

  //   window top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-start items-center">
        {/* icon */}
        <img
          src={checkIcon}
          alt="check icon"
          className="w-38 h-38 animate-slide-up-bounce lg:w-58 lg:h-58"
          loading="lazy"
        />

        {/* deskripsi */}
        <div className=" flex flex-col justify-center items-center w-[90%]">
          {/* title */}
          <p className="text-3xl font-semibold text-primary-blue text-center mb-2 animate-fade-in lg:text-4xl">
            Terimakasih!
          </p>

          {/* name */}
          <p className="text-base font-semibold text-center mb-2 animate-fade-in bg-secondary-blue px-4 py-0.5 rounded-md text-primary-white lg:text-base">
            {location.state?.name}
          </p>
          {/* desc */}
          <p className="text-sm text-primary-blue text-center animate-fade-in lg:text-base">
            Pendaftaran Anda telah <span className=" font-bold ">Berhasil</span>
          </p>

          {/* information */}
          <p className="text-sm text-primary-blue text-center mt-2 animate-fade-in lg:text-base">
            Silahkan tunggu <span className="font-bold">konfirmasi</span> dari
            pihak Pondok Pesantren dan jika ada{" "}
            <span className="font-bold">pertanyaan</span> silahkan hubungi
            kontak kami
          </p>

          {/* button back */}
          <Link
            to={"/"}
            className="py-2.5 px-6 bg-secondary-blue text-primary-white rounded-lg mt-5 uppercase font-medium relative hover:bg-primary-blue transition-all ease-in-out duration-200 animate-fade-in"
          >
            kembali
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
