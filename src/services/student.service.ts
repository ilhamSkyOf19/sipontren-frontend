import AXIOS from "../libs/axios";
import {
  type ResponseStudentType,
  type ResponseStudentWithMetaType,
} from "../models/student-model";
import type { FilterData, ResponseData } from "../types/type";

export class StudentService {
  // create
  static async create(
    req: FormData,
  ): Promise<ResponseData<ResponseStudentType | null>> {
    // get response
    const response = await AXIOS.post("/student/create", req, {
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
    to,
    search,
    page,
    jenis_kelamin,
  }: FilterData): Promise<ResponseData<ResponseStudentWithMetaType>> {
    // get response
    const response = await AXIOS.get("/student/read", {
      params: {
        from,
        to,
        search,
        page,
        jenis_kelamin,
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // detail
  static async detail(id: number): Promise<ResponseData<ResponseStudentType>> {
    // get response
    const response = await AXIOS.get(`/student/detail/${id}`).then(
      (res) => res.data,
    );
    // return
    return response;
  }

  // update
  static async update(
    id: number,
    req: FormData,
  ): Promise<ResponseData<ResponseStudentType>> {
    // get response
    const response = await AXIOS.patch(`/student/update/${id}`, req, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => res.data);

    // return
    return response;
  }

  // delete

  static async delete(id: number): Promise<ResponseData<ResponseStudentType>> {
    // get response
    const response = await AXIOS.delete(`/student/delete/${id}`).then(
      (res) => res.data,
    );

    // return
    return response;
  }
}
