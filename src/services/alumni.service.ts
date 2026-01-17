import AXIOS from "../libs/axios";
import type {
  FilterData,
  ResponseAlumniType,
  ResponseAlumniWithMetaType,
} from "../models/alumni-model";
import type { ResponseData } from "../types/type";
export class AlumniService {
  // create
  static async create(
    req: FormData
  ): Promise<ResponseData<ResponseAlumniType | null>> {
    // get response
    const response = await AXIOS.post("/alumni/create", req, {
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
  }: FilterData): Promise<ResponseData<ResponseAlumniWithMetaType>> {
    // get response
    const response = await AXIOS.get("/alumni/read", {
      params: {
        page,
        search,
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponseAlumniType>> {
    // get response
    const response = await AXIOS.get(`/alumni/detail/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }

  // update
  static async update(
    id: number,
    req: FormData
  ): Promise<ResponseData<ResponseAlumniType>> {
    // get response
    const response = await AXIOS.patch(`/alumni/update/${id}`, req, {
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
    const response = await AXIOS.delete(`/alumni/delete/${id}`).then(
      (res) => res.data
    );

    // return
    return response;
  }
}
