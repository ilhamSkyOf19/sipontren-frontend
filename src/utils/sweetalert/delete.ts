import Swal from "sweetalert2";

export const handleActionDelete = async (
  id: number,
  deleteService: (id: number) => Promise<any>,
  options?: {
    successMessage?: string;
    errorMessage?: string;
  }
): Promise<boolean> => {
  const result = await Swal.fire({
    title: "Yakin ingin menghapus?",
    text: "Data yang dihapus tidak bisa dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus",
    cancelButtonText: "Batal",
    confirmButtonColor: "#d33",
    width: 400,
    customClass: {
      container: "swal-z",
    },
  });

  if (!result.isConfirmed) return false;

  try {
    const response = await deleteService(id);

    await Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: options?.successMessage ?? "Data berhasil dihapus",
      timer: 1500,
      width: 400,
      showConfirmButton: false,
      customClass: {
        container: "swal-z",
      },
    });

    return response ? true : false;
  } catch (error) {
    await Swal.fire({
      icon: "error",
      title: "Gagal",
      text: options?.errorMessage ?? "Data gagal dihapus",
      customClass: {
        container: "swal-z",
      },
    });

    return false;
  }
};
