// import { useQueryClient } from "@tanstack/react-query";

// export const useDeleteSuratMasuk = () => {
//   const queryClient = useQueryClient();

//   const deleteSuratMasukWithRefresh = async (id: number) => {
//     const response = await handleDeleteSuratMasuk(id);

//     if (!response) return null;

//     // invalidate setelah delete berhasil
//     queryClient.invalidateQueries({
//       queryKey: ["suratMasuk"],
//     });

//     return response;
//   };

//   return {
//     deleteSuratMasukWithRefresh,
//   };
// };

// export const useDeleteSuratKeluar = () => {
//   const queryClient = useQueryClient();

//   const deleteSuratKeluarWithRefresh = async (id: number) => {
//     const response = await handleDeleteSuratKeluar(id);

//     if (!response) return null;

//     // invalidate setelah delete berhasil
//     queryClient.invalidateQueries({
//       queryKey: ["suratKeluar"],
//     });

//     return response;
//   };

//   return {
//     deleteSuratKeluarWithRefresh,
//   };
// };
