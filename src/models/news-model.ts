import type { ResponseLinkBeritaType } from "./linkBerita-model";

// =======================
// FILTER
// =======================
export type NewsFilterType = "today" | "week" | "month";

// =======================
// ENTITY (Prisma Result)
// =======================
export type INews = {
  id: number;
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;

  // relasi
  link_berita?: {
    id: number;
    label: string;
    link: string;
    newsId: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

// =======================
// LINK INPUT (CREATE)
// =======================
export type CreateLinkBeritaInputType = {
  label: string;
  link: string;
};

// =======================
// CREATE
// =======================
export type CreateNewsType = {
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: File;

  link_berita?: string;
  update_link_berita?: string;
};

// =======================
// UPDATE
// =======================
export type UpdateNewsType = Partial<CreateNewsType>;

// =======================
// RESPONSE
// =======================
export type ResponseNewsType = {
  id: number;
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;

  // relasi
  link_berita?: ResponseLinkBeritaType[];
};

// =======================
// RESPONSE WITH META
// =======================
export type ResponseNewsWithMetaType = {
  data: ResponseNewsType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

// =======================
// FILTER DATA
// =======================
export type FilterData = {
  from?: string;
  to?: string;
  search?: string;
  page?: string;
};
