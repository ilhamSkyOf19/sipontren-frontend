import AXIOS from "../libs/axios";
import type { ResponseData } from "../types/type";
import type { ResponseBannerType } from "../models/banner-model";

export class BannerService {
  // create
  static async create(
    req: FormData,
  ): Promise<ResponseData<ResponseBannerType | null>> {
    const response = await AXIOS.post("/banner/create", req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    return response;
  }

  // read
  static async read(): Promise<ResponseData<ResponseBannerType[]>> {
    const response = await AXIOS.get("/banner/read").then((res) => res.data);
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponseBannerType>> {
    const response = await AXIOS.get(`/banner/detail/${id}`).then(
      (res) => res.data,
    );
    return response;
  }

  // update
  static async update(id: number, req: FormData) {
    const response = await AXIOS.patch(`/banner/update/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    return response;
  }

  // delete
  static async delete(id: number) {
    const response = await AXIOS.delete(`/banner/delete/${id}`).then(
      (res) => res.data,
    );

    return response;
  }
}
