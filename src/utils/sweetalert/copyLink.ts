import Swal from "sweetalert2";

export const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Link disalin",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false,
    width: "260px",
    padding: "8px",
  });
};
