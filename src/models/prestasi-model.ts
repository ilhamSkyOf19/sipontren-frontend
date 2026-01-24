export type CategoryPrestasi =
  | "internasional"
  | "nasional"
  | "provinsi"
  | "kabupaten"
  | "kecamatan";

export type JenisKelamin = "laki_laki" | "perempuan";

export type IPrestasi = {
  id: number;
  category_prestasi: CategoryPrestasi;
  nama: string;
  tahun_prestasi: number;
  prestasi: string;
  photo: File;
  jenis_kelamin: JenisKelamin;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePrestasiType = {
  category_prestasi: CategoryPrestasi;
  nama: string;
  tahun_prestasi: string;
  prestasi: string;
  jenis_kelamin: JenisKelamin;
  photo: File;
};

export type UpdatePrestasiType = Partial<CreatePrestasiType> & {
  id: number;
};

export type ResponsePrestasiType = {
  id: number;
  category_prestasi: CategoryPrestasi;
  nama: string;
  tahun_prestasi: number;
  prestasi: string;
  photo: string;
  jenis_kelamin: JenisKelamin;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponsePrestasiWithMetaType = {
  data: ResponsePrestasiType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

export type ResponsePrestasiCountType = {
  internasional: number;
  nasional: number;
  provinsi: number;
  kabupaten: number;
  kecamatan: number;
};

export type FilterPrestasiData = {
  search?: string;
  category_prestasi?: CategoryPrestasi;
  jenis_kelamin?: JenisKelamin;
  tahun_prestasi?: number;
  page?: string;
};

export type PrestasiFilterKey = "category_prestasi" | "tahun_prestasi";
export type MoreFilter = {
  category_prestasi: CategoryPrestasi | undefined;
  jenis_kelamin: "laki_laki" | "perempuan" | undefined;
  tahun_prestasi: number | undefined;
};
