import AXIOS from "../libs/axios";
import type { ResponsePamfletType } from "../models/pamflet-model";
import type { ResponseData } from "../types/type";

export class PamfletService {
  // create
  static async create(
    req: FormData,
  ): Promise<ResponseData<ResponsePamfletType>> {
    // get response
    const response = await AXIOS.post("/pamflet/create", req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // read
  static async read(): Promise<ResponseData<ResponsePamfletType[]>> {
    // get response
    const response = await AXIOS.get("/pamflet/read").then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponsePamfletType>> {
    // get response
    const response = await AXIOS.get(`/pamflet/detail/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }

  // update
  static async update(
    id: number,
    req: FormData,
  ): Promise<ResponseData<ResponsePamfletType>> {
    // get response
    const response = await AXIOS.patch(`/pamflet/update/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // delete
  static async delete(id: number): Promise<ResponseData<ResponsePamfletType>> {
    // get response
    const response = await AXIOS.delete(`/pamflet/delete/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }
}
