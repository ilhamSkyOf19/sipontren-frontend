// Alumni Interface (MongoDB)
export type IAlumni = {
  id: number; // MongoDB ObjectId (wajib)
  name: string;
  angkatan: string;
  description: string;
  img_alumni: string;
  createdAt: Date; // timestamps wajib ada
  updatedAt: Date;
};

// CREATE – tanpa id (dibuat oleh MongoDB)
export type CreateAlumniType = {
  name: string;
  angkatan: string;
  description: string;
  img_alumni: string;
};

// UPDATE – semua optional kecuali id
export type UpdateAlumniType = Partial<CreateAlumniType> & {
  id: number; // wajib
};

// RESPONSE – dikirim kembali ke FE
export type ResponseAlumniType = {
  id: number;
  name: string;
  angkatan: string;
  description: string;
  img_alumni: string;
  createdAt: Date;
  updatedAt: Date;
};

// response with meta
export type ResponseAlumniWithMetaType = {
  data: ResponseAlumniType[];
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
};
