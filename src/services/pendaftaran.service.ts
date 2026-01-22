import AXIOS from "../libs/axios";
import type {
  CreatePendaftaranType,
  ResponsePendaftaranType,
} from "../models/pendaftaran-model";
import type { ResponseData, ResponseMessage } from "../types/type";

export class PendaftaranService {
  // create
  static async create(
    req: CreatePendaftaranType,
  ): Promise<ResponseData<ResponsePendaftaranType>> {
    // response
    const response = await AXIOS.post("/pendaftaran/create", req).then(
      (res) => res.data,
    );
    return response;
  }

  // read
  static async read(): Promise<ResponseData<ResponsePendaftaranType[]>> {
    // response
    const response = await AXIOS.get("/pendaftaran/read").then(
      (res) => res.data,
    );
    return response;
  }

  // update aktif
  static async updateAktif(
    id: number,
    aktif: boolean,
  ): Promise<ResponseData<ResponsePendaftaranType>> {
    // response
    const response = await AXIOS.patch(`/pendaftaran/update-aktif/${id}`, {
      aktif,
    }).then((res) => res.data);

    // return
    return response;
  }

  // delete
  static async delete(id: number): Promise<ResponseMessage> {
    // response
    const response = await AXIOS.delete(`/pendaftaran/delete/${id}`).then(
      (res) => res.data,
    );

    return response;
  }
}
