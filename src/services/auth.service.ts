import AXIOS from "../libs/axios";
import type { LoginType, PayloadType } from "../models/user-model";
import type { ResponseData, ResponseMessage } from "../types/type";

export class AuthService {
  // login
  static async login(req: LoginType): Promise<ResponseData<string>> {
    // get response
    const response = await AXIOS.post("/auth/login", req, {
      withCredentials: true,
    }).then((res) => res.data);

    // return
    return response;
  }

  // get auth
  static async cekAuth(): Promise<ResponseData<PayloadType>> {
    // get response
    const response = await AXIOS.post(
      "/auth/cek",
      {},
      { withCredentials: true },
    ).then((res) => res.data);

    // return
    return response;
  }

  // logout
  static async logout(): Promise<ResponseMessage> {
    // get response
    const response = await AXIOS.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      },
    ).then((res) => res.data);

    // return
    return response;
  }
}
