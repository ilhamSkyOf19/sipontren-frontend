import AXIOS from "../libs/axios";
import type {
  FilterPrestasiData,
  ResponsePrestasiCountType,
  ResponsePrestasiType,
  ResponsePrestasiWithMetaType,
} from "../models/prestasi-model";
import type { ResponseData } from "../types/type";
export class PrestasiService {
  // create
  static async create(
    req: FormData,
  ): Promise<ResponseData<ResponsePrestasiType | null>> {
    // get response
    const response = await AXIOS.post("/prestasi/create", req, {
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
    category_prestasi,
    jenis_kelamin,
    tahun_prestasi,
  }: FilterPrestasiData): Promise<ResponseData<ResponsePrestasiWithMetaType>> {
    // get response
    const response = await AXIOS.get("/prestasi/read", {
      params: {
        page,
        search,
        category_prestasi,
        jenis_kelamin,
        tahun_prestasi,
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  //   get count
  static async getCount(): Promise<ResponseData<ResponsePrestasiCountType>> {
    // call api
    const response = await AXIOS.get("/prestasi/count").then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponsePrestasiType>> {
    // get response
    const response = await AXIOS.get(`/prestasi/detail/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }

  // update
  static async update(
    id: number,
    req: FormData,
  ): Promise<ResponseData<ResponsePrestasiType>> {
    // get response
    const response = await AXIOS.patch(`/prestasi/update/${id}`, req, {
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
    const response = await AXIOS.delete(`/prestasi/delete/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }
}
