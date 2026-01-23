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
    jenis_sekolah,
  }: FilterData): Promise<ResponseData<ResponseStudentWithMetaType>> {
    // get response
    const response = await AXIOS.get("/student/read", {
      params: {
        from,
        to,
        search,
        page,
        jenis_kelamin,
        jenis_sekolah,
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

  // get count
  static async getCount(
    from: string,
    to: string,
  ): Promise<ResponseData<{ laki_laki: number; perempuan: number }>> {
    // get response
    const response = await AXIOS.get("/student/count", {
      params: {
        from,
        to,
      },
    }).then((res) => res.data);

    return response;
  }

  // download file
  static async downloadFile(files: string[], fileName: string) {
    if (!fileName) fileName = "download.zip"; // default

    const response = await AXIOS.post(
      "/student/download-files",
      { files },
      { responseType: "blob" },
    );

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;

    // pastikan nama file berakhiran .zip
    link.setAttribute(
      "download",
      fileName.endsWith(".zip") ? fileName : `${fileName}.zip`,
    );

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  // download excel
  static async downloadExcel(from: string, to: string) {
    // call api
    const response = await AXIOS.get("/student/download-excel", {
      params: {
        from,
        to,
      },
      responseType: "blob",
    });

    return response;
  }
}
