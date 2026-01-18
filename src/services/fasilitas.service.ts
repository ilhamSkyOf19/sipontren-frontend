import AXIOS from "../libs/axios";
import type {
  FilterData,
  ResponseFasilitasType,
  ResponseFasilitasWithMetaType,
} from "../models/fasilitas-model";
import type { ResponseData } from "../types/type";

export class FasilitasService {
  // create
  static async create(
    req: FormData,
  ): Promise<ResponseData<ResponseFasilitasType | null>> {
    // get response
    const response = await AXIOS.post("/fasilitas/create", req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // read
  static async read({
    page,
    search,
  }: FilterData): Promise<ResponseData<ResponseFasilitasWithMetaType>> {
    // get response
    const response = await AXIOS.get("/fasilitas/read", {
      params: {
        page,
        search,
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(
    id: number,
  ): Promise<ResponseData<ResponseFasilitasType>> {
    // get response
    const response = await AXIOS.get(`/fasilitas/detail/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }

  // update
  static async update(
    id: number,
    req: FormData,
  ): Promise<ResponseData<ResponseFasilitasType>> {
    // get response
    const response = await AXIOS.patch(`/fasilitas/update/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // delete

  static async delete(
    id: number,
  ): Promise<ResponseData<ResponseFasilitasType>> {
    // get response
    const response = await AXIOS.delete(`/fasilitas/delete/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }
}
