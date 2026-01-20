import { useState, type FC } from "react";
import plug from "../../assets/icons/plug.webp";
import AXIOS from "../../libs/axios";

const ErrorNetwork: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    setLoading(true);
    try {
      await AXIOS.get("/ping");
      window.location.href = "/";
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 px-4 text-center">
      {/* icon */}
      <img src={plug} alt="icon plug" className="w-24" />

      {/* judul */}
      <h3 className="text-lg font-semibold text-secondary-blue">
        Tidak Ada Koneksi Internet
      </h3>

      {/* deskripsi */}
      <p className="text-sm text-gray-600 max-w-sm">
        Sepertinya perangkat Anda sedang offline atau server tidak dapat
        diakses. Silakan periksa koneksi internet Anda dan coba muat ulang
        halaman.
      </p>

      {/* tombol reload */}
      <button
        onClick={handleRetry}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Memeriksa..." : "Coba Lagi"}
      </button>
    </div>
  );
};

export default ErrorNetwork;
