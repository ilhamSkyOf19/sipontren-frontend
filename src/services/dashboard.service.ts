import AXIOS from "../libs/axios";
import type { DashboardResponse } from "../models/dashboard-model";
import type {
  ResponseJumlahAlumniType,
  UpdateJumlahAlumniType,
} from "../models/jumlahAlumni";
import type { ResponseData } from "../types/type";

export class DashboardService {
  // read
  static async read(): Promise<ResponseData<DashboardResponse | null>> {
    // response
    const response = await AXIOS.get("/dashboard/read").then((res) => res.data);

    return response;
  }

  // jumlah alumni update
  static async jumlahAlumniUpdate({
    laki_laki,
    perempuan,
  }: Omit<UpdateJumlahAlumniType, "id">): Promise<
    ResponseData<ResponseJumlahAlumniType>
  > {
    // call api
    const response = await AXIOS.patch("/jumlah-alumni/create", {
      laki_laki: laki_laki ? Number(laki_laki) : undefined,
      perempuan: perempuan ? Number(perempuan) : undefined,
    }).then((res) => res.data);

    return response;
  }
}
