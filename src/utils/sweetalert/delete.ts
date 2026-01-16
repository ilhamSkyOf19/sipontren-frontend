import Swal from "sweetalert2";

export const handleDelete = async (_id: number) => {
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

  // Jika user klik Batal
  if (!result.isConfirmed) return null;

  try {
    // call service
    // const response = await SuratMasukService.deleteById(id);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data berhasil dihapus",
      timer: 1500,
      width: 400,
      showConfirmButton: false,
    });

    // return
    // return response;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Data gagal dihapus",
    });

    return null;
  }
};
