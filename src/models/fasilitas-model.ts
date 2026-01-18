// MongoDB / Mongoose style
export type IFasilitas = {
  id: number;
  fasilitas: string;
  keterangan: string;
  images: File;
  createdAt: Date;
  updatedAt: Date;
};

// Create – tanpa id, dibuat otomatis
export type CreateFasilitasType = Pick<
  IFasilitas,
  "fasilitas" | "keterangan" | "images"
>;

// Update – id wajib,
export type UpdateFasilitasType = Partial<CreateFasilitasType>;

// Response –
export type ResponseFasilitasType = {
  id: number;
  fasilitas: string;
  keterangan: string;
  images: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseFasilitasWithMetaType = {
  data: ResponseFasilitasType[];
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
