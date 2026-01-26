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

// tye tahun
export type TahunType =
  | 2005
  | 2006
  | 2007
  | 2008
  | 2009
  | 2010
  | 2011
  | 2012
  | 2013
  | 2014
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024
  | 2025
  | 2026
  | 2027
  | 2028
  | 2029
  | 2030
  | 2031
  | 2032
  | 2033
  | 2034
  | 2035
  | 2036
  | 2037
  | 2038
  | 2039
  | 2040;
export type MoreFilter = {
  category_prestasi: CategoryPrestasi | undefined;
  jenisKelamin: "laki_laki" | "perempuan" | undefined;
  tahun_prestasi: TahunType | undefined;
};
