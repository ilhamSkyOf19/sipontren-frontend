// Ustad Interface (MongoDB)
export interface IUstad {
  id: number; // MongoDB ObjectId sebagai string
  name: string;
  jenis_kelamin: "laki_laki" | "perempuan";
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  no_telepon: string;
  jabatan: string;
  ustad_img: File;
  createdAt: Date;
  updatedAt: Date;
}

// create type
export type CreateUstadType = {
  name: string;
  jenis_kelamin: "laki_laki" | "perempuan";
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  no_telepon: string;
  jabatan: string;
  ustad_img: File;
};

// update type
export type UpdateUstadType = Partial<CreateUstadType> & {
  id: number;
};

// response type
export type ResponseUstadType = Omit<IUstad, "ustad_img"> & {
  ustad_img: string;
};

// response with meta
export type ResponseUstadWithMetaType = {
  data: ResponseUstadType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

// filter data
export type FilterData = {
  search?: string;
  page?: string;
  limit?: string;
};
