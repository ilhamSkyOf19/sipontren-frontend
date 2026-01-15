// src/models/news-model.ts
export type NewsFilterType = "today" | "week" | "month";

export type INews = {
  id: number;
  category: "berita" | "artikel";
  title: string;
  content: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

// create
export type CreateNewsType = {
  category: "berita" | "artikel";
  title: string;
  content: string;
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
