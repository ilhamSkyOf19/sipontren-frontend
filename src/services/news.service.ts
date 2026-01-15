import AXIOS from "../libs/axios";
import {} from "../models/news-model";
import type { ResponseData } from "../types/type";
import type { NewsFilterType, ResponseNewsType } from "../models/news-model";

export class NewsService {
  // create
  static async create(
    req: FormData
  ): Promise<ResponseData<ResponseNewsType | null>> {
    // get response
    const response = await AXIOS.post("/news/create", req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // read
  static async read(): Promise<ResponseData<ResponseNewsType[]>> {
    // get response
    const response = await AXIOS.get("/news/read").then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponseNewsType>> {
    // get response
    const response = await AXIOS.get(`/news/detail/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }

  // read by filter
  static async readByFilter(
    filter: NewsFilterType
  ): Promise<ResponseData<ResponseNewsType[]>> {
    // get response
    const response = await AXIOS.get(`/news/readByFilter/${filter}`).then(
      (res) => res.data
    );

    // return
    return response;
  }

  // update
  static async update(req: FormData, id: number) {
    // get response
    const response = await AXIOS.patch(`/news/update/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // delete

  static async delete(id: number) {
    // get response
    const response = await AXIOS.delete(`/news/delete/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }
}
