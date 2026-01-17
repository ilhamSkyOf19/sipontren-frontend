import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const useNotifSuccess = (): void => {
  const state = useLocation().state as {
    success?: boolean;
    message?: string;
  } | null;

  useEffect(() => {
    if (!state?.success) return;

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: state?.message || "Berhasil",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      customClass: {
        container: "swal-z",
      },
      padding: "7px 12px",
    });

    window.history.replaceState({}, document.title);
  }, [state]);
};

export default useNotifSuccess;
