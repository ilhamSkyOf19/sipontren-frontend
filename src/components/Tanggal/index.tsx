import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDateID, formatTime } from "../../utils/utils";

const Tanggal = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const msToNextMinute = (60 - now.getSeconds()) * 1000;

    const timeout = setTimeout(() => {
      setNow(new Date());

      // setelah itu update tiap menit
      const interval = setInterval(() => setNow(new Date()), 60 * 1000);
      // bersihkan interval saat unmount
      return () => clearInterval(interval);
    }, msToNextMinute);

    return () => clearTimeout(timeout);
  }, [now]);

  return (
    <div className="flex-1 flex-row justify-end items-center hidden md:flex">
      <div className="bg-primary-white shadow-[0_6px_10px_1px_rgba(0,0,0,0.1)] py-2.5 px-4.5 rounded-md flex flex-row justify-between items-center gap-2 hover:-translate-y-1 transition-transform duration-200 ease-in-out">
        <CalendarDays size={18} className="text-primary-blue" />
        <div className="w-full flex flex-row justify-start items-center gap-2">
          <span className="text-sm font-semibold">{formatDateID(now)}</span>
          <span className="text-sm font-semibold text-primary-brown">|</span>
          <span className="text-sm font-semibold">{formatTime(now)}</span>
        </div>
      </div>
    </div>
  );
};

export default Tanggal;
