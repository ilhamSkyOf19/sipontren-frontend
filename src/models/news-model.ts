// src/models/news-model.ts
export type NewsFilterType = "today" | "week" | "month";

export type INews = {
  id: number;
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: File;
  createdAt: Date;
  updatedAt: Date;
};

// create
export type CreateNewsType = {
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: File;
};

// update
export type UpdateNewsType = Partial<CreateNewsType>;

// response
export type ResponseNewsType = CreateNewsType & {
  id: number;
  thumbnail: string;
  url_thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponseNewsWithMetaType = {
  data: ResponseNewsType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

export type FilterData = {
  from?: string;
  to?: string;
  search?: string;
  page?: string;
};
