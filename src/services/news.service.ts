import AXIOS from "../libs/axios";
import {} from "../models/news-model";
import type { ResponseData } from "../types/type";
import type {
  FilterData,
  NewsFilterType,
  ResponseNewsType,
  ResponseNewsWithMetaType,
} from "../models/news-model";

export class NewsService {
  // create
  static async create(
    req: FormData,
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
  static async read({
    from,
    page,
    search,
    to,
  }: FilterData): Promise<ResponseData<ResponseNewsWithMetaType>> {
    // get response
    const response = await AXIOS.get("/news/read", {
      params: {
        from,
        page,
        search,
        to,
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponseNewsType>> {
    // get response
    const response = await AXIOS.get(`/news/detail/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }

  // read by filter
  static async readByFilter(
    filter: NewsFilterType,
  ): Promise<ResponseData<ResponseNewsType[]>> {
    // get response
    const response = await AXIOS.get(`/news/readByFilter/${filter}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }

  // update
  static async update(id: number, req: FormData) {
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
      (res) => res.data,
    );

    // return
    return response;
  }
}
