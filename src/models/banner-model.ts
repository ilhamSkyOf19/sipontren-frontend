// MongoDB / Mongoose style
export type IBanner = {
  id: number;
  img: File;
  createdAt: string;
  updatedAt: string;
};

// Create – tanpa id, dibuat otomatis
export type CreateBannerType = {
  img: File;
};

// Update – id wajib, pamflet optional
export type UpdateBannerType = {
  id: number;
  img?: File;
};

// Response – dikirim ke FE
export type ResponseBannerType = {
  id: number;
  img: string;
  createdAt: string;
  updatedAt: string;
};
