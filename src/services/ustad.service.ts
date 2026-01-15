import AXIOS from "../libs/axios";
import type { ResponseData } from "../types/type";
import type { ResponseUstadType } from "../models/ustad-model";
export class UstadService {
  // create
  static async create(
    req: FormData
  ): Promise<ResponseData<ResponseUstadType | null>> {
    // get response
    const response = await AXIOS.post("/ustad/create", req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // read
  static async read(): Promise<ResponseData<ResponseUstadType[]>> {
    // get response
    const response = await AXIOS.get("/ustad/read").then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponseUstadType>> {
    // get response
    const response = await AXIOS.get(`/ustad/detail/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }

  // update
  static async update(
    req: FormData,
    id: number
  ): Promise<ResponseData<ResponseUstadType>> {
    // get response
    const response = await AXIOS.patch(`/ustad/update/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // delete
  static async delete(id: number): Promise<ResponseData<ResponseUstadType>> {
    // get response
    const response = await AXIOS.delete(`/ustad/delete/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }
}
